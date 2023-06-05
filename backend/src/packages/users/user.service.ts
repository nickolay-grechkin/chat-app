import {type UserRepository} from "./user.repository";

class UserService {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findAll(): Promise<any> {
        const users = await this.userRepository.findAll();

        return {
            users
        }
    }
}

export { UserService };
