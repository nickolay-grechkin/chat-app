import {RoomRepository} from "./room.repository";
import {RoomEntity} from "./room.entity";

class RoomService {
    private roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
        this.roomRepository = roomRepository;
    }

    public async getAllRoomsByUserId(userId: number): Promise<RoomEntity[]> {
        return await this.roomRepository.getAllRoomsByUserId(userId);
    }
}

export { RoomService };
