import axios from "axios";
import * as process from "process";
import { parseStringPromise } from "xml2js";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  responseType: "text",
});

instance.interceptors.request.use((config) => {
  const sessionToken = localStorage.getItem("sessionToken");
  const username = localStorage.getItem("username");

  if (sessionToken && username) {
    if (typeof config.data == "undefined") {
      config.data = {
        session_token: sessionToken,
        username: username,
      };
    } else if (config.data instanceof Object) {
      config.data["session_token"] = sessionToken;
      config.data["username"] = username;
    }
  }

  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const xmlString = response.data;
    console.log("Response Data", xmlString);

    parseStringPromise(xmlString, {
      normalize: true,
      explicitArray: false,
    }).then((value) => (response.data = value));

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default instance;
