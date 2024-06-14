const con = require("..//db/db.js");


  const getAllCategory = () => { 
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`SELECT * FROM categories`);
  
        return resolve(result);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  }
  const  getAllCategoryAndProduct = () => { 
    return new Promise(async (resolve, reject) => {
      try {
        const categories = await  getAllCategory();
        for(let category of categories){
          const [products] = await con.execute(`SELECT * FROM products WHERE catid = ${category.id}`);
          category.products = products;
        }
      
        console.log("categories >>>", categories);
        return resolve(categories);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  }

  module.exports={
    getAllCategory,
    getAllCategoryAndProduct
  }
  



