import {Controller} from "../common/classes/classes";
import {RoomService} from "./room.service";
import {HttpMethod} from "../../common/enums/httpMethod";
import {Request, Response} from "express";
import {AppEndpoint, HttpStatus} from "../../common/enums/enum";

class RoomController extends Controller {
    private roomService: RoomService;

    constructor(roomService: RoomService) {
        super();

        this.roomService = roomService;

        this.addRoute({
            path: AppEndpoint.ROOMS,
            method: HttpMethod.GET,
            handler: (req, res) => this.getAllRoomsByUserId(req, res)
        });

        this.addRoute({
            path: AppEndpoint.ROOMS,
            method: HttpMethod.POST,
            handler: (req, res) => this.createRoom(req, res)
        });
    }

    private async getAllRoomsByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.query;

            const rooms = await this.roomService.getAllRoomsByUserId(Number(userId));

            res.status(HttpStatus.SUCCESS).send(rooms);
        } catch {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async createRoom(req: Request, res: Response) {
        try {
            const room = req.body;

            await this.roomService.createRoom(room);

            res.status(HttpStatus.SUCCESS).send('SUCCESS');
        } catch {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export { RoomController };
