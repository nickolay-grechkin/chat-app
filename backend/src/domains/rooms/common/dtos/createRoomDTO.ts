type CreateRoomDTO = {
	name?: string;
	picture?: string;
	lastMessage?: string;
	inviterId: number;
	inviteeId: number;
};

export type {CreateRoomDTO};
