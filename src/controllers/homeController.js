import * as authService from "..//service/authService";
import * as newService from "../service/newService";
import * as categoryService from "../service/categoriesService";
import * as productService from "../service/productService";


export const handleRenderHomePage =async (req, res) => {
    try {
      const news=await newService.getNewsLimit(3);
      const categories = await categoryService.getAllCategoryAndProduct();
      return res.render("./Home/home.ejs",{news,categories});
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");
    }
  }

export const handleGetAllNews =async(req, res) => {
  try {
    const news =await newService.getAllnews();
 
    return res.render("./New/allNews.ejs",{news});
} catch (error) {
  console.log("error >>>", error);
  return res.render("ErrorPage.ejs");

}

}


export const handleGetNewById=async(req, res) => {
    const { id } = req.params;
    try {
        const newDetail =await newService.getNewbyId(id);
        return res.render("./New/detailNew.ejs",{newDetail});
    } catch (error) {
      console.log("error >>>", error);
      return res.render("ErrorPage.ejs");

    }
    
  }

  export const handleRenderNewPage =(req, res) => {
    return res.render("./New/new.ejs");
  }