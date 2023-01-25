const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://thesohan:thesohan@cluster0.jft2kca.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const userCollection = client.db("select").collection("option");

app.get("/myItem", async (req, res) => {
  const query = {};
  const cursor = userCollection.find(query);
  const user = await cursor.toArray();
  res.send(user);
});
app.post("/selectadd", async (req, res) => {
  const user = req.body;
  const result = await userCollection.insertOne(user);
  console.log(user);
  res.send(result);
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const selectData = req.body.selectData;
  const name = req.body.name;
  const query = { _id: ObjectId(id) };
  const option = {
    upsert: true,
  };
  const newData = {
    $set: {
      selectData,
      name,
    },
  };
  const result = userCollection.updateOne(query, newData, option);
  res.send(result);
});

app.listen(port);
