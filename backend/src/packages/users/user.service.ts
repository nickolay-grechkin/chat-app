import {type UserRepository} from "./user.repository";
import {UserEntity} from "./user.entity";

class UserService {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAll();

        return await this.userRepository.findAll();
    }
}

export { UserService };
