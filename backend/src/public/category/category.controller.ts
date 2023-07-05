// import { Get, Param, ParseIntPipe } from "@nestjs/common";
// import { Category } from "database/entities/category.entity";
// import { find } from "rxjs";
// import { CategoryService } from "./category.service";

// export class CategoryController {
//     constructor(
//         private categoryService: CategoryService,
//     ) { }

//     @Get(':categoryId')
//     async find(
//         @Param('categoryId', ParseIntPipe) categoryId: number,
//     ): Promise<CategoryRes | null> {
//         const category = await this.categoryService.find(categoryId)
//         if (!category) {
//             throw new CategoryNotFoundError()
//         }

//         return Category
//     }

//     @Get()
//     findAll(): Promise<CategoryRes>[]> {
//         return this.categoryService.findAll()
//     }

// }
