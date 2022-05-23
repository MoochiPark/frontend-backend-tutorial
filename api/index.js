import axios from "axios";
import FormData from "form-data";

export const instance = axios.create({
  baseURL: "http://localhost:8080",
});

async function signup(account) {
  const formData = new FormData();
  formData.append("name", account.name);
  formData.append("email", account.email);
  formData.append("password", account.password);
  formData.append("profileImage", account.profileImage);
  return await instance.post("/auth/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function signin(email, password) {
  return await instance.post("/auth/signin", { email, password });
}

async function getAccountById(id) {
  return await instance.get(`/accounts/${id}`);
}

export { signup, signin, getAccountById };
