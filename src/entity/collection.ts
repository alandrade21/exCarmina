import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';

/**
 * Entity to represent a group of albuns. This is a agregation tool to be optionally used by the user.
 */
@Entity('tb_collection')
export class Collection {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({unique: true, nullable: false})
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  creatinDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
