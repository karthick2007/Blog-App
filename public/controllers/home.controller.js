angular.module('app')
.controller('homeCtrl',function($http,$scope){


    refresh = function (){
        $http.get('/images')
            .then(function(response){
                //console.log(response.data.files);
               // $scope.files = response.data.files;

            })

    }
    refresh();
})