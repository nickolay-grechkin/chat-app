import { Controller } from '../common/classes/classes';
import { AppEndpoint, HttpMethod, HttpStatus } from '../../common/enums/enum';
import { AuthService } from './auth.service';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../services/error/app-error';

class AuthController extends Controller {
	private authService: AuthService;

	// TODO Implement refresh token
	constructor(authService: AuthService) {
		super();

		this.authService = authService;

		this.addRoute({
			path: AppEndpoint.LOGIN,
			method: HttpMethod.POST,
			handler: (req, res, next) => this.login(req, res, next),
		});
	}

	private async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const loginResponse = await this.authService.login(email, password);

			res.status(HttpStatus.SUCCESS).send(loginResponse);
		} catch (error: any) {
			next(
				new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR, false),
			);
		}
	}
}

export { AuthController };
