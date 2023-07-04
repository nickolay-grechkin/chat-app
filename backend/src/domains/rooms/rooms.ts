import {RoomRepository} from "./room.repository";
import {RoomModel} from "./room.model";
import {RoomService} from "./room.service";
import {RoomController} from "./room.controller";
import {RoomToUserRepository} from "../roomToUser/roomToUser.repository";
import {RoomToUserModel} from "../roomToUser/roomToUser";

const roomRepository = new RoomRepository(RoomModel);
const roomToUserRepository = new RoomToUserRepository(RoomToUserModel);
const roomService = new RoomService(roomRepository, roomToUserRepository);
const roomController = new RoomController(roomService);

export { roomRepository, roomController };
