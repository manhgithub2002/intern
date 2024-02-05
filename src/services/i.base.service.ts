import { BaseEntity, DeleteResult } from "typeorm";

export interface IBaseService<T extends BaseEntity> {
  index(): Promise<T[]>;

  
  store(data: any): Promise<T>;
  
  update(id: number, data: any): Promise<T>;
  
  delete(id: number): Promise<DeleteResult>;

  findById(id: number): Promise<T | null>;
  
  findByColumn<X>(column: keyof T, value: X): Promise<T | null>;
  
  // hasValueInColumn<X>(column: keyof T, value: X): boolean;
}
