
const newService = require('../services/newService.js');
const productService = require('../services/productService.js');
const categoryService = require('../services/categoriesService.js');

module.exports = {
  handleRenderAdminLoginPage: (req, res) => {
    const message = req.flash("message")[0];
    return res.render("./Admin/login.ejs", { message });
  },

  handleUploadImage: (req, res) => {
    console.log("req.file.path >>>>", req.file.path);
    return res.status(200).json({ path: req.file.path });
  },

  handleAddNew: async (req, res) => {
    const { content, title, imageUrl } = req.body;
    try {
      const result = await newService.addNew(content, title, imageUrl);
      if (result) {
        return res.status(200).json(true);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  handleDeleteNew: async (req, res) => {
    const { id } = req.query;
    try {
      const result = await newService.deleteNew(id);
      if (result) {
        return res.redirect("/admin/dashboard");
      }
    } catch (error) {
      return res.render("ErrorPage.ejs");
    }
  },

  handleDeleteNewById: async (req, res) => {
    const { content, title, imageUrl } = req.body;
    const { id } = req.params;
    try {
      const result = await newService.updateNew(content, title, imageUrl, id);
      if (result) {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  handleAddProduct: async (req, res) => {
    const { name, img, desc, catid } = req.body;
    try {
      const result = await productService.addProduct(name, img, desc, catid);
      if (result) {
        return res.status(200).json(true);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  handleDeleteProduct: async (req, res) => {
    const { id } = req.query;
    try {
      const result = await productService.deleteProduct(id);
      if (result) {
        return res.redirect("/admin/dashboard");
      }
    } catch (error) {
      return res.render("ErrorPage.ejs");
    }
  },

  handleUpdateProductById: async (req, res) => {
    const { catid, content, name, img } = req.body;
    const { id } = req.params;
    try {
      const result = await productService.updateProduct(
        id,
        catid,
        content,
        name,
        img
      );
      if (result) {
        return res.status(200).json(result);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  handleRenderDashboard: async (req, res) => {
    let roles = req?.roles;
    let news = await newService.getAllnews();
    let products = await productService.getAllProduct();
    let cats = await categoryService.getAllCategory();
    return res.render("./Admin/dashboard.ejs", { roles, news, cats, products });
  },

  handleRenderDashboardProduct: async (req, res) => {
    let roles = req?.roles;

    let products = await productService.getAllProduct();
    let cats = await categoryService.getAllCategory();
    return res.render("./Admin/dashboardProduct.ejs", { roles, cats, products });
  },
  handleRenderDashboardNews: async (req, res) => {
    let roles = req?.roles;

    let cats = await categoryService.getAllCategory();
    let news = await newService.getAllnews();
    return res.render("./Admin/dashboardNews.ejs", { roles, cats, news });
  },
};

