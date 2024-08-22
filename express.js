const express = require("express");
const fs = require("fs");
const cors = require("cors");
const e = require("express");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);
  console.log("Data", data);
  res.status(200).json({ users: obData.employees });
});

app.post("/users", (req, res) => {
  console.log("Body", req.body);

  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const newUser = {
    eid: `${employees.length + 1}`,
    ...req.body,
  };
  employees.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify({ employees }));
  res.status(201).json({ user: newUser });
});

app.put("/users/:userId", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const findIndex = users.findIndex(
    (employees) => employees.id === employees.params.userId
  );
  if (findIndex > -1) {
    employees[findIndex].name = req.body.name;
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: users[findIndex] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.delete("/users/:eid", (req, res) => {
  const findIndex = employees.findIndex(
    (employees) => employees.eid === employees.params.eid
  );
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  if (findIndex > -1) {
    const deletedUser = employees.splice(findIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ employees }));
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "Not found user id" });
  }
});

app.listen(8000, () => {
  console.log("Server is running at Localhost:8000 ");
});
