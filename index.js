const express = require('express');
const cors =require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const requestCollection = db.collection('request')



// get data

    app.get ('/partners' , async (req ,res) => {
      const result = await partnerCollection.find().toArray()
      res.send(result)
    })




  app.get('/request/:id', async (req, res) => {
  const { id } = req.params;
  const objectId = new ObjectId(id);

  const result = await requestCollection.findOne({ _id: objectId });

  res.send({
    success: true,
    result
  });
});


  // profile data

  app.get('/partners/:id' , async (req ,res) => {
    const {id} = req.params;
    const objectId = new ObjectId(id)
    const result = await partnerCollection.findOne({_id: objectId})
    console.log(id)
    res.send({
      success : true,
      result
    })
  })

  //request-data get kora hoiche email diye query kore

  app.get('/request' , async (req,res) => {
    const email = req.query.email;
    const result = await requestCollection.find({request_by: email }).toArray();
    res.send(result);
  })


  // search get

  app.get('/search' ,async (req , res) => {
    const search = req.query.search;
    console.log(search);
    const result = await partnerCollection.find({subject: {$regex: search , $options: 'i'}}).toArray()
    res.send(result);
  })


//----------------------------------------------------------------------
//----------------------------------------------------------------------

// delete data

// app.delete('/partners/:id' ,async (req , res) => {
//   const {id} = req.params ;
//   const objectId = new ObjectId(id);
//   const filter = {_id: objectId};
//   const result= await partnerCollection.deleteOne(filter)

//   res.send(result);
// })

// query method


app.delete('/delete-partners' , async(req,res) => {
  const {id} = req.query;
  const objectId = new ObjectId(id);
  const filter = {_id: objectId};
  const result = await requestCollection.deleteOne(filter)

  res.send(result);
})



  // update data

  app.put('/request/:id' , async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const objectId = new ObjectId(id);
    const filter = {_id:objectId}
    const update = {
      $set: data
    }

    const result =await requestCollection.updateOne(filter,update) //requestCollection dile oi khane update hobe
    res.send(result);
  })


    // insert data 

    app.post('/partners' , async (req,res) => {
        const data = req.body;
        console.log(data);
        const result = await partnerCollection.insertOne(data)
        res.send({
          success: true,
          result
        });
    })

//  count ++

    app.post('/request/:id' , async (req,res) => {
      const id = req.params.id;
      const data = req.body;
      const result = await requestCollection.insertOne(data);

      const filter = {_id: new ObjectId(id)}
      const update = {
        $inc : {
          partnerCount: 1
        }
      }

      const UpdatePartnerCount = await partnerCollection.updateOne(filter,update);
      res.send(result , UpdatePartnerCount);
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