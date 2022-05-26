import axios from "axios";
import FormData from "form-data";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

async function signup(account) {
  const formData = new FormData();
  formData.append("name", account.name);
  formData.append("email", account.email);
  formData.append("password", account.password);
  formData.append("profileImage", account.profileImage);
  const response = await instance.post("/auth/signup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

async function signin(email, password) {
  const response = await instance.post("/auth/signin", { email, password });
  return response.data;
}

async function getAccountById(id) {
  const response = await instance.get(`/accounts/${id}`);
  return response.data;
}

export { signup, signin, getAccountById };
