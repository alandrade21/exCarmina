import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { ArtistBand } from './artistBand';

@Entity('tb_artist_band_photo')
export class ArtistBandPhoto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  path: string;

  @Column({name: 'alt_text'})
  altText: string;

  @Column({name: 'artist_band_fk'})
  @ManyToOne(type => ArtistBand, artistBand => artistBand.photos,
             {nullable: false, onDelete: 'CASCADE'})
  artistBand: Promise<ArtistBand>;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
