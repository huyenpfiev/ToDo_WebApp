var MongoClient=require('mongodb').MongoClient;
var uri="mongodb+srv://DinhHuyen:Huyendien13-08@cluster0-mlysy.mongodb.net/ToDoList?retryWrites=true";
var client=new MongoClient(uri,{useNewUrlParser:true});
var db;
ObjectID=require('mongodb').ObjectID;

// connexion a la db 
var dataLayer={
    init:function(cb){
        client.connect(function(err){
            if(err) throw err;
            db=client.db("ToDoList");
            cb();
        });
    },
    checkLogin:function(acc,cb){
        
        db.collection("Users").find({userName:acc.user,password:acc.pass}).toArray(function(err, result){

            if(result.length == 1){
                cb(true,result[0]._id);
            }
            else{
                cb(false,0);
            }
        });
            
    },
    checkSignUp:function(acc,cb){
        
        db.collection("Users").find({userName:acc.userName}).toArray(function(err, result){

            if(result.length == 1){
                cb(false,0);
            }
            else{
                db.collection("Users").insertOne(acc,function(err,result){
                    db.collection("Users").find({userName:acc.userName}).toArray(function(err, res){
                        cb(true,res[0]._id);
                    });
                });
            }
        });
            
    },
    getGroupLists:function(userID,cb){
        
        db.collection("Lists").find({creator_id:new ObjectID(userID)}).toArray(function(err,docs){
            cb(docs);
        });
    },
    insertProject:function(project,cb){
        db.collection("Lists").insertOne(project,function(err,result){
            cb();
        });
    },
    deleteProject:function(id,name,userID,cb){
        
        db.collection("Lists").deleteOne({_id: new ObjectID(id)},function(err,result){
            db.collection("Task").deleteMany({user_id: new ObjectID(userID),list_name:name},function(err,result){
                cb();
            });
            
        });
    },
    getTaskSet:function(userID,listName,cb){
        
        db.collection("Task").find({user_id:new ObjectID(userID),list_name:listName}).toArray(function(err,docs){
            cb(docs);
        });
    },
    insertTask:function(task,cb){
        db.collection("Task").insertOne(task,function(err,result){
            cb();
        });
    },
    deleteTask:function(id,cb){
        
        db.collection("Task").deleteOne({_id: new ObjectID(id)},function(err,result){
            //console.log(result,err)
            cb();
            
        });
    },

    updateTask:function(id,new_name,cb){     
        db.collection("Task").updateOne({_id : new ObjectID(id)},{$set:{name:new_name,date:new Date()}},function(err,result){
            cb();
        });

    },
    updateDone:function(id,done,cb){
        db.collection("Task").updateOne({_id : new ObjectID(id)},{$set:{done:done}},function(err,result){
            cb();
        });

    }
}
module.exports=dataLayer;