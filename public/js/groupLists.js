
var groupLists = angular.module('groupLists', []);
var userID={
    _id:localStorage.getItem("userID")
}
groupLists.controller("groupController", function($scope,$http) {
    $scope.formData = {};
    console.log($scope.formData);
    
    // when landing on the page, get all projects and show them
    $http.post('/getGroupLists',userID)
        .success(function(data) {
            $scope.groups= data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createProject = function() {
        $http.post('/addProject', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; 
                $scope.groups = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a project 
    $scope.deleteProject = function(id,name) {
     
        $http.delete('/deleteProject/'+id+'/'+name)
            .success(function(data) {
                $scope.formData = {};
                $scope.groups = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    //open a project
    $scope.openProject=function(name){
        localStorage.setItem("listName",name);
        window.location="toDoList.html";
    };
    

});
