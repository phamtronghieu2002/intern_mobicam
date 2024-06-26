const express = require("express");
const authService = require("..//services/authService.js");
const categoryService = require("../services/categoriesService.js");
const homeController = require("..//controllers/homeController.js");
const adminController = require("..//controllers/adminController.js");
const { veryfyUser } = require("../middlewares/authMiddleware.js");
const { uploadImage } = require("../middlewares/uploadImage.js");

const router = express.Router();



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



  router.get("/admin/dashboard/page/product", veryfyUser,adminController.handleRenderDashboardProduct);

  router.get("/admin/dashboard/page/news", veryfyUser, adminController.handleRenderDashboardNews);
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

  router.get("/category/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const categories = await categoryService.getAllCategoryAndProduct();
      const category = categories.find((item) => item.id == id
      );
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  );

  router.get("/admin/logout", (req, res) => {
    res.clearCookie("accesstoken");
    return res.redirect("/admin/dashboard");
  });
  app.use(router);
};

module.exports  ={ InitApiRoute };
