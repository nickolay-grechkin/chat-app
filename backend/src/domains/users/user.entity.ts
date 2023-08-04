// TODO Investigate how this UserEntity works
import {type UserShorterDto} from './common/types/userShorterDto';

class UserEntity {
	private readonly 'id': number | undefined;

	private readonly 'email': string | undefined;

	private readonly 'password': string | undefined;

	private constructor({
		id,
		email,
		password,
	}: {
		id: number | undefined;
		email: string | undefined;
		password: string | undefined;
	}) {
		this.id = id;
		this.email = email;
		this.password = password;
	}

	public static initialize({
		id,
		email,
		password,
	}: {
		id: number | undefined;
		email: string | undefined;
		password: string | undefined;
	}): UserEntity {
		return new UserEntity({id, email, password});
	}

	public toShorterObject(): UserShorterDto {
		return {
			id: this.id!,
			email: this.email!,
		};
	}

	public toObject(): {
		id: number;
		email: string;
		password: string;
	} {
		return {
			id: this.id!,
			email: this.email!,
			password: this.password!,
		};
	}
}

export {UserEntity};
