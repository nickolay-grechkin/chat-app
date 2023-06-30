import {RoomModel} from "./room.model";
import {RoomEntity} from "./room.entity";

class RoomRepository {
    private roomModel: typeof RoomModel;

    public constructor(roomModel: typeof RoomModel) {
        this.roomModel = roomModel;
    }

    public async getAllRoomsByUserId(userId: number): Promise<RoomEntity[]> {
        const rooms = await this.roomModel
            .query()
            .withGraphJoined('users')
            .where('user_id', userId)
            .select();

        return rooms.map(room => RoomEntity.initialize({
            id: room.id,
            name: room.name,
            picture: room.picture,
            lastMessage: room.last_message
        }));
    }
}

export { RoomRepository };
