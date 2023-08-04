export const createRoomToUserEntities = (roomId: number, userIds: number[]) =>
	userIds.map(userId => ({room_id: roomId, user_id: userId}));
