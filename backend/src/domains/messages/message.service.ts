import {type MessageRepository} from './message.repository';
import {type SaveMessageDto} from './common/types/save-message-dto';
import {type MessageEntity} from './message.entity';

class MessageService {
	private readonly messageRepository: MessageRepository;

	public constructor(messageRepository: MessageRepository) {
		this.messageRepository = messageRepository;
	}

	public async createMessage(message: SaveMessageDto) {
		return this.messageRepository.create(message);
	}

	public async getAllMessages(): Promise<MessageEntity[]> {
		return this.messageRepository.getAll();
	}

	public async getMessagesByRoomId(roomId: number): Promise<MessageEntity[] | undefined> {
		return this.messageRepository.getAllByRoomId(roomId);
	}
}

export {MessageService};
