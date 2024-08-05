import { UserRepository } from './user.repository';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userService, userController, userRepository };
