import {RoomRepository} from "./room.repository";
import {RoomModel} from "./room.model";
import {RoomService} from "./room.service";
import {RoomController} from "./room.controller";

const roomRepository = new RoomRepository(RoomModel);
const roomService = new RoomService(roomRepository);
const roomController = new RoomController(roomService);

export { roomRepository, roomController };
