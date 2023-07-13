import {RoomRepository} from "./room.repository";
import {RoomModel} from "./room.model";
import {RoomService} from "./room.service";
import {RoomController} from "./room.controller";
import {RoomToUserRepository} from "../roomToUser/roomToUser.repository";
import {userRepository} from "../users/user";
import {roomToUserRepository} from "../roomToUser/roomToUser";

const roomRepository = new RoomRepository(RoomModel);
const roomService = new RoomService(roomRepository, roomToUserRepository, userRepository);
const roomController = new RoomController(roomService);

export { roomRepository, roomController };
