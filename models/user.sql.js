// models/user.sql.js

export const insertUserSql = "INSERT INTO member (id, email, name, gender, age, address, spec_address, user_phone) VALUES (?, ?, ?, ?, ?, ?, ?);";

export const getUserID = "SELECT * FROM member WHERE id = ?";

export const connectFoodCategory = "INSERT INTO member_prefer (id, member_id, cartegory_id) VALUES (?, ?, ?);";

export const confirmEmail = "SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail";

export const getPreferToUserID =
"SELECT ufc.category_id, ufc.member_id, ufc.id_id, fcl.name "
+ "FROM member_prefer ufc JOIN food_category_list fcl on ufc.f_category_id = fcl.f_category_id "
+ "WHERE ufc.user_id = ? ORDER BY ufc.category_id ASC;";