import {BaseModel} from '../common/classes/classes';
import {Table} from '../../common/enums/enum';
import {UserModel} from '../users/user.model';
import {Model, type RelationMappings} from 'objection';

class RoomModel extends BaseModel {
	public 'name': string | undefined;
	public 'picture': string | undefined;
	public 'last_message': string | undefined;
	public 'isIndividualRoom': boolean | undefined;
	public 'users': UserModel[] | undefined;

	public static override get tableName(): string {
		return Table.ROOMS;
	}

	public static override get relationMappings(): RelationMappings {
		return {
			users: {
				relation: Model.ManyToManyRelation,
				modelClass: UserModel,
				join: {
					from: `${Table.ROOMS}.id`,
					through: {
						from: `${Table.ROOM_TO_USER}.room_id`,
						to: `${Table.ROOM_TO_USER}.user_id`,
					},
					to: `${Table.USERS}.id`,
				},
			},
		};
	}
}

export {RoomModel};
