import {BaseModel} from '../common/classes/classes';
import {Table} from '../../common/enums/enum';
import {UserModel} from '../users/user.model';
import {Model, type RelationMappings} from 'objection';

class MessageModel extends BaseModel {
	public 'user_id': number | undefined;
	public 'room_id': number | undefined;
	public 'content': string | undefined;
	public 'user': UserModel | undefined;

	public static override get tableName(): string {
		return Table.MESSAGES;
	}

	public static override get relationMappings(): RelationMappings {
		return {
			user: {
				relation: Model.HasOneRelation,
				modelClass: UserModel,
				join: {
					from: `${Table.MESSAGES}.user_id`,
					to: `${Table.USERS}.id`,
				},
			},
		};
	}
}

export {MessageModel};
