const con = require("..//db/db.js");


module.exports = {
  addNew: (content, title, imageUrl) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("xin chao ae");
        const [result] = await con.execute(
          `INSERT INTO news (content,title,img) VALUES (?,?,?)`,
          [content, title, imageUrl]
        );

        if (result.affectedRows > 0) {
          return resolve(true);
        }
        return resolve(false);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  },

  updateNew: (content, title, imageUrl, id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (imageUrl) {
          const [result] = await con.execute(
            `UPDATE news SET content = ?, title = ?, img = ? WHERE id = ?`,
            [content, title, imageUrl, id]
          );

          if (result.affectedRows > 0) {
            return resolve(true);
          }
          return resolve(false);
        } else {
          const [result] = await con.execute(
            `UPDATE news SET content = ?, title = ? WHERE id = ?`,
            [content, title, id]
          );

          if (result.affectedRows > 0) {
            return resolve(true);
          }
          return resolve(false);
        }
      } catch (error) {
        console.log("error >>>", error);
        return reject(false);
      }
    });
  },

  getNewbyId: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`SELECT * FROM news WHERE id = ?`, [
          id,
        ]);

        if (result.length > 0) {
          return resolve(result[0]);
        }
        return resolve(false);
      } catch (error) {
        console.log("error >>>", error);
        return reject(false);
      }
    });
  },

  getAllNews: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`SELECT * FROM news`);
        return resolve(result);
      } catch (error) {
        console.log("error >>>", error);
        return reject(false);
      }
    });
  },
  deleteNew: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`DELETE FROM news WHERE id = ?`, [
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

  getAllnews: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(`select * from news`);

        return resolve(result);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  },

  getNewsLimit: (limit_num) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [result] = await con.execute(
          `select * from news limit ${limit_num}`
        );

        return resolve(result);
      } catch (error) {
        console.log("error >>>", error);
        return reject(error);
      }
    });
  },
};