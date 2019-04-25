
var ListeaFaire = angular.module('ListeaFaire', []);

var listName={
    _id:localStorage.getItem("listName")
}

ListeaFaire.controller("mainController", function($scope,$http) {
    $scope.formData = {};
    $scope.edit=false;
    $scope.hidden1=false;
    $scope.hidden2=true;
    
    // when landing on the page, get all todos and show them
    $http.post('/getTaskSet',listName)
        .success(function(data) {
            $scope.laliste = data;
            console.log($scope.laliste);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/addTask', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/deleteTask/'+id)
            .success(function(data) {
                $scope.formData = {};
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    //update a task
    $scope.updateTodo = function(task) {
        if(typeof task.new_name === 'undefined'){
            task.new_name=task.name;
        }
        $http.put('/updateTask', task)
            .success(function(data) {
                $scope.formData = {}; 
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    //update Done
    $scope.updateDone = function(task) {

        $http.put('/updateDone', task)
            .success(function(data) {
                $scope.formData = {}; 
                $scope.laliste = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    //logout
    $scope.logout=function(){
        window.location="index.html";
    };
    
    $scope.back=function(){
        window.location="groupLists.html";
    };

});
