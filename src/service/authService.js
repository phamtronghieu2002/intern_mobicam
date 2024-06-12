import con from "..//db/db.js";
import { create_access_token } from "../utils/jwt.js";

const saveTokenOnBrowser = (res, access_token) => {
  res.cookie("accesstoken", access_token, {
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });
};

const getRoleByUserId = async (userId) => {
  const [result] = await con.execute(
    "select r.rolename  from users u join user_role ur  on ur.userid = u.id  join roles r on ur.roleid = r.id  where u.id= ?",
    [userId]
  );
  if (result.length > 0) {
    const roles = result.map((role) => {
      return role.rolename;
    });

    return roles;
  }
  return [];
};

export const checkLogin = (res, username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const param = [username, password];
      const [result] = await con.execute(
        "select u.id,u.username from users u  where u.username = ? and u.password = ?",
        param
      );
      const user = result[0];
      const roles= await getRoleByUserId(user.id);
      user.roles = roles;
      if (result.length > 0) {
        let access_token = create_access_token(result[0], "1h");
        saveTokenOnBrowser(res, access_token);
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};
