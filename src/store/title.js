// mobx
import {observable, action} from "mobx";

class Title {
  // 观察值
  @observable title = "";

  @action
  setTitle = (title) => {
    this.title = title;
  };
}

const title = new Title();

export default title;
