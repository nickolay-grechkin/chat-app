import {UserService} from "../users/user.service";
import * as jwt from "jsonwebtoken";
import {ErrorMessage} from "../../common/enums/enum";
import {token} from "../../services/token/token";
import {UserEntity} from "../users/user.entity";
import {UserByEmailResponse} from "../users/common/types/userByEmailResponse";

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
            throw new Error(ErrorMessage.INCORRECT_PASSWORD);
        }

        return { token: token.create<{ userId: number }>({userId: user.id}), userId: user.id };
    }

}

export { AuthService };
