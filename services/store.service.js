import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";
import { newStoreDTO } from "../dtos/store.dto.js"
import { addStore, getStore, getReigion} from "../models/store.dao.js";

export const newStore = async (body) => {
    const joinStoreData = await addStore({
        'id' : body.id,
        'region_id' : body.region_id,
        'name': body.name,
        'adress': body.address,
        'score': 0
    });

    if(joinStoreData == -1){
        throw new BaseError(status.LOCATION_NOT_FOUND);
    }else{
        return newStoreDTO(await getStore(joinStoreData), await getReigion(joinStoreData));
    }
}