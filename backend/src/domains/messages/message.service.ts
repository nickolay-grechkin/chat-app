import {MessageRepository} from "./message.repository";
import {SaveMessageDto} from "./common/types/save-message-dto";
import {MessageEntity} from "./message.entity";

class MessageService {
    private messageRepository: MessageRepository;

    public constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public async createMessage(message: SaveMessageDto) {
        return this.messageRepository.create(message);
    }

    public async getAllMessages(): Promise<MessageEntity[]> {
        return this.messageRepository.getAll();
    }

    public async getMessagesByRoomId(roomId: number): Promise<MessageEntity[] | null> {
        return this.messageRepository.getAllByRoomId(roomId);
    }
}

export { MessageService };
