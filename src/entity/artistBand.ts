import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { Style } from './style';
import { ArtistBandPhoto } from './artistBandPhoto';

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
              inverseJoinColumn: {name: ' style_fk'}})
  styles: Style[];

  @OneToMany(type => ArtistBandPhoto, artistBandPhoto => artistBandPhoto.artistBand)
  photos: ArtistBandPhoto[];

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
