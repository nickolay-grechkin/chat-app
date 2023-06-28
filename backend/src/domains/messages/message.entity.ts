import {BaseEntity} from "../common/classes/classes";

class MessageEntity extends BaseEntity {
    private 'userId': number | null;
    private 'roomId': number | null;
    private 'content': string | null;

    private constructor({
        id,
        userId,
        roomId,
        content,
        createdAt,
        updatedAt
    }: {
        id: number | null,
        userId: number | null,
        roomId: number | null,
        content: string | null,
        createdAt: string | null,
        updatedAt: string | null
    }) {
        super();
        this.id = id;
        this.userId = userId;
        this.roomId = roomId;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static initialize({
        id,
        userId,
        roomId,
        content,
        createdAt,
        updatedAt
    }: {
        id: number | null,
        userId: number | null,
        roomId: number | null,
        content: string | null,
        createdAt: string | null,
        updatedAt: string | null
    }) {
        return new MessageEntity({
            id,
            content,
            userId,
            roomId,
            createdAt,
            updatedAt
        });
    }
}

export { MessageEntity };
