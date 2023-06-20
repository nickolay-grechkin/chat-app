class MessageEntity {
    private 'id': number | null;
    private 'senderId': number | null;
    private 'receiverId': number | null;
    private 'dialogId': number | null;
    private 'content': string | null;

    private constructor({
        id,
        senderId,
        receiverId,
        dialogId,
        content
    }: {
        id: number | null,
        senderId: number | null,
        receiverId: number | null,
        dialogId: number | null,
        content: string | null
    }) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.dialogId = dialogId;
        this.content = content;
    }

    public static initialize({
        id,
        senderId,
        receiverId,
        dialogId,
        content
    }: {
        id: number | null,
        senderId: number | null,
        receiverId: number | null,
        dialogId: number | null,
        content: string | null
    }) {
        return new MessageEntity({ id, content, dialogId, receiverId, senderId });
    }
}

export { MessageEntity };
