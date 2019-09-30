import {observable, action} from "mobx";
import {IMAGE_HOSTING_TYPE, ALIOSS_IMAGE_HOSTING, QINIUOSS_IMAGE_HOSTING} from "../utils/constant";

class ImageHosting {
  @observable type = "SM.MS";

  @action
  setType = (type) => {
    this.type = type;
  };
}

const store = new ImageHosting();

// 如果为空先把数据放进去
if (!window.localStorage.getItem(IMAGE_HOSTING_TYPE)) {
  window.localStorage.setItem(IMAGE_HOSTING_TYPE, "SM.MS");
}

// 如果为空先把数据放进去
if (!window.localStorage.getItem(ALIOSS_IMAGE_HOSTING)) {
  const alioss = JSON.stringify({
    region: "",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
  });
  window.localStorage.setItem(ALIOSS_IMAGE_HOSTING, alioss);
}

// 如果为空先把数据放进去
if (!window.localStorage.getItem(QINIUOSS_IMAGE_HOSTING)) {
  const qiniuoss = JSON.stringify({
    region: "",
    accessKey: "",
    secretKey: "",
    bucket: "",
    domain: "http://",
    namespace: "",
  });
  window.localStorage.setItem(QINIUOSS_IMAGE_HOSTING, qiniuoss);
}

/* 用于平滑升级，因为之前缺少两个字段，将来删除 */
const temQiniu = JSON.parse(window.localStorage.getItem(QINIUOSS_IMAGE_HOSTING));
if (temQiniu.domain === undefined) {
  const qiniuoss = JSON.stringify({
    region: "",
    accessKey: "",
    secretKey: "",
    bucket: "",
    domain: "http://",
    namespace: "",
  });
  window.localStorage.setItem(QINIUOSS_IMAGE_HOSTING, qiniuoss);
}
/* 用于平滑升级，因为之前缺少两个字段，将来删除 */

store.type = window.localStorage.getItem(IMAGE_HOSTING_TYPE);

export default store;
