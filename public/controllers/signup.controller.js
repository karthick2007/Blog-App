angular.module('app')
    .controller("RegisterCtrl",function($scope,$http,$window){

       $scope.userPresent = false;
        $scope.emailPresent= false;
        $scope.validPassword=false;
        $scope.enterPassword = false;

        var Data,i,j;
        var userData=[];
        var emailData=[];

        refresh = function(){
            $http.get('/registerData')
                .then(function(response){
                    Data = response.data;
                    console.log(response);
                    for(i in Data){
                        userData[i]= Data[i].username;
                    }
                    for(j in Data){
                        emailData[i]= Data[i].email;
                    }
                    //$scope.Username1 = Data;
                });
            $scope.User ={};
        };

        refresh();

       /* $scope.addUser =function(){
            console.log($scope.User);
            $http.post('/registerData',$scope.User)
                .then(function(response) {
                    console.log(response);
                    alert('Registration completed');
                    $window.location.reload();
                },function(data) {
                    console.log(data);
                });
            //refresh();
        };*/

        $scope.userValidate = function(text) {
            //userData = Data.data.values;
            //console.log(text);
            if(userData.length== 0) {
                $scope.userPresent=false;
            }
            else{
                for(i=0;i<userData.length;i++){
                    if(userData[i]== text){
                        $scope.userPresent=true;
                        break;
                    }else{
                        $scope.userPresent=false;
                    }
                }//console.log($scope.userPresent);
            }};
        $scope.emailValidate = function(text) {
            //userData = Data.data.values;
            //console.log(text);
            if(emailData.length== 0) {
                $scope.emailPresent=false;
            }
            else{
                for(i=0;i<emailData.length;i++){
                    if(emailData[i]== text){
                        $scope.emailPresent=true;
                        break;
                    }else{
                        $scope.emailPresent=false;
                    }
                }//console.log($scope.emailPresent);
            }};

        $scope.validatePassword = function(Password1,Password2) {
            if(Password1== undefined){
                $scope.enterPassword = true;
            }else{
                if(Password1 == Password2){
                    $scope.validPassword = false;
                }
                else{
                    $scope.validPassword = true;
                }

            }}

    });