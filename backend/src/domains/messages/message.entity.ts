import {BaseEntity} from '../common/classes/classes';

class MessageEntity extends BaseEntity {
	private readonly 'userId': number | undefined;
	private readonly 'roomId': number | undefined;
	private readonly 'content': string | undefined;

	private constructor({
		id,
		userId,
		roomId,
		content,
		createdAt,
		updatedAt,
	}: {
		id: number | undefined;
		userId: number | undefined;
		roomId: number | undefined;
		content: string | undefined;
		createdAt: string | undefined;
		updatedAt: string | undefined;
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
		updatedAt,
	}: {
		id: number | undefined;
		userId: number | undefined;
		roomId: number | undefined;
		content: string | undefined;
		createdAt: string | undefined;
		updatedAt: string | undefined;
	}) {
		return new MessageEntity({
			id,
			content,
			userId,
			roomId,
			createdAt,
			updatedAt,
		});
	}
}

export {MessageEntity};
