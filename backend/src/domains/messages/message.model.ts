import { BaseModel } from "../common/classes/classes";
import {Table} from "../../common/enums/enum";

class MessageModel extends BaseModel {
    public 'user_id': number | null;
    public 'room_id': number | null;
    public 'content': string | null;

    public static override get tableName(): string {
        return Table.MESSAGES;
    }

    public static override get relationMappings() {
        return {};
    }
}

export { MessageModel };
