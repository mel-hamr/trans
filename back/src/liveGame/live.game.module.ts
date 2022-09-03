import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { liveGame } from 'src/entities/liveGame.entity';
import { User } from 'src/entities/user.entity';
import { livegamecontroller } from './live.game.controller';
import { liveGameService } from './liveGame.service';


@Module({
    imports:[TypeOrmModule.forFeature([liveGame,User])],
    providers:[liveGameService],
    controllers:[livegamecontroller]
})

export class livegamemodule{}