import {type UserRepository} from './user.repository';
import {type UserEntity} from './user.entity';
import {type UserByEmailResponse} from './common/types/userByEmailResponse';
import {type UserShorterDto} from './common/types/userShorterDto';
import {type CreateUserDto} from './common/types/createUserDto';
import * as bcrypt from 'bcrypt';
import {AppError} from '../../services/error/app-error';
import {HttpStatus} from '../../common/enums/httpStatus';
import {type MulterFile} from '../../common/types/multer-file';
import {s3Client} from '../../services/s3/s3';

class UserService {
	private readonly userRepository: UserRepository;

	public constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	public async findAll(): Promise<UserEntity[]> {
		return this.userRepository.findAll();
	}

	public async findByEmail(email: string): Promise<UserByEmailResponse | undefined> {
		const user = (await this.userRepository.findByEmail(email));

		if (!user) {
			return null;
		}

		return user.toObject();
	}

	public async findById(id: number): Promise<UserShorterDto | undefined> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			return null;
		}

		return user.toShorterObject();
	}

	public async create(userData: CreateUserDto): Promise<UserEntity | undefined> {
		const {password} = userData;

		try {
			const hashedPassword = await new Promise<string>((resolve, reject) => {
				bcrypt.hash(password, 10, (err, hash) => {
					if (err) {
						reject(new AppError(err.message, HttpStatus.INTERNAL_SERVER_ERROR, false));
					}

					resolve(hash);
				});
			});
			return await this.userRepository.create({...userData, password: hashedPassword});
		} catch (error: any) {
			throw new AppError(error.message, HttpStatus.INTERNAL_SERVER_ERROR, false);
		}
	}

	public async uploadAvatar(userId: number, file: MulterFile): Promise<string> {
		const avatarLink = await s3Client.uploadFile(file);

		await this.userRepository.uploadAvatar(userId, avatarLink);

		return avatarLink;
	}
}

export {UserService};
