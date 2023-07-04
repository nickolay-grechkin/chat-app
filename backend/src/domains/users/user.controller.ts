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
            handler: (req, res) => this.findUserByEmail(req, res)
        })
    }

    private async findAll(res: Response) {
        res.status(HttpStatus.SUCCESS).send(await this.userService.findAll());
    }

    private async findUserByEmail(req: Request, res: Response) {
        const { email } = req.query;

        try {
            const user = await this.userService.findByEmail(String(email));
            res.status(HttpStatus.SUCCESS).send(user);
        } catch {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

export { UserController };
