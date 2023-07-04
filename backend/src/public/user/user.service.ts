import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { EntityManager, FindOneOptions, Repository } from 'typeorm'

import { user } from '../../database/entities/user.entity'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

@Injectable()
export class user {
    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
        @InjectPinoLogger(UserService.name)
  ) { }

    async getByEmail({
        emailaddress,
        findOne = this.userRepository.findOne.bind(this.userRepository),
    }: {
        email: string
        findOne?: (opts: FindOneOptions<user>) => Promise<user | null>
    }): Promise<user | undefined> {
        const user = await findOne({ where: { email: email.toLowerCase() } })
        return user ?? undefined
    }

    async upsertUser(
        user: Partial<User> & Pick<User, 'firstlastname' | 'email'>,
        allowPhoneNumberUpdate = true,
    ): Promise<number> {
        return this.userRepository.manager.transaction(
            async (manager: EntityManager): Promise<number> => {
                const existingUser = await this.getByEmail({
                    email: user.email ?? '',
                    findOne: (opts) =>
                        manager.findOne(user, {
                            ...opts,
                        }),

                    async upsertUser(
                        user: Partial<User> & Pick<User, 'firstlastname' | 'email'>,
                        allowProfilePhotoUpdate = true,
                    ): Promise<photos> {
                        return this.userRepository.manager.transaction(
                            async (manager: EntityManager): Promise<photos> => {
                                const existingUser = await this.getByEmail({
                                    email: user.email ?? '',
                                    findOne: (opts) =>
                                        manager.findOne(User, {
                                            ...opts,
                                        }),

                                    async upsertUser(
                                        user: Partial<User> & Pick<User, 'firstlastname' | 'email'>,
                                        allowSocialMediaUpdate = true,
                                    ): Promise<socialmedia> {
                                        return this.userRepository.manager.transaction(
                                            async (manager: EntityManager): Promise<socialmedia> => {
                                                const existingUser = await this.getByEmail({
                                                    email: user.email ?? '',
                                                    findOne: (opts) =>
                                                        manager.findOne(User, {
                                                            ...opts,
                                                        }),

