import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';

import { Album } from './album';

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

  @OneToMany(type => Album, album => album.collection)
  albuns: Promise<Album[]>; // Lazy loading

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
