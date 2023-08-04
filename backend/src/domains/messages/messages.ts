import {MessageRepository} from './message.repository';
import {MessageModel} from './message.model';
import {MessageService} from './message.service';
import {MessagesController} from './message.controller';

const messagesRepository = new MessageRepository(MessageModel);
const messagesService = new MessageService(messagesRepository);
const messagesController = new MessagesController(messagesService);

export {messagesController, messagesService};
