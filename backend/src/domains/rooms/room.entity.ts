import {BaseEntity} from '../common/classes/classes';

class RoomEntity extends BaseEntity {
	private readonly name: string | undefined;
	private readonly picture: string | undefined;
	private readonly lastMessage: string | undefined;
	private readonly isIndividualRoom: boolean | undefined;
	private constructor({
		id,
		name,
		picture,
		lastMessage,
		isIndividualRoom,
	}: {
		id: number | undefined;
		name: string | undefined;
		picture: string | undefined;
		lastMessage: string | undefined;
		isIndividualRoom: boolean | undefined;
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
		id: number | undefined;
		name: string | undefined;
		picture: string | undefined;
		lastMessage: string | undefined;
		isIndividualRoom: boolean | undefined;
	}) {
		return new RoomEntity({id, name, picture, lastMessage, isIndividualRoom});
	}
}

export {RoomEntity};
