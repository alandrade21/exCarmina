import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { ArtistBand } from './artistBand';
import { Collection } from './collection';

@Entity('tb_album')
export class Album {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column()
  year: number;

  @Column()
  info: string;

  @Column({name: 'artist_band_fk'})
  @ManyToOne(type => ArtistBand, artistBand => artistBand.albuns,
             {onDelete: 'CASCADE'})
  artistBand: Promise<ArtistBand>; // Lazy loading

  @Column({name: 'various_artists_bands', nullable: false, default: 0})
  variousArtistsBands: boolean;

  @Column({name: 'collection_fk'})
  @ManyToOne(type => Collection, collection => collection.albuns,
             {onDelete: 'SET NULL'})
  collection: Promise<Collection>; // Lazy loading

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
