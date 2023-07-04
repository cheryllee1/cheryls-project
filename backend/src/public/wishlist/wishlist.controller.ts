import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Query,
    UseGuards,
} from '@nestjs/common'
import {
    ApiExcludeEndpoint,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger'

import { UserGuard } from 'auth/guards'
import { SgidGuard } from 'auth/guards/sgid.guard'
import { CurrentUser } from 'common/decorators/auth.decorator'
import { toInstitutionSearchDto } from 'common/dto-mappers'
import { OfferingNotFoundError } from 'common/errors/entity-not-found.error'
import { IpThrottlerGuard } from 'common/guards/throttler'
import { User } from 'database/entities'
import { InstitutionSearchService } from 'institution/institution-search/institution-search.service'
import { MedipayService } from 'medipay/medipay.service'

import { OfferingService } from './offering.service'

import { ApiErrorResponse } from '~shared/swagger/decorators'
import { InstitutionSearchRes as SwaggerInstitutionSearchRes } from '~shared/swagger/types'
import {
    InstitutionSearchReq,
    InstitutionSearchRes,
    MedipayPriceQueryRes,
    OfferingRes,
    PaginatedRes,
    QueryMedipayPriceReq,
} from '~shared/types/api'
import { VaccineVariant } from '~shared/types/base'

@ApiTags('Offerings')
@Controller()
@UseGuards(IpThrottlerGuard)
export class OfferingController {
    constructor(
        private offeringService: OfferingService,
        private institutionSearchService: InstitutionSearchService,
        private medipayService: MedipayService,
    ) { }

    @ApiExcludeEndpoint()
    @Get()
    findAll(): Promise<OfferingRes[]> {
        return this.offeringService.findAll()
    }

    @ApiExcludeEndpoint()
    // @Get('price')
    @ApiOperation({
        summary:
            'Retrieves maximum out of pocket price and the subsidies a user is eligible for',
    })
    @ApiQuery({
        name: 'institutionId',
        required: true,
        type: Number,
        description:
            'The identifier of the institution that the appointment is for',
    })
    @ApiQuery({
        name: 'vaccineVariant',
        required: true,
        enum: VaccineVariant,
        description:
            'The identifier of the vaccine variant that the appointment is for',
    })
    @UseGuards(UserGuard, SgidGuard)
    async getMedipayPrice(
        @CurrentUser() user: User,
        @Query()
        { institutionId, vaccineVariant }: QueryMedipayPriceReq,
    ): Promise<MedipayPriceQueryRes> {
        const res = this.medipayService.getMedipayPrice({
            uin: user.uin,
            dob: user.dob,
            institutionId,
            vaccineVariant,
        })
        return res
    }

    @ApiExcludeEndpoint()
    @Get(':offeringId')
    @ApiOperation({
        summary: 'Retrieves offering details by id',
        description: 'Use the offering id to retrieve the details of the offering',
    })
    @ApiParam({
        name: 'offeringId',
        required: true,
        description:
            'The identifier for the medical service. Use 34 for HealthierSG First Consult',
    })
    async find(
        @Param('offeringId', ParseIntPipe) offeringId: number,
    ): Promise<OfferingRes | null> {
        const offering = await this.offeringService.find(offeringId)
        if (!offering) {
            throw new OfferingNotFoundError()
        }
        return offering
    }

    @Get(':offeringId/institutions')
    @ApiOperation({
        summary:
            'Retrieves a list of institutions by offering id and other filters',
        description:
            'Search for the list of institutions by offering id and one or more of the following search parameters (i.e. postal code, HCI code, case-insensitive name search). Offering id is mandatory, but the other three parameters are optional.' +
            '\n\n To check if a particular clinic offers a medical service, you can search by HCI code and offering id. If no institution is returned from the query, then the clinic either does not exist on HAS or does not offer the medical service.' +
            '\n\n Take note of the `id` value, because you will need it to look up time slots and to create/delete appointments.',
    })
    @ApiParam({
        name: 'offeringId',
        required: true,
        type: String,
        description:
            'The identifier for the medical service. Use 34 for HealthierSG First Consult',
    })
    @ApiQuery({
        name: 'hciCode',
        required: false,
        type: String,
        description:
            'Filter institutions by HCI code. Refer to https://www.hcidirectory.gov.sg/hcidirectory/ for a complete list.',
    })
    @ApiQuery({
        name: 'search',
        required: false,
        type: String,
        description:
            'Filter institution by case-insensitive search for the name of the institution',
    })
    @ApiQuery({
        name: 'postalCode',
        required: false,
        type: String,
        description: 'Filter institution by postal code',
    })
    @ApiQuery({
        name: 'offset',
        required: false,
        type: Number,
        description:
            'Number of institutions to skip before returning. Use with `pageSize` for pagination.',
    })
    @ApiQuery({
        name: 'pageSize',
        required: false,
        type: Number,
        description:
            'Number of institutions to return. Use with `offset` for pagination.',
    })
    @ApiQuery({
        name: 'tags',
        required: false,
        type: String,
        isArray: true,
        description: 'Filter institutions by their tags',
    })
    @ApiOkResponse({ type: SwaggerInstitutionSearchRes })
    @ApiErrorResponse(400, 'An invalid postal code was given', {
        invalidPostalCode: {
            message: 'Unable to retrieve coordinates for postal code 123',
            error: 'Bad Request',
        },
    })
    async findOfferingInstitutions(
        @Param('offeringId', ParseIntPipe) offeringId: number,
        @Query()
        req: InstitutionSearchReq,
    ): Promise<PaginatedRes<InstitutionSearchRes>> {
        const { pageSize, offset } = req

        const institutions =
            await this.institutionSearchService.findAllWithOffering({
                offeringId,
                ...req,
                // pageSize + 1 so that we can check if there is a next item
                pageSize: pageSize + 1,
            })

        const next = institutions.length > pageSize ? institutions.pop() : null
        const metadata: PaginatedRes<InstitutionSearchRes>['metadata'] = {
            hasNext: !!next,
        }
        if (metadata.hasNext) {
            metadata.nextParams = {
                offset: offset + pageSize,
                pageSize,
            }
        }

        return {
            data: institutions.map(toInstitutionSearchDto),
            metadata,
        }
    }
}