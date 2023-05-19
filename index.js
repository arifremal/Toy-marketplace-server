const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server Running");
});
app.listen(port, () => {
  console.log(`server running on post:${port}`);
});


const uri = `mongodb+srv://${process.env.AR_USER}:${process.env.AR_PASS}@aremal.jgqn0oc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const toyCollection = client.db('toyMart').collection('toys')
    app.get('/toys',async(req,res)=>{
        const collect = toyCollection.find()
        const result = await collect.toArray()
        res.send(result)
    })
    // api create for single Toys
    app.get('/toys/:id',async(req,res)=>{
        const id =req.params.id;
        const query = {_id: new ObjectId(id) }

        const options = {
            projection:{price:1,picture_url:1,name:1,seller_email:1,seller_name:1,available_quantity:1,detail_description:1,rating:1}
        }

        const result = await toyCollection.findOne(query,options)
        res.send(result)
        
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!!"
    );
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);
