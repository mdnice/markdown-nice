// mobx
import { observable, action } from "mobx";

class UserInfo {
  // 观察值
  @observable userInfo = {};
  @observable userRepo = [];

  @action
  updateUserInfo = (userInfo) => {
    this.userInfo = userInfo;
  }
  @action
  updateUserRepo = (userRepoList) =>{
    this.userRepo = userRepoList;
  }
}

const userInfo = new UserInfo();

export default userInfo;