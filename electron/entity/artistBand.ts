import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Style } from './style';
import { ArtistBandPhoto } from './artistBandPhoto';
import { Album } from './album';

/* Entity representing a music author or band. */
@Entity('tb_artist_band')
export class ArtistBand {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column()
  birthCreation: Date;

  @Column()
  deathDissolution: Date;

  /* Field for general text information */
  @Column()
  info: string;

  @ManyToMany(type => Style)
  @JoinTable({name: 'tb_artist_band_style',
              joinColumn: {name: 'artist_band_fk'},
              inverseJoinColumn: {name: 'style_fk'}})
  styles: Promise<Style[]>; // Lazy loading

  @OneToMany(type => ArtistBandPhoto, artistBandPhoto => artistBandPhoto.artistBand, {cascade: true})
  photos: Promise<ArtistBandPhoto[]>; // Lazy loading

  @OneToMany(type => Album, album => album.artistBand)
  albuns: Promise<Album[]>; // Lazy loading

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
