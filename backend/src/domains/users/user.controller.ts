import {UserService} from "./user.service";
import {HttpMethod} from "../../common/enums/httpMethod";
import {AppEndpoint, HttpStatus} from "../../common/enums/enum";
import {Controller} from "../common/classes/classes";
import {NextFunction, Request, Response} from "express";

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
            handler: (req, res, next) => this.findUserByEmail(req, res, next)
        })
    }

    private async findAll(res: Response) {
        res.status(HttpStatus.SUCCESS).send(await this.userService.findAll());
    }

    private async findUserByEmail(req: Request, res: Response, next: NextFunction) {
        const { email } = req.query;

        try {
            const user = await this.userService.findByEmail(String(email));
            res.status(HttpStatus.SUCCESS).send(user);
        } catch(error) {
            next(error);
        }
    }
}

export { UserController };
