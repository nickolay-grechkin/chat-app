import {RoomRepository} from "./room.repository";
import {RoomEntity} from "./room.entity";
import {CreateRoomDTO} from "./common/dtos/createRoomDTO";
import {RoomToUserRepository} from "../roomToUser/roomToUser.repository";
import {UserRepository} from "../users/user.repository";
import {createRoomToUserEntities} from "./utils/utils";

class RoomService {
    private roomRepository: RoomRepository;
    private roomToUserRepository: RoomToUserRepository;
    private userRepository: UserRepository;

    constructor(
        roomRepository: RoomRepository,
        roomToUserRepository: RoomToUserRepository,
        userRepository: UserRepository
    ) {
        this.roomRepository = roomRepository;
        this.roomToUserRepository = roomToUserRepository;
        this.userRepository = userRepository;
    }

    public async getAllRoomsByUserId(userId: number): Promise<RoomEntity[]> {
        return await this.roomRepository.getAllRoomsByUserId(userId);
    }

    public async createIndividualRoom(roomDto: CreateRoomDTO): Promise<number> {
        const { inviteeId, inviterId } = roomDto;

        const isInviteeExist = await this.userRepository.findById(inviteeId) !== null;

        if (!isInviteeExist) {
            throw new Error('Invitee doesnt exist');
        }

        const inviterRooms = await this.roomRepository.getIndividualRoomIdsByUserId(inviterId);
        const inviteeRooms = await this.roomRepository.getIndividualRoomIdsByUserId(inviteeId);

        const isShareSameIndividualRoom = inviterRooms?.some(roomId => inviteeRooms?.includes(roomId));

        if (isShareSameIndividualRoom) {
            throw new Error('Individual room for this users have already exist');
        }

        const roomId = await this.roomRepository.createIndividualRoom();

        if (!roomId) {
            throw new Error('Room creation failed.');
        }

        const entitiesToInsert = createRoomToUserEntities(roomId, [inviterId, inviteeId]);

        await this.roomToUserRepository.createRoomToUserRelation(entitiesToInsert);

        return roomId;
    }

}

export { RoomService };
