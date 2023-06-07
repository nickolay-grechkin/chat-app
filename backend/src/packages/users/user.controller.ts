import {UserService} from "./user.service";
import {HttpMethod} from "../../shared/libs/enums/httpMethod";
import {AppEndpoint} from "../../shared/libs/enums/enum";
import {UserEntity} from "./user.entity";
import {Controller} from "../../libs/packages/controller/controller";

class UserController extends Controller {
    private userService: UserService;

    public constructor(userService: UserService) {
        super(AppEndpoint.USERS);

        this.userService = userService;

        this.addRoute({
            path: '/',
            method: HttpMethod.GET,
            handler: async (req, res) => res.status(200).send(await this.findAll())
        });
    }

    private async findAll(): Promise<UserEntity[]> {
        return await this.userService.findAll();
    }
}

export { UserController };
