import { BaseEntity } from '../common/classes/classes';

class RoomEntity extends BaseEntity {
	private name: string | null;
	private picture: string | null;
	private lastMessage: string | null;
	private isIndividualRoom: boolean | null;
	private constructor({
		id,
		name,
		picture,
		lastMessage,
		isIndividualRoom,
	}: {
		id: number | null;
		name: string | null;
		picture: string | null;
		lastMessage: string | null;
		isIndividualRoom: boolean | null;
	}) {
		super();
		this.id = id;
		this.name = name;
		this.picture = picture;
		this.lastMessage = lastMessage;
		this.isIndividualRoom = isIndividualRoom;
	}

	public static initialize({
		id,
		name,
		picture,
		lastMessage,
		isIndividualRoom,
	}: {
		id: number | null;
		name: string | null;
		picture: string | null;
		lastMessage: string | null;
		isIndividualRoom: boolean | null;
	}) {
		return new RoomEntity({ id, name, picture, lastMessage, isIndividualRoom });
	}
}

export { RoomEntity };
