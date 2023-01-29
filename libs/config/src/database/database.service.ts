import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { VoteSubject } from 'src/vote-subjects/entities/vote-subject.entity'; // FIXME `libs` 하위 모듈에서 `src`를 참조하는 것은 참조 방향이 잘못됨.
import { VoteVote } from 'src/vote-vote/entities/vote-vote.entity';
import { ConfigService } from '../config.service';
import { Comments } from '../../../../src/comments/entities/comments.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.database.host,
      port: this.configService.database.port,
      username: this.configService.database.username,
      password: this.configService.database.password,
      database: this.configService.database.name,
      synchronize: true,
      entities: [VoteSubject, VoteVote, Comments],
    };
  }
}
