import axios from "axios";
import { SERVER_IP } from "../private";

const axiosInit = axios.create({
  baseURL: `${SERVER_IP}/api/auth`,
  responseType: "json",
});

export const createUser = (email, password, password_confirmation, headers) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        axiosInit
          .post(
            "/signup",
            {
              email,
              password,
              password_confirmation,
            },
            headers
          )
          .then((res) => resolve(res.data))
          .catch((err) => reject(err.response.data));
      } catch (err) {
        reject("System error. Please try again later.");
      }
    }, 1000)
  );

export const createLoginUser = (email, password, headers) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        axiosInit
          .post("/login", { email, password }, headers)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err.response.data));
      } catch (err) {
        reject("System error. Please try again later.");
      }
    }, 1000)
  );
