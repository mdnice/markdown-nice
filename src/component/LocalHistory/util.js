import {message} from "antd";

function saveTimeSort(a, b) {
  return new Date(b.SaveTime).getTime() - new Date(a.SaveTime).getTime();
}

export const MaxLocalDocumentLength = 30;

// export const AutoSaveInterval = 10 * 60 * 1000;
export const AutoSaveInterval = 60 * 1000;

export const getLocalDocuments = (db, DocumentID) => {
  try {
    const transaction = db.transaction(["customers"], "readonly");
    const store = transaction.objectStore("customers");
    const keyRange = IDBKeyRange.only(DocumentID);
    const index = store.index("DocumentID");
    const req = index.openCursor(keyRange);

    return new Promise((resolve, reject) => {
      const result = [];
      req.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          // Do something with the matches.
          result.push(cursor.value);
          cursor.continue();
        } else {
          // console.log('获取成功 ');
          result.sort(saveTimeSort);
          resolve(result);
        }
      };
      req.onerror = (event) => {
        console.error("获取失败");
        reject(event);
      };
    });
  } catch (e) {
    console.log("未知错误", DocumentID);
    return Promise.reject(e);
  }
};

export const setLocalDocuments = (db, localDocuments, document = {}) => {
  const draftIndex = 0;
  if (localDocuments[draftIndex + 1] && localDocuments[draftIndex + 1].Content === localDocuments[draftIndex].Content) {
    console.log("内容未更新，不进行本地保存。");
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["customers"], "readwrite");
    const store = transaction.objectStore("customers");
    let req = {};

    // Info: 长度超过用 put，没超过用 add
    if (localDocuments.length >= MaxLocalDocumentLength) {
      const {id} = localDocuments.sort(saveTimeSort)[localDocuments.length - 1];
      req = store.put({
        ...document,
        id,
      });
    } else {
      req = store.add(document);
    }

    req.onsuccess = () => {
      console.log("自动保存成功");
      resolve();
    };
    req.onerror = (event) => {
      message.error("自动保存失败");
      reject(event);
    };
  });
};

export const setLocalDraft = (db, localDocuments, document = {}) => {
  const draft = localDocuments[0];
  if (draft && document.Content === draft.Content) {
    console.log("草稿未更新，不进行本地保存。");
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["customers"], "readwrite");
    const store = transaction.objectStore("customers");

    // Info: 更新草稿
    const {id} = draft;
    const req = store.put({
      ...document,
      id,
    });

    req.onsuccess = () => {
      console.log("自动保存草稿成功");
      resolve();
    };
    req.onerror = (event) => {
      message.error("自动保存草稿失败");
      reject(event);
    };
  });
};
