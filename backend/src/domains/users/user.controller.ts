import {UserService} from "./user.service";
import {HttpMethod} from "../../common/enums/httpMethod";
import {AppEndpoint, HttpStatus} from "../../common/enums/enum";
import {Controller} from "../common/classes/classes";
import {NextFunction, Request, Response} from "express";
import {uploadFile} from "../../services/file/fileParser";

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

        this.addRoute({
            path: AppEndpoint.USER,
            method: HttpMethod.POST,
            handler: (req, res, next) => this.create(req, res, next)
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

    public async create(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
            // const user = await this.userService.create({ email, password });
            await uploadFile();
            res.status(HttpStatus.SUCCESS).send("Success");
        } catch (error) {
            next(error);
        }
    }
}

export { UserController };
