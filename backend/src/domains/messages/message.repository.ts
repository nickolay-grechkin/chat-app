import {MessageModel} from "./message.model";
import {SaveMessageDto} from "./common/types/save-message-dto";
import {MessageEntity} from "./message.entity";

class  MessageRepository {
    // TODO Why should i use typeof here
    private messageModel: typeof MessageModel;

    public constructor(messageModel: typeof MessageModel) {
        this.messageModel = messageModel;
    }

    public async create(message: SaveMessageDto): Promise<any> {
        const { userId, roomId, content } = message;
        return this.messageModel.query().insert({
            user_id: userId,
            room_id: roomId,
            content: content
        }).into('messages');
    }

    public async getAll(): Promise<MessageEntity[]> {
        const messages = await this.messageModel
            .query()
            .select()
            .withGraphJoined('user');

        return messages.map(message => MessageEntity.initialize({
            id: message.id,
            userId: message.user_id,
            roomId: message.room_id,
            content: message.content,
            createdAt: message.created_at,
            updatedAt: message.updated_at
        }));
    }

    public async getAllByRoomId(roomId: number): Promise<MessageEntity[] | null> {
        const messages = await this.messageModel
            .query()
            .where('room_id', roomId)
            .orderBy('created_at', 'asc')
            .select();

        if (!messages) {
            return null;
        }

        return messages.map(({
            id,
            user_id,
            room_id,
            created_at,
            updated_at,
            content,
        }) => MessageEntity.initialize({
            id,
            userId: user_id,
            roomId: room_id,
            content,
            createdAt: created_at,
            updatedAt: updated_at
        }));
    }
}

export { MessageRepository };
