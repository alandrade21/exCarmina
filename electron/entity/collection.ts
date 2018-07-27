import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';

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

  @ManyToMany(type => Album, album => album.collections)
  @JoinTable({name: 'tb_album_collection',
              joinColumn: {name: 'collection_fk'},
              inverseJoinColumn: {name: 'album_fk'}})
  albuns: Promise<Album[]>; // Lazy loading

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
