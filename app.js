//jshint esversion:6
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true }); // port to access mongoDB server


const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true, "why not name?"]
  },
    rating: {
    type:Number,
    min:1,
    max:10
  },
  review:{
  type: String,
  required:true
  }
});


const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  rating: 23,
  review: "Peaches are yammy!"
});

// fruit.save();

//planes data


const planeSchema = new mongoose.Schema({
  name: String,
  hoursePower: Number,
  company: String
});

const Plane= mongoose.model("Plane",planeSchema);

const plane= new Plane({
  name: "IL 747",
  hoursePower: 1000,
  company: "Boeng"
});

const militaryPlane = new Plane({
  name: "B 8922-I",
  hoursePower: 900,
  company: "Aerobus"
});

// Plane.insertMany([plane,militaryPlane], function(err){
//   if (err){
//     console.log(err);
//   }else{
//     console.log("Successfully add planes to mongoDB");
//   }
// });




// another data calles Person

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});


const Person = mongoose.model("Person", personSchema);

const pinapple = new Fruit({
  name: "Pinnaple",
  score: 10,
  review: "Amazing fruit and tasty"
});

// pinapple.save();

// Fruit.deleteMany({name:"Pinnaple"}, function(err){
//   if(err){
//     console.log(err);
//   }else {
//   console.log("Successfully delted name pinapple");
// }
//  });

// const person = new Person ({
//   name: "Amy",
//   age: 12,
//   favouriteFruit:pinapple
// });

// person.save();

const watermellon = new Fruit({
  name: "Watermellon",
  score: 10,
  review: "You have to try it, it's sooo good!"
});
watermellon.save();

Person.updateOne({_id:"5c64991c74fbd00fec751d05"},{favouriteFruit:watermellon}, function(err){
  if(err){
    console.log(err);
  }else {
  console.log("Successfully updated Peter's favouriteFruit");
}
});

//delete person database

// Person.deleteMany({name:"Peter"}, function(err){
//   if(err){
//     console.log(err);
//   }else {
//   console.log("Successfully delted name Peter");
// }
// });

//
// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit"
// });
//
//  const banana = new Fruit({
//       name:"Banana",
//       score: 7,
//       review: "Too small, but great"
//  });
//
//  const cherry = new Fruit({
//       name: "Cherry",
//       score: 3,
//       review: "Got bad"
//  });

// Fruit.insertMany([kiwi, banana, cherry], function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Sucessfully saved all the fruits to Fruits DB !!!");
//   }
// });

Fruit.find(function(err, fruits){

  fruits.forEach(function(fruit){
    if(err){
      console.log(err);
    }else{
        mongoose.connection.close();
      console.log(fruit.name);
    }
  });

});


//delete data You can also use "deleteMany module"

// Fruit.deleteOne({_id:"5c6441eb99f3f93aac16c273"}, function(err){
//   if(err){
//     console.log(err);
//   }else {
//   console.log("Successfully delted doc");
// }
// });

// update data

// Fruit.updateOne({_id:"5c6441eb99f3f93aac16c273"},{name:"Peach"}, function(err){
//   if(err){
//     console.log(err);
//   }else {
//   console.log("Successfully delted doc");
// }
// });

// Plane.find(function(err,planes){
//
// planes.forEach(function(plane){
//   if(err){
//     console.log(err);
//   }else{
//     mongoose.connection.close();
//   console.log(plane.name);
// }
// });
//
// });






// person.save();   //-- this will save your info into database (even multiple times)



//******NATIVE driver for MongoDB ******//

// // Connection URL
// const url = 'mongodb://localhost:27017'; // base url for mongodb
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, { useNewUrlParser: true });
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);//test for errors
//     console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   findDocuments(db, function() {
//       client.close();
//     });
// });





//****INSERT DATA USING NATIVE DRIVER ***

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([
//     {
//       name:"Apple",
//       score:8,
//       review:"Verry tasty!"
//     },
//     {
//       name:"Banana",
//       score: 7,
//       review: "Too small, but great"
//     },
//     {
//       name: "Cherry",
//       score: 3,
//       review: "Got bad"
//     }
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// };

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
