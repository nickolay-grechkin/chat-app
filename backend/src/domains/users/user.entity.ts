// TODO Investigate how this UserEntity works
import {UserShorterDto} from "./common/types/userShorterDto";

class UserEntity {
    private 'id': number | null;

    private 'email': string | null;

    private 'password': string | null;

    private constructor({
      id,
      email,
      password
    }: {
      id: number | null,
      email: string | null,
      password: string | null
    }) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public static initialize({
      id,
      email,
      password
    }: {
        id: number | null,
        email: string | null,
        password: string | null
    }): UserEntity {
      return new UserEntity({ id, email, password });
    }

    public toShorterObject(): UserShorterDto {
        return {
            id: this.id as number,
            email: this.email as string
        }
    }

    public toObject(): {
        id: number,
        email: string,
        password: string
    } {
        return {
            id: this.id as number,
            email: this.email as string,
            password: this.password as string
        }
    }
}

export { UserEntity };
