import { resourceUsage } from "process";
import { pool } from "../config/db.config.js";
import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";

const confirmReigion = "SELECT EXISTS (SELECT 1 FROM region WHERE id = ?) as confirmReigion"
const add = "INSERT INTO store(id, region_id, name, adress, score) VALUES (?,?,?,?,?)"
const store = "SELECT name FROM store WHERE id = ?"
const region = "SELECT name FROM region WHERE id = ?"
export const addStore = async(data) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(confirmReigion, data.region_id);
        
        if(confirm[0].confirmReigion === 1){
            const result = await pool.query(add, [data.id, data.region_id, data.name, data.adress, data.score]);
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

export const getStore = async(id) => {
    try{
        const conn = await pool.getConnection();
        const result = await pool.query(store, id);
        conn.release();
        return result;
    }
    catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getReigion = async(id) => {
    try{
        const conn = await pool.getConnection();
        const result = await pool.query(region, id);
        conn.release();
        return result;
    }
    catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}