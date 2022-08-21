import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {VoteVote} from "./entities/vote-vote.entity";
import {VoteSubject} from "../vote-subjects/entities/vote-subject.entity";
import {VoteVoteService} from "./vote-vote.service";
import {VoteVoteController} from "./vote-vote.controller";
import {VoteSubjectsService} from "../vote-subjects/vote-subjects.service";

@Module({
    imports: [TypeOrmModule.forFeature([VoteVote, VoteSubject])],
    controllers: [VoteVoteController],
    providers: [VoteVoteService, VoteSubjectsService],
})
export class VoteVoteModule {}