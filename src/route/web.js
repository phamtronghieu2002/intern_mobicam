import express from "express";
const router = express.Router();

import * as authService from "..//service/authService";
import * as newService from "../service/newService";
import * as categoryService from "../service/categoriesService";
import * as productService from "../service/productService";


import * as homeController from "..//controllers/homeController";
import * as adminController from "..//controllers/adminController";
import { veryfyUser } from "../middlewares/authMiddleware";
import { uploadImage } from "../middlewares/uploadImage";

const InitApiRoute = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/",homeController.handleRenderHomePage);

  router.get("/news/all",homeController.handleGetAllNews);


  router.get("/news/detail/:id", homeController.handleGetNewById);

  router.get("/new", homeController.handleRenderNewPage);

  // ====================================Admin=======================================

  //admin login
  router.get("/admin", adminController.handleRenderAdminLoginPage);

  //upload image
  router.post("/admin/uploadimage",uploadImage.single("image"),adminController.handleUploadImage);


 //add new
  router.post("/admin/add-new", adminController.handleAddNew);


  //delete new
  router.get("/admin/delete-new", adminController.handleDeleteNew);
 //add new
 router.put("/admin/update-new/:id", adminController.handleDeleteNewById);

// add product
router.post("/admin/add-product", adminController.handleAddProduct);

router.get("/admin/delete-product", adminController.handleDeleteProduct);




router.put("/admin/update-product/:id", adminController.handleUpdateProductById);
//access dashboard





  router.get("/admin/dashboard", veryfyUser,adminController.handleRenderDashboard);



  router.get("/admin/dashboard/product", veryfyUser,adminController.handleRenderDashboardProduct);

  router.get("/admin/dashboard/news", veryfyUser, adminController.handleRenderDashboardNews);
  //check login


  
  router.post("/admin/checklogin", async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await authService.checkLogin(res, username, password);
      if (result) {
        return res.redirect("/admin/dashboard");
      }
      req.flash("message", "Invalid username or password");
      return res.redirect(`/admin`);
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  });

  app.use(router);
};

export { InitApiRoute };
