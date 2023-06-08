import {Controller} from "../../libs/packages/controller/controller";
import {AppEndpoint, HttpMethod} from "../../shared/libs/enums/enum";
import {AuthService} from "./auth.service";


class AuthController extends Controller {
    private authService: AuthService;

    constructor(authService: AuthService) {
        super(AppEndpoint.AUTH);

        this.authService = authService;

        this.addRoute({
            path: "/",
            method: HttpMethod.POST,
            handler: async (req, res) => {
                const { email, password } = req.body;
                res.status(200).send(await this.authService.login(email, password));
            }});
    }
}

export { AuthController };
