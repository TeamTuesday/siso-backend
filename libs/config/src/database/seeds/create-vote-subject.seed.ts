import { VoteSubject } from 'src/vote-subjects/entities/vote-subject.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateInitialVoteSubject implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(VoteSubject)
      .values([
        {
          title: '둘 중에 더 가기 무서운 여행은?',
          agreeDescription: '김정은과 미국 여행',
          disagreeDescription: '트럼프와 북한 여행',
          voteAgreeCount: 10,
          voteDisagreeCount: 10,
          voteCount: 20,
        },
        {
          title: '닭이 먼저냐 달걀이 먼저냐',
          agreeDescription: '닭',
          disagreeDescription: '달걀',
          voteAgreeCount: 2,
          voteDisagreeCount: 2,
          voteCount: 4,
        },
        {
          title: '누가 더 괘씸하세요?',
          agreeDescription:
            '밤새 내 과제를 도와줬지만 결과적으로 과제를 날린 A',
          disagreeDescription:
            '내가 잠시 자리 비운 사이 과제를 홀라당 다 훔쳐가 제출한 B',
          voteAgreeCount: 0,
          voteDisagreeCount: 10,
          voteCount: 10,
        },
      ])
      .execute();
  }
}
