const mongoose = require('mongoose')
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = 'mongodb://monti:monti123@ac-9p0hsqa-shard-00-00.9uzfvb6.mongodb.net:27017,ac-9p0hsqa-shard-00-01.9uzfvb6.mongodb.net:27017,ac-9p0hsqa-shard-00-02.9uzfvb6.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-kp11ax-shard-0&authSource=admin&retryWrites=true&w=majority' // Customer change url to your db you created in atlas
// mongodb://<username>:<password>@merncluster-shard-00-00.d1d4z.mongodb.net:27017,merncluster-shard-00-01.d1d4z.mongodb.net:27017,merncluster-shard-00-02.d1d4z.mongodb.net:27017/?ssl=true&replicaSet=atlas-eusy5p-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = function (callback) {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, reslut) => {
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) console.log("---" + err)
        else {
            // var database =
            console.log("connected to mongo")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            // console.log(foodCollection);
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("foodCategory");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    // console.log(foodCollection);
                    callback(err, data, Catdata);

                })
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};
