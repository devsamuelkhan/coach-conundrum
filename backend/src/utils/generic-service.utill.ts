import {
  DeleteResult, FindManyOptions,
  FindOneOptions, FindOptionsWhere,
  ObjectLiteral, Repository, UpdateResult
} from 'typeorm';

export class GenericService<T extends ObjectLiteral> {
  constructor(private readonly entity: Repository<T>) {}

  create(createDto: any): Promise<T> {
    return this.entity.save(createDto);
  }

  count(options: FindManyOptions<T>): Promise<number> {
    return this.entity.count(options);
  }

  findAll(options: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(options);
  }

  findAndCount(options: FindManyOptions<T>): Promise<[T[], number]> {
    return this.entity.findAndCount(options);
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOneOrFail(options);
  }

  update(options: FindOptionsWhere<T>, updateDto: any): Promise<UpdateResult> {
    return this.entity.update(options, updateDto);
  }

  remove(options: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.entity.delete(options);
  }

  softDelete(options: FindOptionsWhere<T>): Promise<UpdateResult> {
    return this.entity.softDelete(options);
  }

  findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    return this.entity.findOneOrFail(options);
  }

}
