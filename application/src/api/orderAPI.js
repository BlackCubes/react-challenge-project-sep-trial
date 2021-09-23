import axios from "axios";
import { SERVER_IP } from "../private";

const axiosInit = axios.create({
  baseURL: `${SERVER_IP}/api/order`,
  responseType: "json",
});

export const getCurrentOrders = (headers) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        axiosInit
          .get("/current-orders", headers)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err.response.data));
      } catch (err) {
        reject("System error. Please try again later.");
      }
    }, 1000)
  );

export const createOrder = (order_item, quantity, ordered_by, headers) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        axiosInit
          .post(
            "/add-order",
            {
              order_item,
              quantity,
              ordered_by,
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

export const updateOrder = (id, order_item, quantity, ordered_by, headers) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        axiosInit
          .patch(
            `/edit-order/${id}`,
            {
              order_item,
              quantity,
              ordered_by,
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

export const removeOrder = (id, headers) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        axiosInit
          .delete(`/delete-order/${id}`, headers)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err.response.data));
      } catch (err) {
        reject("System error. Please try again later.");
      }
    })
  );

export const createLiveOrder = (time, headers) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        axiosInit
          .post(`/live-order`, { time }, headers)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err.response.data));
      } catch (erro) {
        reject("System error. Please try again later.");
      }
    })
  );
