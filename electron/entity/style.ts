import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/* Represent styles tahat the user can optionally tag to musics, albuns and autors/bands. */
@Entity('tb_style')
export class Style {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, nullable: false})
  name: string;

  /* Field for general text information */
  @Column()
  info: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastAlterationDate: Date;
}
