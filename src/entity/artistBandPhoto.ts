import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
  @ManyToOne(type => ArtistBand, artistBand => artistBand.photos)
  artistBand: ArtistBand;
}
