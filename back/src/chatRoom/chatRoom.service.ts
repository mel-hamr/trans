import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { chatRoomDto } from "src/dto-classes/chatRoom.dto";
import { chatRoom } from "src/entities/chatRoom.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
@Injectable()
export class chatRoomService
{
	constructor(private userServ : UserService,
		@InjectRepository(chatRoom) private RoomRepository: Repository<chatRoom>,
		@InjectRepository(User) private usersRepository: Repository<User>,
		private readonly jwtService: JwtService
	){}

	async createRoom(owner : string , data : any)
	{

		let userName = owner
		let user = await this.usersRepository.findOneBy({userName : userName})
		let room : chatRoom = await this.RoomRepository.create({ RoomOwner : userName })
		room.members = [user]
		room.RoomOwner = owner
		room.name = data.name
		room.type = data.type
		room.protected = data.protected
		if(room.protected == true)
			room.password = data.password
		if(data.users.length != 0)
		{
			for(let us of data.users)
			{
				let userInfo : User = await this.usersRepository.findOneBy({userName : us.userName})
				room.members = [...room.members , userInfo]
			}
		}
		return await this.RoomRepository.save(room)
	}

	async getRoomById(gameId : number )
	{
		console.log("here")
		let game = await this.RoomRepository
		.createQueryBuilder("chat")
		.leftJoinAndSelect("chat.members", "Users").where('chat.id = :id', { id: gameId })
		.getOne();

		return game

	}

	async getPublicRooms()
	{
		return await this.RoomRepository.findBy({type : "public"})
	}


	async getAllRooms()
	{
		return await this.RoomRepository.query("SELECT * FROM chat")
	}
}
