import {Controller} from "../controller";
import {UserService} from "./user.service";
import {HttpMethod} from "../../common/enums/httpMethod";

class UserController extends Controller {
    private userService: UserService;

    public constructor(userService: UserService) {
        super('/users');

        this.userService = userService;

        this.addRoute({
            path: '/',
            method: HttpMethod.GET,
            handler: async (req, res) => res.status(200).send(await this.findAll())
        });
    }

    private async findAll(): Promise<{ status: any; payload: unknown }> {
        return await this.userService.findAll();
    }
}

export { UserController };
