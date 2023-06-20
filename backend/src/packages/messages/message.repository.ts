import {MessageModel} from "./message.model";
import {UserEntity} from "../users/user.entity";

class MessageRepository {
    private messageModel: typeof MessageModel;

    public constructor(messageModel: typeof MessageModel) {
        this.messageModel = messageModel;
    }

    public async createMessage(): Promise<any> {
        await this.messageModel.query().insert({
            sender_id: 0,
            receiver_id: 1,
            dialog_id: 0,
            content: 'First message'
        }).into('messages');
        const messages = await this.messageModel.query().select();

        // return messages.map((message) => {
        //     return MessageEntity.initialize({
        //         id: message.id,
        //         senderId: message.senderId,
        //         receiverId: message.receiverId,
        //         content: message.content,
        //         dialogId: message.
        //     })
        // });
    }
}

export { MessageRepository };
