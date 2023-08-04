import {ServerService} from './server.service';
import {database} from '../../configs/configs';
import {userController} from '../../domains/users/user';
import {authController} from '../../domains/auth/auth';
import {messagesController} from '../../domains/messages/messages';
import {roomController} from '../../domains/rooms/rooms';

const serverApp = new ServerService(
	database,
	[
		...userController.routes,
		...authController.routes,
		...messagesController.routes,
		...roomController.routes,
	]);

export {serverApp};
