import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

import { Album } from './album';
import { ArtistBand } from './artistBand';
import { Style } from './style';

@Entity('tb_music')
export class Music {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  title: string;

  @Column({unique: true, nullable: false})
  path: string;

  @Column({name: 'album_fk'})
  @ManyToOne(type => Album, album => album.musics,
             {nullable: false, onDelete: 'CASCADE'})
  album: Promise<Album>; // Lazy load

  /**
   * Musics in a collectanea album has this field filled.
   */
  @Column({name: 'artist_band_fk'})
  @ManyToOne(type => ArtistBand,
             {onDelete: 'CASCADE'})
  artistBand: Promise<ArtistBand>; // Lazy loading

  @Column()
  track: number;

  @Column()
  disc_number: number;

  @Column()
  info: string;

  @Column({name: 'times_played', nullable: false, default: 0})
  duration: number;

  @Column({nullable: false})
  timesPlayed: number;

  @Column({nullable: false, default: 0})
  evaluation: number;

  @ManyToMany(type => Style)
  @JoinTable({name: 'tb_music_style',
              joinColumn: {name: 'music_fk'},
              inverseJoinColumn: {name: 'style_fk'}})
  styles: Promise<Style[]>; // lazy loading

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
