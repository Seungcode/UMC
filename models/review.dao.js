import { resourceUsage } from "process";
import { pool } from "../config/db.config.js";
import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";

const confirmStore = "SELECT EXISTS (SELECT 1 FROM store WHERE id = ?) as confirmStore"
const add = "INSERT INTO review(id, member_id, store_id, content) VALUES (?,?,?,?)"

export const addReview = async(data) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(confirmStore, data.store_id);
        
        if(confirm[0].confirmStore === 1){
            const result = await pool.query(add, [data.id, data.member_id, data.store_id, data.content]);
            conn.release();
            return result[0].id;
        }
        else{
            conn.release();
            return -1;
        }
    }
    catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}
