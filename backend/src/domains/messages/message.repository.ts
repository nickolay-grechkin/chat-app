import {MessageModel} from "./message.model";
import {SaveMessageDto} from "./common/types/save-message-dto";
import {MessageEntity} from "./message.entity";

class MessageRepository {
    // TODO Why should i use typeof here
    private messageModel: typeof MessageModel;

    public constructor(messageModel: typeof MessageModel) {
        this.messageModel = messageModel;
    }

    public async createMessage(message: SaveMessageDto): Promise<any> {
        const { userId, roomId, content } = message;
        return this.messageModel.query().insert({
            user_id: userId,
            room_id: roomId,
            content: content
        }).into('messages');
    }

    public async getAllByDialogId(dialogId: number): Promise<MessageEntity[] | null> {
        const messages = await this.messageModel.query().where('dialog_id', dialogId).select();

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
