import {Controller} from "../../libs/packages/controller/controller";
import {AppEndpoint, HttpMethod, HttpStatus} from "../../shared/libs/enums/enum";
import {AuthService} from "./auth.service";


class AuthController extends Controller {
    private authService: AuthService;

    // TODO Implement refresh token
    constructor(authService: AuthService) {
        super(AppEndpoint.LOGIN);

        this.authService = authService;

        this.addRoute({
            path: "/",
            method: HttpMethod.POST,
            handler: async (req, res) => {
                try {
                    const {email, password} = req.body;

                    const token = await this.authService.login(email, password);

                    res.status(HttpStatus.SUCCESS).send(token);
                } catch (err: any) {
                    // TODO Implement proper error handling
                    res.status(HttpStatus.FORBIDDEN).send(err.message);
                }
            }});
    }
}

export { AuthController };
