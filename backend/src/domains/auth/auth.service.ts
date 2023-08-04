import {type UserService} from '../users/user.service';
import {ErrorMessage, HttpStatus} from '../../common/enums/enum';
import {token} from '../../services/token/token';
import {AppError} from '../../services/error/app-error';
import * as bcrypt from 'bcrypt';

class AuthService {
	private readonly userService: UserService;

	constructor(userService: UserService) {
		this.userService = userService;
	}

	public login = async (email: string, password: string): Promise<{token: string; userId: number} | undefined> => {
		const user = await this.userService.findByEmail(email);

		if (!user?.password) {
			throw new AppError('User doesn\'t exist', HttpStatus.BAD_REQUEST, true);
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			throw new AppError(ErrorMessage.INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST, true);
		}

		return {token: token.create<{userId: number}>({userId: user.id}), userId: user.id};
	};
}

export {AuthService};
