const con = require("..//db/db.js");

module.exports = {
  addProduct: (name, img, desc, catid) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `INSERT INTO products (productname,productimg,productdesc,catid) VALUES(?,?,?,?)`,
          [name, img, desc, catid]
        );
        if (result.affectedRows) {
          return resolve(true);
        }
      } catch (error) {
        return reject(error);
      }
    });
  },
  getAllProduct: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`SELECT * FROM products`);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  },
  deleteProduct: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`DELETE FROM products WHERE id = ?`, [
          id,
        ]);

        if (result.affectedRows > 0) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        return reject(error);
      }
    });
  },

  updateProduct: (id, catid, content, name, img) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (img) {
          const [result] = await con.execute(
            `UPDATE products SET productname=?,productimg=?,productdesc=?,catid=? WHERE id = ?`,
            [name, img, content, catid, id]
          );
          if (result.affectedRows) {
            return resolve(true);
          }
        } else {
          const [result] = await con.execute(
            `UPDATE products SET productname=?,productdesc=?,catid=? WHERE id = ?`,
            [name, content, catid, id]
          );
          if (result.affectedRows) {
            return resolve(true);
          }
        }
      } catch (error) {
        return reject(error);
      }
    });
  },
};