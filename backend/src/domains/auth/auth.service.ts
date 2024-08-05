import {UserService} from "../users/user.service";
import {ErrorMessage, HttpStatus} from "../../common/enums/enum";
import {token} from "../../services/token/token";
import {AppError} from "../../services/error/app-error";

class AuthService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;

    }

    public login = async (email: string, password: string): Promise<{ token: string, userId: number } | null> => {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            return null;
        }

        if (password !== user.password) {
            throw new AppError(ErrorMessage.INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST, true);
        }

        return { token: token.create<{ userId: number }>({userId: user.id}), userId: user.id };
    }

}

export { AuthService };
