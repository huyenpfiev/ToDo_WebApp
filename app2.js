var dataLayer=require('./dataLayer.js');//dataLayer
//server web
var express=require('express');
var app=express();
var bodyParser =  require('body-parser');// lors de l'utilisation  de app on peut recuperer des saisie faite cote client 
//init parser
app.use(bodyParser.json());//to support Json encoded bodies
app.use(bodyParser.urlencoded({extended:true})); //to support URL encoded bodies

//
var userID;
var listName;
ObjectID=require('mongodb').ObjectID;

//start the application after the database connection is ready
dataLayer.init(function(){
    app.listen(3000);
    console.log("Listening on port 3000");
});


app.use(express.static(__dirname + '/public')); 
app.get('/', function(req, res) {
    res.sendFile('./public/index.html'); 
});

//login
app.post('/checkLogin',function(req,res){
    var acc={
        user:req.body.user,
        pass:req.body.pass
    }
    dataLayer.checkLogin(acc,function(found,id){
        res.send({ success: found, id: id });
    });
});
//sign up
app.post('/checkSignUp',function(req,res){
    var acc={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.user,
        password:req.body.pass
    }
    dataLayer.checkSignUp(acc,function(found,id){
        res.send({ success: found, id: id });
    });
});
//send all projects
app.post("/getGroupLists",function(req,res){
    userID=req.body._id;
    dataLayer.getGroupLists(userID,function(dtSet){
        res.send(dtSet);
    });
});
//insert project
app.post('/addProject',function(req,res){
    if(req.body && typeof req.body.name !='undefined'){
        //console.log(req.body);
        var project={
            name_list:req.body.name,
            creator_id:new ObjectID(userID),
            date:new Date()
        };      
        dataLayer.insertProject(project,function(){
            dataLayer.getGroupLists(userID,function(dtSet){
                res.send(dtSet);
            });                    
        });
    }
    else{
        res.send({
            success:false,
            errorCode:"PARAM_MISSING"
            
        });
    }
});
//delete a project
app.delete("/deleteProject/:id/:name",function(req,res){
    var id=req.params.id;
    var name=req.params.name;
    dataLayer.deleteProject(id,name,userID,function(){
        dataLayer.getGroupLists(userID,function(dtSet){
            res.send(dtSet);
        });  
    });
});
//send all tasks
app.post("/getTaskSet",function(req,res){
    listName=req.body._id;
    dataLayer.getTaskSet(userID,listName,function(dtSet){
        res.send(dtSet);
    });
});
//insert task
app.post('/addTask',function(req,res){
    if(req.body && typeof req.body.name !='undefined'){
        var task={
            user_id:new ObjectID(userID),
            name:req.body.name,
            done:false,
            date:new Date(),
            list_name:listName
        };      
        dataLayer.insertTask(task,function(){
            dataLayer.getTaskSet(userID,listName,function(dtSet){
                res.send(dtSet);
            });                    
        });
    }
    else{
        res.send({
            success:false,
            errorCode:"PARAM_MISSING"
            
        });
    }
});

//delete a task
app.delete("/deleteTask/:id",function(req,res){
    var id=req.params.id;
    dataLayer.deleteTask(id,function(){
        dataLayer.getTaskSet(userID,listName,function(dtSet){
            res.send(dtSet);
        });  
    });
});
//update task
app.put("/updateTask",function(req,res){
    var id=req.body._id;
    var new_name=req.body.new_name;
    if(new_name != ""){
        dataLayer.updateTask(id,new_name,function(){
            dataLayer.getTaskSet(userID,listName,function(dtSet){
                res.send(dtSet);
            }); 
        });
    }
    else{
        res.send({
            success:false,
            errorCode:"PARAM_MISSING"    
        });
    }
    
});
//update Done
app.put("/updateDone",function(req,res){
    var id=req.body._id;
    var done=req.body.done;

    dataLayer.updateDone(id,done,function(){
        dataLayer.getTaskSet(userID,listName,function(dtSet){
            res.send(dtSet);
        }); 
    });
});
