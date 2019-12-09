/*
 * Author: bjiang
 * Create Time: 2019/12/4 11:02
 */
const fs = require("fs");
const path = require("path");
const util = require("util");
const dist = path.join(__dirname, "../dist");

const readDir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);
const unlink = util.promisify(fs.unlink);

const rm = (dir) => readDir(dir).then(files => Promise.all(files.map(file => {
  const _dir = path.join(dir, file);
  return fs.statSync(_dir).isDirectory() ? rm(_dir) : unlink(_dir);
})).then(() => rmdir(dir)));

rm(dist)
  .catch(err => {console.info(err.message);})
  .then(() => console.info("dist清理完毕"));
