startMission, getMEMBER, getMission

import { resourceUsage } from "process";
import { pool } from "../config/db.config.js";
import { BaseError } from "../config/error.js";
import { status } from "../config/response.status.js";

const confirmStatus = "SELECT EXISTS (SELECT 1 FROM member_mission WHERE id = ? AND member_id = ?) as confirmStatus";
const newMission = "INSERT INTO member_mission(id, member_id, mission_id, status) VALUES (?,?,?,?)";
const getMember = "SELECT name FROM member WHERE id = ?";
const getmembernum = "SELECT member_id FROM member_mission WHERE id = ?";
const getmission = "SELECT id FROM mission WHERE id = ?";

export const startMission = async(data) => {
    try{
        const conn = await pool.getConnection();
        const [confirm] = await pool.query(confirmStatus, [data.store_id, data.member_id]);
        
        if(confirm[0].confirmStore === 1){
            conn.release();
            return -1;
        }
        const result = await pool.query(newMission, [data.id, data.member_id, data.mission_id, data.status]);
        conn.release();
        return result[0].id;
    }
    catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


export const getMisson = async(data) => {
    try{
        const conn = await pool.getConnection();
        const result = await pool.query(getmission, data);
        conn.release();
        return result;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getMEMBER = async(data) => {
    try{
        const conn = await pool.getConnection();
        const member_id = await pool.query(getmembernum, data);
        const result = await pool.query(getMember, member_id);
        conn.release();
        return result;
    }catch(err){
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}