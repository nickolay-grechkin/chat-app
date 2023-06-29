import {BaseEntity} from "../common/classes/classes";

class RoomEntity extends BaseEntity {
    private name: string | null;
    private picture: string | null;
    private lastMessage: string | null;

    private constructor({
        id,
        name,
        picture,
        lastMessage,
    }: {
        id: number | null;
        name: string | null;
        picture: string | null;
        lastMessage: string | null;
    }) {
        super();
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.lastMessage = lastMessage
    }

    public static initialize({
        id,
        name,
        picture,
        lastMessage,
    }: {
        id: number | null;
        name: string | null;
        picture: string | null;
        lastMessage: string | null;
    }) {
        return new RoomEntity({ id, name, picture, lastMessage });
    }
}

export { RoomEntity };
