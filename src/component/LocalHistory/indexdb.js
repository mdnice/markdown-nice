import {message} from "antd";

// In the following line, you should include the prefixes of implementations you want to test.
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
// const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
// const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

export default class IndexDB {
  constructor(options = {}) {
    this.options = options;
  }

  async init() {
    if (!indexedDB) {
      message.error("初始化 indexdb 失败！浏览器不支持");
      throw Error("浏览器不支持 indexdb");
    }

    const {name, storeName = "", storeOptions = {}, storeInit = () => {}} = this.options;

    this.storeName = storeName;
    this.storeOptions = storeOptions;
    this.storeInit = storeInit;

    const request = indexedDB.open(name);
    const result = await this.initEvent(request);
    return result;
  }

  initEvent(request) {
    return new Promise((resolve, reject) => {
      request.onerror = (event) => {
        // Do something with request.errorCode!
        message.error("初始化数据库失败！", event.target.errorCode);
        reject(new Error("初始化数据库失败！"));
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        console.log("成功初始化数据库");
        // this.db = db;
        resolve(db);
      };

      // 该事件仅在较新的浏览器中被实现
      request.onupgradeneeded = (event) => {
        // 更新对象存储空间和索引 ....
        const db = event.target.result;
        this.initStore(db, this.storeName, this.storeOptions, this.storeInit);
      };
    });
  }

  initStore(db, name, options, func) {
    // 创建一个对象存储空间来持有信息。
    const objectStore = db.createObjectStore(name, options);
    if (func) func(objectStore);
  }
}
