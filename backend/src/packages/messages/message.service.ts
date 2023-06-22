import {MessageRepository} from "./message.repository";
import {SaveMessageDto} from "./common/types/save-message-dto";

class MessageService {
    // TODO Why message repository as a type works here
    private messageRepository: MessageRepository;

    public constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public async saveMessage(message: SaveMessageDto) {
        return await this.messageRepository.createMessage(message);
    }
}

export { MessageService };
