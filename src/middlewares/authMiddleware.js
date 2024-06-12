import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";



export const veryfyUser = async (req, res, next) => {
  const accessToken = req.cookies.accesstoken ;
  
  if (accessToken) {
    try {
      const user = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      const userRoles = user.roles;
      req.roles = userRoles;
      
      next();
    } catch (error) {
      return res.redirect("/admin");
    }
  } else {
    return res.redirect("/admin");
  }
};