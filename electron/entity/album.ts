import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne,
  ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';

  import { ArtistBand } from './artistBand';
  import { Collection } from './collection';
  import { Style } from './style';
  import { AlbumPhoto } from './albumPhoto';
  import { Music } from './music';

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

  @Column({name: 'artist_band_fk', type: 'integer'})
  @ManyToOne(type => ArtistBand, artistBand => artistBand.albuns,
             {onDelete: 'CASCADE'})
  @JoinColumn({name: 'artist_band_fk'})
  artistBand: Promise<ArtistBand>; // Lazy loading

  @Column({name: 'various_artists_bands', nullable: false, default: 0})
  variousArtistsBands: boolean;

  @ManyToMany(type => Collection, collection => collection.albuns)
  collections: Promise<Collection[]>; // lazy loading

  @ManyToMany(type => Style)
  @JoinTable({name: 'tb_album_style',
              joinColumn: {name: 'album_fk'},
              inverseJoinColumn: {name: 'style_fk'}})
  styles: Promise<Style[]>; // lazy loading

  @OneToMany(type => AlbumPhoto, albumPhoto => albumPhoto.album, {cascade: true})
  photos: Promise<AlbumPhoto[]>; // Lazy load

  @OneToMany(type => Music, music => music.album, {cascade: true})
  musics: Promise<Music[]>; // Lazy load

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
