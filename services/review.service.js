import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { newReviewDTO } from "../dtos/review.dto.js"
import { addReview } from "../models/review.dao.js";

export const newReview = async (body) => {
    const joinReviewData = await addReview({
        'id' : body.id,
        'member_id' : body.member_id,
        'store_id': body.store_id,
        'content': body.content
    });

    if(joinReviewData == -1){
        throw new BaseError(status.STORE_NOT_FOUND);
    }else{
        return newReviewDTO(joinReviewData);
    }
}