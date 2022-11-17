import axios from "axios";
import store from "../store/store";
import { setPreloaderStatus, setSingleRoom, setTestPage } from "./roomActions";
import { toast } from "react-toastify";

const testPageUrl = "http://localhost:8000/api/test-page/";
const singleRoomUrl = "http://localhost:8000/api/test-page/";

// Turn preloader on or off
export const switchPreloader = (status) => {
  store.dispatch(setPreloaderStatus(status));
};

export const fetchTestPage = async () => {
  switchPreloader(true);
  await axios
    .get(testPageUrl)
    .then((response) => {
      console.log(response.data);
      store.dispatch(setTestPage(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      console.log(err);
      switchPreloader(false);
    });
};
// export const fetchSingleRoom=async()=>{
//     switchPreloader(true)
//     await axios .get()
// }
