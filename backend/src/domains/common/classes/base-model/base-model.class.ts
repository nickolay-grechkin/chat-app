import {Model} from 'objection';

class BaseModel extends Model {
	public 'id': number;

	public 'created_at': string;

	public 'updated_at': string;
}

export {BaseModel};
