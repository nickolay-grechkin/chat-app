import { RoomModel } from "./room.model";
import { RoomEntity } from "./room.entity";

class RoomRepository {
    private roomModel: typeof RoomModel;

    public constructor(roomModel: typeof RoomModel) {
        this.roomModel = roomModel;
    }

    public async getIndividualRoomIdsByUserId(userId: number): Promise<number[] | null> {
        const rooms = await this.roomModel
            .query()
            .withGraphJoined('users')
            .where('user_id', userId)
            .andWhere('isIndividualRoom', true)
            .select('rooms.id');

        if (!rooms) {
            return null;
        }

        return rooms.map(room => room.id);
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
            lastMessage: room.last_message,
            isIndividualRoom: room.isIndividualRoom
        }));
    }

    public async createIndividualRoom(): Promise<number | null> {
        const insertedRoom = await this.roomModel
            .query()
            .insertAndFetch({ name: null, picture: null, last_message: null, isIndividualRoom: true })
            .returning('id');

        return insertedRoom.id;
    }
}

export { RoomRepository };
