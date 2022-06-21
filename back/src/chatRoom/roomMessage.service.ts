import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { chatRoomDto } from "src/dto-classes/chatRoom.dto";
import { chatRoom } from "src/entities/chatRoom.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { roomMessage } from "src/entities/roomMessage.entity";
@Injectable()
export class roomMessageService
{
	constructor(
		@InjectRepository(roomMessage) private RoomRepository: Repository<roomMessage>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	){}

	async creatRoomMessage(sender : string , body :any)
	{
		let message : roomMessage
		message.message  = body.message
		message.roomId = body.roomId
		message.senderId = sender
		return await this.RoomRepository.save()
	}

	async getRoomMessages(roomId : number )
	{
		console.log("here")
		let messages = await this.RoomRepository.findBy({roomId : roomId})

		return messages

	}
}