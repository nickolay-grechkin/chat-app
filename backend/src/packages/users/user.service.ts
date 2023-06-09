import {type UserRepository} from "./user.repository";
import {UserEntity} from "./user.entity";
import {UserByEmailResponse} from "./libs/types/UserByEmailResponse";

class UserService {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.findAll();
    }

    public async findByEmail(email: string): Promise<UserByEmailResponse | null> {
        const user = (await this.userRepository.findByEmail(email));

        if (!user) {
            return null;
        }

        return user.toObject();
    }
}

export { UserService };
