/*
 * Author: bjiang
 * Create Time: 2019/12/4 10:59
 */
const fs = require("fs");
const path = require("path");
const util = require("util");
const dist = path.join(__dirname, "../dist");
const lib = path.join(__dirname, "../src/lib");

const readDir = util.promisify(fs.readdir);

const copyFile = (from, to) => new Promise(resolve => {
  const fromStream = fs.createReadStream(from);
  const toStream = fs.createWriteStream(to);
  toStream.on("close", resolve);
  fromStream.pipe(toStream);
});

const copyDir = (from, to) => readDir(from).then(files => Promise.all(files.map(file => {
  // 如果文件是JS或TS文件，则忽略的问题。
  if (/\.[jt]sx?$/.test(file)) return Promise.resolve();
  const _from = path.join(from, file);
  const _to = path.join(to, file);
  return fs.statSync(_from).isDirectory() ? copyDir(_from, _to) : copyFile(_from, _to);
})));

copyDir(lib, dist);
