import {type UserRepository} from "./user.repository";
import {UserEntity} from "./user.entity";

class UserService {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.findAll();
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findByEmail(email);
    }
}

export { UserService };
