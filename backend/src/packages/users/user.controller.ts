import { UserService } from "./user.service";
import { HttpMethod } from "../../shared/libs/enums/httpMethod";
import { AppEndpoint, HttpStatus } from "../../shared/libs/enums/enum";
import { Controller } from "../../libs/packages/controller/controller";
import {Request, Response} from "express";

class UserController extends Controller {
    private userService: UserService;

    public constructor(userService: UserService) {
        super();

        this.userService = userService;

        this.addRoute({
            path: AppEndpoint.USERS,
            method: HttpMethod.GET,
            handler: (req, res) => this.findAll(req, res)
        });
    }

    private async findAll(req: Request, res: Response) {

        res.status(HttpStatus.SUCCESS).send(await this.userService.findAll());
    }
}

export { UserController };
