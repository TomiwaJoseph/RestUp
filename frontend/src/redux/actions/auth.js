import store from "../store/store";
import { setUserInfo } from "./roomActions";

let token = localStorage.getItem("restupToken");

function fetchUser(getUserUrl, cb) {
  fetch(getUserUrl, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.ok) {
        cb(true);
        let userInfo = result;
        delete userInfo.ok;
        store.dispatch(setUserInfo(userInfo));
      } else {
        cb(false);
      }
    });
}

export default fetchUser;
