import {AuthService} from "./auth.service";
import {userService} from "../users/user";
import {AuthController} from "./auth.controller";

const authService = new AuthService(userService);
const authController = new AuthController(authService);

export { authService, authController };
