const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// statically serve the public folder using path.join
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/file", (req, res) => {
  const dir = "public";
  const file = path.join(dir, "hello.txt");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.open(file, "w", function (err, file) {
    if (err) throw err;
    console.log("File is opened in write mode.");
  });

  fs.writeFile(file, new Date().toLocaleString(), function (err) {
    if (err) throw err;
  });

  res.send("File created!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
