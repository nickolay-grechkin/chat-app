import { Controller } from "../common/classes/classes";
import { AppEndpoint, HttpMethod, HttpStatus } from "../../common/enums/enum";
import { AuthService } from "./auth.service";
import {Request, Response} from "express";


class AuthController extends Controller {
    private authService: AuthService;

    // TODO Implement refresh token
    constructor(authService: AuthService) {
        super();

        this.authService = authService;

        this.addRoute({
            path: AppEndpoint.LOGIN,
            method: HttpMethod.POST,
            handler: (req, res) => this.login(req, res)
        });
    }

    private async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const loginResponse = await this.authService.login(email, password);

            res.status(HttpStatus.SUCCESS).send(loginResponse);
        } catch (err: any) {
            // TODO Implement proper error handling
            res.status(HttpStatus.FORBIDDEN).send(err.message);
        }
    }
}

export { AuthController };
