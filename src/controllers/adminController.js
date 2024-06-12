import * as authService from "..//service/authService";
import * as newService from "../service/newService";
import * as categoryService from "../service/categoriesService";
import * as productService from "../service/productService";

export const handleRenderAdminLoginPage = (req, res) => {

    const message = req.flash("message")[0];
    return res.render("./Admin/login.ejs", { message });
}

export const handleUploadImage = (req, res) => {
    console.log("req.file.path >>>>", req.file.path);
    return res.status(200).json({ path: req.file.path });
 }

 export const handleAddNew=async(req, res) => {
    const {content,title,imageUrl} = req.body;
    try {
      const result = await newService.addNew(content,title,imageUrl);
      if (result) {
        return res.status(200).json(true);
      }
    } catch (error) {
        return  res.status(500).json({message:"Internal server error"});
    }
}

export const handleDeleteNew =async(req, res) => {
    const {id} = req.query;
    try {
      const result = await newService.deleteNew(id);
      if (result) {
        return res.redirect("/admin/dashboard");
      }
    } catch (error) {
      return res.render("ErrorPage.ejs");
    }
}

export const handleDeleteNewById=async(req, res) => {
    const {content,title,imageUrl} = req.body;
    const {id}= req.params;
    try {
      const result = await newService.updateNew(content,title,imageUrl,id);
      if (result) {
        return res.status(200).json(result);
      }
    } catch (error) {
        return  res.status(500).json({message:"Internal server error"});
    }
  }

  export const handleAddProduct =async(req, res) => {
    const {name,img,desc,catid} = req.body;
    try {
      const result = await productService.addProduct(name,img,desc,catid);
      if (result) {
        return res.status(200).json(true);
      }
    } catch (error) {
        return  res.status(500).json({message:"Internal server error"});
    }
  }

  export const handleDeleteProduct =async(req, res) => {
    const {id} = req.query;
    try {
      const result = await productService.deleteProduct(id);
      if (result) {
        return res.redirect("/admin/dashboard");
      }
    } catch (error) {
      return res.render("ErrorPage.ejs");
    }
  }

  export const handleUpdateProductById=async(req, res) => {
    const {catid,content,name,img} = req.body;
    const {id}= req.params;
    try {
      const result = await productService.updateProduct(id,catid,content,name,img);
      if (result) {
        return res.status(200).json(result);
      }
    } catch (error) {
        return  res.status(500).json({message:"Internal server error"});
    }
  }

  export const handleRenderDashboard = async(req, res) => {
    let roles = req?.roles;
    let news= await newService.getAllnews();
    let products= await productService.getAllProduct();
    let cats = await categoryService.getAllCategory();
    return res.render("./Admin/dashboard.ejs", { roles,news,cats,products });
  }

  export const handleRenderDashboardProduct =  async(req, res) => {
    let roles = req?.roles;

    let products= await productService.getAllProduct();
    let cats = await categoryService.getAllCategory();
    return res.render("./Admin/dashboardProduct.ejs", { roles,cats,products });
  }
  export const handleRenderDashboardNews =async(req, res) => {
    let roles = req?.roles;

    let cats = await categoryService.getAllCategory();
    let news= await newService.getAllnews();
    return res.render("./Admin/dashboardNews.ejs", { roles,cats,news });
  }