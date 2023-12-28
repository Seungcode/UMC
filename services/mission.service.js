import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { startMissionDTO } from "../dtos/mission.dto.js"
import { startMission, getMEMBER, getMission} from "../models/mission.dao.js";

export const startNew = async (body) => {
    const startMissionData = await startMission({
        'id' : body.id,
        'member_id' : body.member_id,
        'mission_id': body.mission_id,
        'status': "ing"
    });

    if(startMissionData == -1){
        throw new BaseError(status.STORE_NOT_FOUND);
    }else{
        return startMissionDTO(await getMEMBER(startMissionData), await getMission(startMissionData));
    }
}