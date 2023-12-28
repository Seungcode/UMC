import { response } from "../config/response.js";
import { status } from "../config/response.status.js";

import { startNew } from "../services/mission.service.js";

export const startMission = async (req, res, next) => {
    console.log("미션시작 요청을 보냅니다.");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await startNew(req.body)));
}