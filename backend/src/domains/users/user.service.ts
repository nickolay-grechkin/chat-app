import {type UserRepository} from "./user.repository";
import {UserEntity} from "./user.entity";
import {UserByEmailResponse} from "./common/types/userByEmailResponse";
import {UserShorterDto} from "./common/types/userShorterDto";
import {CreateUserDto} from "./common/types/createUserDto";
import * as bcrypt from 'bcrypt';
import {AppError} from "../../services/error/app-error";
import {HttpStatus} from "../../common/enums/httpStatus";
import {uploadFile} from "../../services/file/fileParser";

class UserService {
    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findAll(): Promise<UserEntity[]> {
        return this.userRepository.findAll();
    }

    public async findByEmail(email: string): Promise<UserByEmailResponse | null> {
        const user = (await this.userRepository.findByEmail(email));

        if (!user) {
            return null;
        }

        return user.toObject();
    }

    public async findById(id: number): Promise<UserShorterDto | null> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            return null;
        }

        return user.toShorterObject();
    }

    public async create(userData: CreateUserDto): Promise<UserEntity | null> {
        const { password } = userData;

        try {
            // TODO How this work under the hood, check email uniqueness
            const hashedPassword = await new Promise<string>((resolve, reject) => {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        reject(new AppError(err.message, HttpStatus.INTERNAL_SERVER_ERROR, false));
                    }

                    resolve(hash);
                });
            });
            return  this.userRepository.create({ ...userData, password: hashedPassword });
        } catch (error: any) {
            throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR, false);
        }

    }

    public async uploadAvatar(userId: number, file: any): Promise<string> {
        const avatarLink = await uploadFile(file.originalname, file.buffer, file.mimetype);

        await this.userRepository.uploadAvatar(userId, avatarLink);

        return avatarLink;
    }
}

export { UserService };
