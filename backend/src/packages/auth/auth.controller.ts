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
                try {
                    const {email, password} = req.body;

                    const token = await this.authService.login(email, password);

                    res.status(200).send(token);
                } catch (err: any) {
                    // TODO Implement proper error handling
                    res.status(403).send(err.message);
                }
            }});
    }
}

export { AuthController };
