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
       const postcollection=client.db("shareme").collection("media")
       const commentcollection=client.db("shareme").collection("comments");
       const likesCollection=client.db("shareme").collection("likes");
    

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
    const result=await userColllections.findOne(query)
    res.send(result)

})

app.get("/user/about/:email",async(req, res) => {
    const email=req.params.email;
    const query={email:email}   
    const result=await userColllections.findOne(query)
    res.send(result)
})


///uptadeuserinfo



app.put("/userabout/:email",async(req,res)=>{
    const email=req.params.email;
    const about=req.body;
     const filter={email:email}
     const upsert={upsert:true}
     const updoc={
        $set:about
        
     }
     const result=await userColllections.updateOne(filter,updoc,upsert);
     res.send(result);



})

 

//media post

app.post("/post",async(req,res)=>{
    const post=req.body;
    const result=await postcollection.insertOne(post);
    res.send(result);

})


//get all post 
app.get("/allposts", async (req, res) => {
  const query = {};
  const result = await postcollection.find(query).toArray();
  res.send(result);
});

//get my post

app.get("/posts", async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  const result = await postcollection.find(query).toArray();
  res.send(result);
});

///get singel post
app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const post = await postcollection.findOne(query);
  res.send(post);
});








//like api


app.post("/likes", async(req,res)=>{
    const likes=req.body;
    const result=await likesCollection.insertOne(likes);
    res.send(result);

    
})


app.get("/likes", async(req,res)=>{

    const query={}
    const result=await likesCollection.find(query).toArray()
    res.send(result);
    console.log(result)


})

app.get("/likes/:id", async(req,res)=>{
    const id=req.params.id;
    const query={postid:id}
    const result=await likesCollection.find(query).toArray();
    res.send(result);
})




//post comment

app.post("/coment",async (req,res)=>{
const  coment=req.body;
    const result=await commentcollection.insertOne(coment);
    res.send(result);



})



//get all comments

app.get("/comments", async (req,res)=>{
const query={}
const result=await commentcollection.find(query).toArray();
res.send(result);
   
})
///post wise comments by post id
app.get("/comments/:id",async (req,res)=>{
    const  id=req.params.id;
    const query={postid:id};
    const result=await commentcollection.find(query).toArray();
    res.send(result);
    
})

    }
    finally{

    }

}


run().catch(error=>console.log(error))