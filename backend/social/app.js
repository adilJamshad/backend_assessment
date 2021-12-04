const express = require("express");
// const { initConsumer } = require('./utilities/consumer');
const { initProducer } = require("./utilities/producer");
// const { connectConsumer } = require('./utilities/consumer');
// const { connectProducer, connectAdmin } = require('./utilities/producer');
// const KeyMaster = require('./utilities/KeyMaster');
const databaseConfig = require("./database/DatabaseConfig");
const router = require("./router");

const app = express();
databaseConfig.initializeDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(databaseConfig.initializeDB());
app.use("/api", router);

app.use("/", async (req, res) => {
  res
    .status(200)
    .json({ message: `App is running on port. ${process.env.PORT || 4000}` });
});

app.listen(process.env.PORT || 4000, async () => {
  console.log("App started at port", process.env.PORT || 4000);
  await initProducer();
});
