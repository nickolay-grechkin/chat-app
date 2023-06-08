import {UserService} from "../users/user.service";
import * as jwt from "jsonwebtoken";

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


        return jwt.sign({ userId: 0 }, '123456');
    }
}

export { AuthService };
