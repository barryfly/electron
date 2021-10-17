const version = "1.0.0";
import { db, existTable, searchAll} from './index'

const createTable = {
  "version": `CREATE TABLE IF NOT EXISTS "version" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "version" TEXT );`,

  "download": `CREATE TABLE IF NOT EXISTS "download" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "fileName" TEXT, "savePath" TEXT, "url" TEXT, "totalBytes" TEXT, "receivedBytes" TEXT, "startTime" TEXT, "paused" TEXT, "state" TEXT );`,
};

const updateTable = {
}

const initSql = () => {
    let sqls = Object.values(createTable).join("");
    db.exec(sqls, err => {
      if (err) {
        return err
      }
    })

    // 记录版本
    db.run(`INSERT INTO version (version) VALUES ('${version}')`, err => {
      if (err) return err;
    });
};

const compareVersion = ()=> {
    searchAll('version').then(rows => {
        if (rows.length === 0 || version === rows[0].version) return

        let versions = Object.keys(updateTable);
        if (versions.length === 0) return
        let sqls = "";

        for (let v of versions) {
          sqls += updateTable[v].join("");
          sqls += `INSERT INTO version (version) VALUES ('${v}');`;
        }

        db.exec(sqls, err => {
          if (err) {
            return err
          }
        })
    })
}

const upgradeDb = () => {
  if (db === null) return
  // 查询有无版本记录
  existTable('version').then(result => {
      if (result) {
          compareVersion();
      } else {
        initSql()
      }
  })
}

export {
  upgradeDb,
  createTable,
  updateTable,
}
