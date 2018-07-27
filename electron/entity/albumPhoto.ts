import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Album } from './album';

@Entity('tb_album_photo')
export class AlbumPhoto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  path: string;

  @Column({name: 'alt_text'})
  altText: string;

  @Column({nullable: false, default: 0})
  cover: boolean;

  @Column({name: 'album_fk'})
  @ManyToOne(type => Album, album => album.photos,
             {nullable: false, onDelete: 'CASCADE'})
  album: Promise<Album>; // Lazy load

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;

}
