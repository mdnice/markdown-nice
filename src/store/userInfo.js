// mobx
import {observable, action} from "mobx";

class UserInfo {
  // 观察值
  @observable userInfo = {};

  @observable userRepo = [];

  @action
  setUserInfo = (userInfo) => {
    this.userInfo = userInfo;
  };

  @action
  setUserRepo = (userRepoList) => {
    this.userRepo = userRepoList;
  };
}

const userInfo = new UserInfo();

export default userInfo;
