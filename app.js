import express from "express";
import formData from "express-form-data";
import os from "os";
import path from "path";

const app = express();
const port = 3000;
const __dirname = path.resolve();

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(formData.parse(options));
app.use(formData.stream());
app.use(formData.union());

import { signup, signin, getAccountById } from "./api/index.js";

app.get("/auth/signin", (req, res) => {
  res.sendFile(__dirname + "/public/signin.html");
});

app.get("/auth/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

app.post("/auth/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  await signin(email, password)
    .then((result) => {
      res.redirect(`/accounts/${result.accountId}/profile`);
    })
    .catch(() =>
      res.write(
        "<script>alert('Check your email or password.'); window.location.href = '/auth/signin';</script>"
      )
    );
});

app.post("/auth/signup", async (req, res) => {
  const account = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profileImage: req.body.profileImage,
  };
  await signup(account).then(() => res.redirect("/auth/signin"));
});

app.get("/accounts/:id/profile", async (req, res) => {
  const account = await getAccountById(req.params.id);
  res.set({ "content-type": "text/html; charset=utf-8" });
  res.write("<h1>Profile</h1>");
  res.write(`<p>Name: ${account.name}</p>`);
  res.write(`<p>Email: ${account.email}</p>`);
  res.write(
    `<p>Image:</p> <img src="http://localhost:8080/${account.profileImageName}"></img>`
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
