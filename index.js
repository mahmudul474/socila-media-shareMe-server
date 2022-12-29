const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors=require('cors')
require('dotenv').config()




//middalewer
app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send("this is my server")
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@474.79d3jxt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run=async()=>{

    try{
        
       const userColllections=client.db("shareme").collection("users");
    

//post 
 app.post("/users",async(req,res)=>{
    const user=req.body;
    const result=await userColllections.insertOne(user);
    res.send(result);
 })


///load all user
app.get("/users",async (req,res)=>{
const query={}
const result=await userColllections.find(query).toArray();
res.send(result);
})



///singell user get

app.get("/users/:id", async (req, res)=>{
    const id=req.params.id;
    const query={_id:ObjectId(id)}
    const result=await userColllections.findOne(query);
    res.send(result);
})





///get on  abouts

app.get("/userabout",async (req, res)=>{
    const email=req.query.email;
    const query={email:email}
    const result=await userColllections.find(query).toArray();
    res.send(result)

})





    }
    finally{

    }

}


run().catch(error=>console.log(error))