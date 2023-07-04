import {RoomModel} from "./room.model";
import {RoomEntity} from "./room.entity";
import {Table} from "../../common/enums/enum";

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

    public async createRoom(): Promise<number | null> {
        const insertedRoom = await this.roomModel
            .query()
            .insertAndFetch({ name: null, picture: null, last_message: null })
            .returning('id');

        return insertedRoom.id;
    }
}

export { RoomRepository };
