import {Model} from 'objection';

class UserModel extends Model {
	public 'email': string;
	public 'password': string;
	public 'picture': string;
	public 'id': number;

	public static override get tableName(): string {
		return 'users';
	}

	public static override get relationMappings() {
		return {};
	}
}
export {UserModel};
