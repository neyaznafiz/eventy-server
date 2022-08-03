const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { application } = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bbikj86.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect()

    await client.connect();
    const allServiceCollection = client
      .db("project-eventy-data-collection")
      .collection("all-service");
    const allReviewCollection = client
      .db("project-eventy-data-collection")
      .collection("all-review");
    const allEventListCollection = client
      .db("project-eventy-data-collection")
      .collection("allEvent-List");
    const allVenue = client
    .db("project-eventy-data-collection")
    .collection("allVenue-List");



    // get all service api
    app.get('/services-get', async (req, res) => {
      const getAllServices = await allServiceCollection.find({}).toArray()
      res.send(getAllServices)
    })

    // get service filter by id
    app.get('/single-service/:id', async (req, res) => {
      const getSingleServiceById = await allServiceCollection.findOne({ _id: ObjectId(req.params.id) })
      res.send(getSingleServiceById)
    })

    // review post api
    app.post('/post-review', async (req, res) => {
      const postReview = await allReviewCollection.insertOne(req.body)
      res.send(postReview)
    })

    // get event venues
    app.get('/venues', async (req,res) => {
      const venues = await allVenue.find().toArray();
      res.send(venues);
    })

  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Eventy server is running");
});

app.listen(port, () => {
  console.log("Listning to port", port);
});
