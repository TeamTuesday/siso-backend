import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { VoteSubject } from '../../src/vote-subjects/entities/vote-subject.entity';
import { VoteVote } from '../../src/vote-vote/entities/vote-vote.entity';
import { Comments } from '../../src/comments/entities/comments.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT ?? 5432),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [VoteSubject, VoteVote, Comments],
  migrations: ['src/migration/*.ts'],
  seeds: ['libs/config/src/database/seeds/*.seed.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default config;
