import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name) => {
  const { data } = await $host.post("api/users/registration", {
    email,
    password,
    name,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/users/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/users/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const deleteUsers = async (ids) => {
  try {
    const response = await $authHost.post("api/users/delete", { ids });

    return response;
  } catch (err) {
    const { response } = err;

    return response;
  }
};

export const changeStatus = async (ids, status) => {
  try {
    const response = await $authHost.patch("api/users/changeStatus", {
      ids,
      status,
    });

    return response;
  } catch (err) {
    const { response } = err;

    return response;
  }
};
