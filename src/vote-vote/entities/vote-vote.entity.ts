import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class VoteVote {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  voteId!: string;

  @Column({ nullable: false })
  type!: string;

  @Column({ nullable: false })
  userId!: string;

  @CreateDateColumn({ nullable: false })
  created!: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updated?: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted?: Date;
}
