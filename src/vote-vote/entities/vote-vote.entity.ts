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
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'subject_id', nullable: false })
  subjectId!: string;

  @Column({ nullable: false })
  type!: string;

  @Column({ name: 'user_id', nullable: false })
  userId!: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, default: null })
  deletedAt?: Date;
}
