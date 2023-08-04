import {Controller} from '../common/classes/classes';
import {type RoomService} from './room.service';
import {HttpMethod} from '../../common/enums/httpMethod';
import {type Request, type Response} from 'express';
import {AppEndpoint, HttpStatus} from '../../common/enums/enum';
import {type ExtendedRequest} from '../../common/types/extended-request';

class RoomController extends Controller {
	private readonly roomService: RoomService;

	constructor(roomService: RoomService) {
		super();

		this.roomService = roomService;

		this.addRoute({
			path: AppEndpoint.ROOMS,
			method: HttpMethod.GET,
			handler: async (req, res) => this.getAllRoomsByUserId(req, res),
		});

		this.addRoute({
			path: AppEndpoint.ROOMS,
			method: HttpMethod.POST,
			handler: async (req, res, next) => this.createIndividualRoom(req, res, next),
		});
	}

	private async getAllRoomsByUserId(req: Request, res: Response) {
		try {
			const {userId} = req.query;

			const rooms = await this.roomService.getAllRoomsByUserId(Number(userId));

			res.status(HttpStatus.SUCCESS).send(rooms);
		} catch {
			res.status(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private async createIndividualRoom(req: Request, res: Response, next: any) {
		try {
			const room = req.body;

			const roomId = await this.roomService
				.createIndividualRoom({
					...room,
					inviterId: (req as ExtendedRequest).userId,
				});

			res.status(HttpStatus.SUCCESS).send(String(roomId));
		} catch (error) {
			next(error);
		}
	}
}

export {RoomController};
