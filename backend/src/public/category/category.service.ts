// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { Category } from '../../database/entities/category.entity';

// @Injectable()
// export class CategoryService {
//   category: any;
//   constructor(
//     @InjectRepository(Category)
//     private categoryRepository: Repository<Category>
//   ) {}

//   findAll(): Promise<Category[]> {
//     return this.category.Repository.find({
//       order: {
//         id: 'ASC',
//       },
//     });
//   }

//   find(categoryId: number): Promise<Category | null> {
//     return this.categoryRepository.findOne({
//       where: {
//         id: categoryId,
//       },
//     });
//   }
// }
