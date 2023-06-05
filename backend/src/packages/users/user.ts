import {
    UserRepository
} from "./user.repository";
import {
    UserModel
} from "./user.model";
import {UserService} from "./user.service";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);

export { userService };
