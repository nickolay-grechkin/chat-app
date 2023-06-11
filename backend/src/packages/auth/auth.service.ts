import {UserService} from "../users/user.service";
import * as jwt from "jsonwebtoken";
import {ErrorMessage} from "../../shared/libs/enums/enum";
import {token} from "../../libs/packages/token/token";

class AuthService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;

    }

    public login = async (email: string, password: string): Promise<string | null> => {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            return null;
        }

        if (password !== user.password) {
            throw new Error(ErrorMessage.INCORRECT_PASSWORD);
        }

        return token.create<{ userId: number }>({ userId: user.id });
    }

}

export { AuthService };
