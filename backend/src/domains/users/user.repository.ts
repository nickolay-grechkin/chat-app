import {UserModel} from "./user.model";
import {UserEntity} from "./user.entity";
import {CreateUserDto} from "./common/types/createUserDto";

class UserRepository {
    private userModel: typeof UserModel;

    public constructor(userModel: typeof UserModel) {
        this.userModel = userModel;
    }

    public async findAll(): Promise<UserEntity[]> {
        const users = await this.userModel.query().select();

        return users.map((user) => {
           return UserEntity.initialize({
               id: user.id,
               email: user.email,
               password: user.password
           })
        });
    }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.userModel
            .query()
            .where('email', email)
            .first();

        if (!user) {
            return null;
        }

        return UserEntity.initialize({
            id: user.id,
            email: user.email,
            password: user.password
        });
    }

    public async findById(id: number): Promise<UserEntity | null> {
        const user = await this.userModel
            .query()
            .where('id', id)
            .first();

        if (!user) {
            return null;
        }

        return UserEntity.initialize({
            id: user.id,
            email: user.email,
            password: user.password
        });
    }

    public async create(userData: CreateUserDto): Promise<UserEntity | null> {
        const { email, password } = userData;

        const user = await this.userModel
            .query()
            .insertAndFetch({ email, password });

        return UserEntity.initialize({
            id: null,
            email: user.email,
            password: password
        });
    }

    public async uploadAvatar(userId: number, avatarLink: string): Promise<void> {
         await  this.userModel
            .query()
            .where({ id: userId })
            .update({ picture: avatarLink });
    }
}

export { UserRepository };
