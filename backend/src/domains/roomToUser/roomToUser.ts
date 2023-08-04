import {RoomToUserRepository} from './roomToUser.repository';
import {RoomToUserModel} from './roomToUser.model';

const roomToUserRepository = new RoomToUserRepository(RoomToUserModel);

export {roomToUserRepository};
