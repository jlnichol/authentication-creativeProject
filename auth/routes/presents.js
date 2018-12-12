/*global angular*/
angular.module('present', [])
    .controller('PresCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.presents = [];
            $scope.addPresent = function() {
                var newpresent = { name: $scope.name, price: $scope.price, url: $scope.picture };
                $http.post('/presents', newpresent).success(function(data) {
                    $scope.presents.push(data);
                });
                $scope.name = '';
                $scope.price = '';
                $scope.picture = '';
            };
            
            $scope.delete = function(present) {
                $http.delete('/presents/' + present._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
            $scope.getAll = function() {
                return $http.get('/presents').success(function(data) {
                    angular.copy(data, $scope.presents);
                });
            };
            $scope.getAll();
        }
    ]);
