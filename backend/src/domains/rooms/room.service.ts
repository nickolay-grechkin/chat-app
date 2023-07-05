import {RoomRepository} from "./room.repository";
import {RoomEntity} from "./room.entity";
import {CreateRoomDTO} from "./common/dtos/createRoomDTO";
import {RoomToUserRepository} from "../roomToUser/roomToUser.repository";
import {AppError} from "../../services/error/app-error";

class RoomService {
    private roomRepository: RoomRepository;
    private roomToUserRepository: RoomToUserRepository;

    constructor(roomRepository: RoomRepository, roomToUserRepository: RoomToUserRepository) {
        this.roomRepository = roomRepository;
        this.roomToUserRepository = roomToUserRepository;

    }

    public async getAllRoomsByUserId(userId: number): Promise<RoomEntity[]> {
        return await this.roomRepository.getAllRoomsByUserId(userId);
    }

    public async createIndividualRoom(roomDto: CreateRoomDTO): Promise<void> {
        const { inviteeId, inviterId } = roomDto;

        const usersIndividualRoom = await this.roomRepository.getRoomByUsersIds(inviteeId, inviterId);

        if (usersIndividualRoom) {
            console.log(usersIndividualRoom);
            throw new Error('Individual room for this users have already exist');
        }

        try {
            const roomId = await this.roomRepository.createRoom();

            if (roomId) {
                const entitiesToInsert =
                    [
                        { room_id: roomId, user_id: inviterId },
                        { room_id: roomId, user_id: inviteeId }
                    ];

                await this.roomToUserRepository.createRoomToUserRelation(entitiesToInsert);
            }
        } catch (err) {
            console.log(err);
        }
    }

}

export { RoomService };
