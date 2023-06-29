import { BaseModel } from "../common/classes/classes";
import {Table} from "../../common/enums/enum";
import {UserModel} from "../users/user.model";
import {Model, RelationMappings} from "objection";

class MessageModel extends BaseModel {
    public 'user_id': number | null;
    public 'room_id': number | null;
    public 'content': string | null;
    public 'user': UserModel | null;

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
                    to: `${Table.USERS}.id`
                }
            }
        };
    }
}

export { MessageModel };
