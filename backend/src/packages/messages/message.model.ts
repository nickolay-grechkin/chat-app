import {Model} from "objection";

class MessageModel extends Model {
    public 'id': number | null;
    public 'sender_id': number | null;
    public 'receiver_id': number | null;
    public 'dialog_id': number | null;
    public 'content': string | null;

    public static override get tableName(): string {
        return 'messages';
    }

    public static override get relationMappings() {
        return {};
    }
}

export { MessageModel };
