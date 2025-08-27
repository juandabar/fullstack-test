import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  producto_id: number;

  @Column()
  cantidad: number;
}