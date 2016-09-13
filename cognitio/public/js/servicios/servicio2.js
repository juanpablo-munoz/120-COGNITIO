angular.module('mainApp').factory('num2', ['$http', function($http) {

    return {
        get : function() {
			return $http.get('/api/num2');
        },


        //llamada a post
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },

        //llamada delete
        delete : function(id) {
            return $http.delete('/api/nerds/' + id);
        }
    }       

}]);
