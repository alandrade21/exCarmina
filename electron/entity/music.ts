import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn,
          ManyToMany, JoinTable, JoinColumn } from 'typeorm';

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

  @Column({name: 'album_fk', type: 'integer'})
  @ManyToOne(type => Album, album => album.musics,
             {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({name: 'album_fk'})
  album: Promise<Album>; // Lazy load

  /**
   * Musics in a collectanea album has this field filled.
   */
  @Column({name: 'artist_band_fk', type: 'integer'})
  @ManyToOne(type => ArtistBand,
             {onDelete: 'CASCADE'})
  @JoinColumn({name: 'artist_band_fk'})
  artistBand: Promise<ArtistBand>; // Lazy loading

  @Column({name: 'track_number'})
  trackNumber: number;

  @Column({name: 'disc_number'})
  discNumber: number;

  @Column()
  info: string;

  @Column({nullable: false})
  duration: number;

  @Column({name: 'times_played', nullable: false, default: 0})
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
