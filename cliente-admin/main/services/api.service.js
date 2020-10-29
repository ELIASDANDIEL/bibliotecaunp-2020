app
.service("sApi",function($http)
{
    this.upload = (route,form_data) => 
    {
        return $http.post( API_ROUTE + route, form_data, 
            {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
    }
});