import { UserService } from "./user.service";
import { HttpMethod } from "../../common/enums/httpMethod";
import { AppEndpoint, HttpStatus } from "../../common/enums/enum";
import { Controller } from "../common/classes/classes";
import {Response} from "express";

class UserController extends Controller {
    private userService: UserService;

    public constructor(userService: UserService) {
        super();

        this.userService = userService;

        this.addRoute({
            path: AppEndpoint.USERS,
            method: HttpMethod.GET,
            handler: (req, res) => this.findAll(res)
        });
    }

    private async findAll(res: Response) {
        res.status(HttpStatus.SUCCESS).send(await this.userService.findAll());
    }
}

export { UserController };
