import { BaseEntity, DeleteResult, EntityTarget, FindOneOptions, Repository } from "typeorm";
import { IBaseService } from "./i.base.service";
import { EntityId } from "typeorm/repository/EntityId";

export class BaseService<T extends BaseEntity>
  implements IBaseService<T>
{
  protected readonly repository: Repository<T>;
  // protected readonly logger: Logger

  constructor(entity: EntityTarget<T>, repository: Repository<T>) {
    this.repository = repository;
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<T | null> {
    const findOneOptions = { where: { id } } as FindOneOptions;
    return this.repository.findOne(findOneOptions);
  }

  findByColumn<X>(column: keyof T, value: X): Promise<T | null> {
      const findOneOptions = {where : {[column]: value}} as FindOneOptions;
      return this.repository.findOne(findOneOptions);
  }


  // findByIds(id: [EntityId]): Promise<T[]> {
  //     return ;
  // }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: number, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id) as Promise<T>;
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
