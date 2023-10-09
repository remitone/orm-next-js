"use client";

import { encrypt } from "../utils/encryption";
import axios from "../utils/remitterws-api-client";
import AuthenticationError from "../error/AuthenticationError";

const getSeed = async (username: string) => {
  const response = await axios.post("/auth/getSeed", {
    username: username,
  });

  const seedResponse = response.data.response as SeedResponse;

  const status = seedResponse.status;
  if (status === "FAIL") {
    console.log(`Failed response from getSeed(): ${seedResponse.message}`);
    throw new AuthenticationError();
  }

  if (status === "SUCCESS") {
    return seedResponse.result?.seed;
  }
};

const login = async (loginData: LoginData) => {
  const seed = await getSeed(loginData.username);
  const secureData = {
    seed: seed,
    password: loginData.password,
  };
  const encryptedData = await encrypt(secureData);
  const response = await axios.post("/auth/login", {
    username: loginData.username,
    encrypted_data: encryptedData,
  });

  const loginResponse: LoginResponse = response.data.response as LoginResponse;
  const status = loginResponse.status;
  if (status === "FAIL") {
    console.log(`Failed login: ${loginResponse.message}`);
    throw new AuthenticationError();
  }

  if (status === "SUCCESS") {
    localStorage.setItem("sessionToken", loginResponse.result?.session_token!);
    localStorage.setItem("username", loginData.username);
    return true;
  }

  return false;
};

const logout = async () => {
  const response = await axios.post("/auth/logout");
  const logoutResponse = (await response.data.response) as LogoutResponse;

  const status = logoutResponse.status;
  if (status === "FAIL") {
    throw new AuthenticationError(`Error on logout: ${logoutResponse.message}`);
  }

  return Promise.resolve(true);
};

export { getSeed, login, logout };
