import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { VoteSubject } from '../../vote-subjects/entities/vote-subject.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, default: null })
  deletedAt?: Date;

  @ManyToOne(() => VoteSubject, (voteSubject) => voteSubject.id)
  @JoinColumn({ name: 'vote_subject_id' })
  voteSubject!: VoteSubject;

  // TODO User 생성시 id join
  @Column({ name: 'user_id', nullable: false })
  userId!: string;

  @Column({ name: 'parent_id', nullable: true })
  parentId?: string | null;

  @Column({ name: 'vote_type', nullable: false })
  voteType!: string;

  @Column('varchar', { nullable: false, length: 200 })
  comment!: string;

  @Column('int', { name: 'like_count', nullable: false, default: 0 })
  likeCount!: number;
}
