// express 
const express = require('express');
const app = express();
// multer 
const multer= require("multer");
const request = require('request');
// imgur 
// const imgur = require("imgur");
const fs = require('fs-extra');
const fileUpload = require("express-fileupload");
//path 
// const mongoose = require("mongoose");
const path =  require("path")
// cors must insatll 
const cors = require('cors')
app.use(cors());
// post body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('uploads'))
app.use(fileUpload());
//app.use(fileUpload())
// app.set('view engine', 'ejs')
// app.set('views', 'views')
//connect mongoose 
// mongoose.connect(
//   "mongodb+srv://smartvalley:O4gDLJ9Ndm1K1DqZ@cluster0.zi9ao.mongodb.net/Smart-valley?retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true }
//   ).then(()=> console.log("mongoose in running"))
//   .catch((err)=> console.log(err, "omething is prblm"));


// const ImageModel= require("./image.model");




// mongodb
const MongoClient = require('mongodb').MongoClient;
const ObjectId= require('mongodb').ObjectId;
const uri = "mongodb+srv://smartvalley:O4gDLJ9Ndm1K1DqZ@cluster0.zi9ao.mongodb.net/Smart-valley?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// O4gDLJ9Ndm1K1DqZ
//SifatRiders
//===================================mongo db



//upload folder 
// const Upload_Folder = "./uploads/";



// const storage=multer.diskStorage({
//   destination: (req, file , cb) => {
//     cb (null, Upload_Folder)
//   },
//   filename: (req, file , cb) => {
//    const fileExt = path.extname(file.originalname);
//    const fileName = file.originalname
//    .replace(fileExt, "")
//    .toLowerCase()
//    .split(" ")
//    .join("-")+"-"+Date.now();
//    cb(null, fileName+fileExt);
//   },
// });

// // const upload = multer({
// //    storage: Storage

// // })

// var upload = multer({
//   storage:storage,

//    fileFilter: (req,file,cb ) => {
   
//    if (
//     file.mimetype ==="image/png"||
//      file.mimetype ==="image/jpg"||
//      file.mimetype ==="image/jpeg"
//     ){
//       cb(null , true);

//     }else{
//       cb(new Error("only jpg and png allowed"))
//     }
//    }

// });


client.connect(err => {
    const products = client.db("Smart-valley").collection("product");
    console.log("dbconnect")
    // app.post("/", upload.single("avatar") , (req,res) =>{
    // //   const file = req.file.path;
    // //   const info = req.body;
    // //  console.log(file)
    // //  console.log(info)
    // //   // const filePathImage= `${__dirname}/uploads/${file}`;
    // // //  console.log(filePathImage)
    // //     const Image= fs.readFileSync(file);
    // //     console.log(Image)
    // //     const encImage= Image.toString('base64');

    // //     var imagePattern ={
    // //         contentType:req.file.mimetype,
    // //         size:req.file.size,
    // //         img:Buffer(encImage,'base64')
    // //     }

       
    // // const name= req.body.name;
    // // const price= req.body.price;
    // // const user = {name,price,}
    // // console.log(user)
    // // products.insertOne(imagePattern)
    // // .then(result =>{
    // //     res.send(result)
    // // })
        
    //    })
    // perform actions on the collection object
    app.post('/addProducts',(req,res) =>{
        const image = req.body.img;
        const name= req.body.name;
        const price= req.body.price;
        console.log(name,price,image)
  
      //  const filePathImage= `${__dirname}/uploads/${image.name}`;
    //  console.log(filePathImage)
    // image.mv(filePathImage)
    // const ImageRead= fs.readFileSync(filePathImage);
    
    // const encImage= ImageRead.toString('base64');
  
    // const imagePattern ={
    //     contentType:req.files.file.mimetype,
    //     size:req.files.file.size,
    //     img: Buffer.from('base64', encImage)
    // }
      

        const user = {name,price,image}
       // console.log(user)
          products.insertOne({name,price,image})
          .then(result =>{
         
              res.send(result)
          })
       
  });
  app.get('/products', (req, res) => {
    products.find({})
    .toArray((err , documents)=>{
      res.send(documents)
    })
  
   })
   //update
  app.get('/products/:id' ,(req ,res) =>{
    products.find({_id: ObjectId(req.params.id)})
    .toArray((err , documents) =>{
     // console.log(documents)
      res.send(documents[0]);
    })
  
    })
    app.put('/update/:id' ,(req ,res) =>{
      console.log(req.params.id)
      console.log(req.body)
      products.updateOne({_id: ObjectId(req.params.id)},
        {

          $set :{name: req.body.name, price: req.body.price , image:req.body.img}
        })
        .then(result => {
          console.log(result)
        })
      })
    

  app.delete('/delete/:id' ,(req ,res) =>{
    products.deleteOne({_id: ObjectId(req.params.id)})
    .then(result =>{
      res.send(result.deletedCount > 0)
    })

  })



 // image upload 
  

// app.get('/', (req, res) => {
// 	res.render('index.ejs')
// })
// app.post("/addProduct",(req,res) =>{

//   let sampleFile =req.files.avatar;
//   let uploadPath =__dirname+ "/uploader/" +sampleFile.name
//   console.log(sampleFile)

//   sampleFile.mv(uploadPath, function(err){
//     if(err){
//       return res.status(500).send(err)
//     }
    
    
  
//   })

// })

app.get('/allProduct',(req,res) =>{
  console.log(req.body)
 products.find({})
  .toArray((error,documents) =>{
    res.send(documents);
  })


 })
  const orders = client.db("Smart-valley").collection("orders");
  app.post('/shopProduct',(req,res) =>{
    const newFilterProduct= req.body;
    console.log(newFilterProduct);
    orders.insertOne(newFilterProduct)
    .then(result =>{
      console.log(newFilterProduct);  
      res.send(result);
    })
  

    
});

app.get('/allCartProduct',(req,res) =>{
  //console.log(req.query.email)
  console.log(req.body)
  orders.find({})
   .toArray((error,documents) =>{
     res.send(documents);
   })
 })

 app.delete('/deleteCardProduct/:id' ,(req ,res) =>{
  console.log(req.params.id)
  orders.deleteOne({_id: ObjectId(req.params.id)})
  .then(result =>{
    res.send(result.deletedCount > 0)
  })

})
 const placeOrder = client.db("Smart-valley").collection("PlaceOrder");
 app.post('/addPlaceOrder',(req,res) =>{
  const newPlaceOrderInfo= req.body;
  console.log(newPlaceOrderInfo);
  placeOrder.insertOne(newPlaceOrderInfo)
  .then(result =>{
    console.log(newPlaceOrderInfo);  
    res.send(result);
  })
});
app.get('/placeOrderCartInfo',(req,res) =>{
  console.log(req.query.email)
  placeOrder.find({})
   .toArray((error,documents) =>{
     res.send(documents);
   })
 })
 app.delete('/deleteOrderProduct/:id' ,(req ,res) =>{
  console.log(req.params.id)
  placeOrder.deleteOne({_id: ObjectId(req.params.id)})
  .then(result =>{
    res.send(result)
  })

})
})

app.listen(4000, () => console.log('listening to port 5000'));