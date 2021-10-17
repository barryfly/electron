/**
 * 通用SQL操作
 * insertTable(table, dataJson) 插入表, 参数1=>表名, 参数2=>数据
 * updateTable(table, dataJson, condition) 更新表, 参数1=>表名, 参数2=>数据, 参数3=>条件字段
 * deleteTable(table) 清空表, 参数1=>表名,
 * dropTable(table) 删除表, 参数1=>表名,
 * existTable(table) 表检查, 参数1=>表名,
 * emptyById(table, id) 通过id查找某表、某条记录是否存在 参数1=>表名, 参数2=>id
 * searchAll(table, order, sort) 查询所有记录
 * searchById(table, id) 通过id查询, 参数1=>表名, 参数2=>id
 * deleteById(table, id) 通过id删除, 参数1=>表名, 参数2=>id
 * 
 * @auth barry.jwis.cn
*/
import {app} from 'electron'
const sqlite3 = require("sqlite3").verbose();
const packageJson = require("../../../package.json");
let db = null;
const dbPath = `${app.getPath("appData")}\\${packageJson.name}\\sqlite3.db`
const connectDb = (path = dbPath)=> {
    return db = new sqlite3.Database(path);
};

connectDb();

const closeDb = ()=> {
    db.close();
};

const insertTable = (table, data) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(data)) reject('data must be array')
    db.serialize(() => {
      for (let item of data) {
        let keys = Object.keys(item).join(", ");
        let values = Object.values(item).join("', '");
        db.run(`INSERT INTO ${table} (${keys}) VALUES ('${values}')`, err => {
          if (err) reject(err);
          resolve()
        });
      }
    });
  })
};

const updateTable = (table, data, condition = 'id') => {
  return new Promise((resolve, reject) => {
    if (!(data instanceof Object) && data[condition] === undefined) reject(`data must be Object or sql ${condition} value is undefined`)
    let columns = ''; const separator = ', '; let values = {};
    for (let key in data) {
      if (condition !== key) {
        columns += `${key} = $${key}${separator}`
      }
      values[`$${key}`] = data[key];
    }
    // 去除末尾分割符
    columns = columns.substr(0, columns.length - separator.length)
    db.serialize(() => {
      db.run(`UPDATE ${table} SET ${columns} WHERE ${condition} = $${condition}`, values,
      err => {
        if (err) reject(err);
        resolve();
      });
    });
  })
};

const deleteTable = (table) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`DELETE FROM ${table}`, err => {
        if (err) reject(err);
        resolve();
      });
    });
  })
};

const dropTable = (table) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`DROP TABLE ${table}`, err => {
        if (err) reject(err);
        resolve();
      });
    });
  })
};

const existTable = (table) => {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${table}`, (err) => {
      if (err) resolve(false);
      resolve(true);
    });
  })
};

const emptyById = (table, id) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table} WHERE id = $id`, id, (err, rows) => {
      if (err) reject(err);
      resolve(rows.length === 0);
    });
  })
};

const searchAll = (table, order='id', sort='DESC') => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table} ORDER BY ${order} ${sort}`, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const searchById = (table, id) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table} WHERE id = $id`, id, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  })
};



const deleteById = (table, id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM ${table} WHERE id = $id`, id, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export {
    db,
    connectDb,
    closeDb,
    insertTable,
    updateTable,
    deleteTable,
    dropTable,
    existTable,
    emptyById,
    searchAll,
    searchById,
    deleteById
}