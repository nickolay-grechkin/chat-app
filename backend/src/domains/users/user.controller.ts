import {type UserService} from './user.service';
import {HttpMethod} from '../../common/enums/httpMethod';
import {AppEndpoint, HttpStatus} from '../../common/enums/enum';
import {Controller} from '../common/classes/classes';
import {type NextFunction, type Request, type Response} from 'express';
import multer from 'multer';
import {type MulterFile} from '../../common/types/multer-file';

const upload = multer();

class UserController extends Controller {
	private readonly userService: UserService;

	public constructor(userService: UserService) {
		super();

		this.userService = userService;

		this.addRoute({
			path: AppEndpoint.USERS,
			method: HttpMethod.GET,
			handler: async (req, res) => this.findAll(res),
		});

		this.addRoute({
			path: AppEndpoint.USER,
			method: HttpMethod.GET,
			handler: async (req, res, next) => this.findUserByEmail(req, res, next),
		});

		this.addRoute({
			path: AppEndpoint.USER,
			method: HttpMethod.POST,
			handler: async (req, res, next) => this.create(req, res, next),
		});

		this.addRoute({
			path: AppEndpoint.AVATAR,
			method: HttpMethod.POST,
			middleware: upload.any(),
			handler: async (req, res, next) => this.uploadAvatar(req, res, next),
		});
	}

	private async findAll(res: Response) {
		res.status(HttpStatus.SUCCESS).send(await this.userService.findAll());
	}

	private async findUserByEmail(req: Request, res: Response, next: NextFunction) {
		const {email} = req.query;

		try {
			const user = await this.userService.findByEmail(String(email));
			res.status(HttpStatus.SUCCESS).send(user);
		} catch (error) {
			next(error);
		}
	}

	public async create(req: Request, res: Response, next: NextFunction) {
		const {email, password} = req.body;
		try {
			const user = await this.userService.create({email, password});
			res.status(HttpStatus.SUCCESS).send(user);
		} catch (error) {
			next(error);
		}
	}

	public async uploadAvatar(req: Request, res: Response, next: NextFunction) {
		try {
			if (req.files && req.query.userId) {
				const [file] = req.files as MulterFile[];

				const avatarLink = await this.userService.uploadAvatar(Number(req.query.userId), file);
				res.status(HttpStatus.SUCCESS).send(avatarLink);
			}

			res.status(HttpStatus.BAD_REQUEST).send('File for upload is missing');
		} catch (error) {
			next(error);
		}
	}
}

export {UserController};
