import {RoomToUserModel} from "./roomToUser.model";

class RoomToUserRepository {
    private roomToUserModel: typeof RoomToUserModel;

    constructor(roomToUserModel: typeof RoomToUserModel) {
        this.roomToUserModel = roomToUserModel;
    }

    public async createRoomToUserRelation(entitiesToInsert: { room_id: number, user_id: number }[]): Promise<number[]> {
            const result = await this.roomToUserModel
                .query()
                .insert(entitiesToInsert);

            return result.map(room => room.room_id);
    }
}

export { RoomToUserRepository };
