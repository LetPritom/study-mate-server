const express = require('express');
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())


app.get('/' , (req , res) => {
    res.send('mongol a')
})

// study-mate
// R1VTHb2NCpC4d1u9




const uri = "mongodb+srv://study-mate:R1VTHb2NCpC4d1u9@cluster0.ouqgsfd.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const db = client.db('study-db');
    const partnerCollection = db.collection('partner')


    app.get ('/partners' , (req ,res) => {


      res.send('models')
    })

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`mathay pressure amr bhai${port}`);
})