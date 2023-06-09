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

        if (password !== user.password) {
            throw new Error("Incorrect password");
        }

        // TODO Check for token expiration
        // try {
        //     jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTY4NjMyNzQ0NywiZXhwIjoxNjg2MzI3NDQ3fQ.WeMBakoUjwwF9udhE8EbtlDmNlqCCtpWiz0WixkT7Z8', '123456')
        // } catch (err) {
        //     return "JWT is expired";
        // }

        // TODO Replace with variables from env
        return jwt.sign({ userId: user.id }, '123456', { expiresIn: '1d' });
    }

}

export { AuthService };
