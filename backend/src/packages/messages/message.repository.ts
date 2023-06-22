import {MessageModel} from "./message.model";
import {SaveMessageDto} from "./common/types/save-message-dto";

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
}

export { MessageRepository };
