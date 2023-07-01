import {UserService} from "./user.service";
import {HttpMethod} from "../../common/enums/httpMethod";
import {AppEndpoint, HttpStatus} from "../../common/enums/enum";
import {Controller} from "../common/classes/classes";
import {Request, Response} from "express";

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

        this.addRoute({
            path: AppEndpoint.USER,
            method: HttpMethod.GET,
            handler: (req, res) => this.findUserById(req, res)
        })
    }

    private async findAll(res: Response) {
        res.status(HttpStatus.SUCCESS).send(await this.userService.findAll());
    }

    private async findUserById(req: Request, res: Response) {
        const { id } = req.query;

        try {
            res.status(HttpStatus.SUCCESS).send(await this.userService.findById(Number(id)));
        } catch {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export { UserController };
