const mongo = require("mongodb").MongoClient;
const dbURL = process.env.MONGO_DBURL;


function highestShortURL(){
        return mongo.connect(dbURL).then((db)=>{
            return db.collection('urls').find({}).sort({'shortURL': -1}).limit(1).next();
        });
    }

module.exports = {
    addURL: function(urlData){
     return mongo.connect(dbURL).then((db)=>{
         return db.collection('urls').insert(urlData);
     });   
    },
    
    findShortURL: function(url){
        return mongo.connect(dbURL).then((db)=>{
            return db.collection('urls').findOne({shortURL: parseInt(url)}, {_id: 0, url: 1});
        });   
    },
    
    findURL: function(url){
        return mongo.connect(dbURL).then((db)=>{
            return db.collection('urls').findOne({url: url}, {_id: 0});
        });
    },
    
    generateShortURL: function(){
       return highestShortURL().then((highest)=>{
           var increment = parseInt(highest.shortURL) + 1;
           return increment;    
       }); 
    }
};

