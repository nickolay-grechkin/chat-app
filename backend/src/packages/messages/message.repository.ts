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
        const { senderId, receiverId, content, dialogId } = message;
        return this.messageModel.query().insert({
            sender_id: senderId,
            receiver_id: receiverId,
            dialog_id: dialogId,
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
            receiver_id,
            dialog_id,
            content,
            sender_id
        }) => MessageEntity.initialize({
            id,
            receiverId: receiver_id,
            dialogId: dialog_id,
            content,
            senderId: sender_id
        }));
    }
}

export { MessageRepository };
