
var signUp = angular.module("signUp", []);
signUp.controller("signUpController", function($scope,$http) {

    console.log($scope.formData);
    $scope.checkSignUp = function() {
        $http.post('/checkSignUp', $scope.formData)
            .success(function(data) {
                if(data.success){
                    $scope.error="Successful!";
                    localStorage.setItem("userID",data.id);
                    window.location="groupLists.html";
                }
                else{
                    $scope.error="This username already existed!";
                }
                

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
});
