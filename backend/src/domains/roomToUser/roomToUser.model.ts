import { BaseModel } from '../common/classes/classes';
import { Table } from '../../common/enums/tables';

class RoomToUserModel extends BaseModel {
	public 'user_id': number;
	public 'room_id': number;

	public static override get tableName(): string {
		return Table.ROOM_TO_USER;
	}

	public static override get relationMappings() {
		return {};
	}
}

export { RoomToUserModel };
