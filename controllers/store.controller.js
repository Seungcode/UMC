import { response } from "../config/response.js";
import { status } from "../config/response.status.js";

import { newStore } from "../services/store.service.js";

export const addStore = async (req, res, next) => {
    console.log("새로운 가게 신청이 들어옵나다");
    console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

    res.send(response(status.SUCCESS, await newStore(req.body)));
}