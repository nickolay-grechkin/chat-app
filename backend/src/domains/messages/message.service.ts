import {MessageRepository} from "./message.repository";
import {SaveMessageDto} from "./common/types/save-message-dto";
import {MessageEntity} from "./message.entity";

class MessageService {
    // TODO Why message repository as a type works here
    private messageRepository: MessageRepository;

    public constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public async saveMessage(message: SaveMessageDto) {
        return this.messageRepository.createMessage(message);
    }

    public async getAllMessages(): Promise<void> {
        this.messageRepository.getAllMessages();
    }

    public async getMessagesByRoomId(roomId: number): Promise<MessageEntity[] | null> {
        return this.messageRepository.getAllByRoomId(roomId);
    }
}

export { MessageService };
