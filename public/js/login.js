
var login = angular.module("login", []);
login.controller("loginController", function($scope,$http) {
    console.log($scope.formData);
    $scope.checkLogin = function() {
        $http.post('/checkLogin', $scope.formData)
            .success(function(data) {
                if(data.success){
                    $scope.error="Successful!";
                    localStorage.setItem("userID",data.id);
                    window.location="groupLists.html";
                }
                else{
                    $scope.error="Invalid!";
                }
                

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
});
