const API_ROUTE = "../servidor/public/";
const STORAGE = "../servidor/storage/app/";

var app = angular.module('app',['ngRoute']);

app
.config(function ($routeProvider,$locationProvider) 
{
    $routeProvider
        .when('/',{template: '<estudiantes></estudiantes>'})
        .when('/libros', { template: '<libros></libros>'})
        .when('/estudiantes', {template: '<estudiantes></estudiantes>'});
        
    $locationProvider.hashPrefix('');
});

app
.service('form', function ($filter) 
{
    this.now = function () {
        return $filter('date')(new Date(), 'yyyy-MM-dd', 'America/Lima')
    }
    this.validate = function (dataForm) {

        let new_form_data = {};

        angular.forEach(dataForm, function (value, key) {

            if (angular.isDate(value)) {

                if (key.indexOf("hora") >= 0) {
                    new_form_data[key] = $filter('date')(value, 'HH:mm', 'America/Lima');
                    return;
                } else {
                    new_form_data[key] = $filter('date')(value, 'yyyy-MM-dd', 'America/Lima');
                    return;
                }
            }
            if (angular.isUndefined(value)) {
                new_form_data[key] = "";
                return;
            }

            new_form_data[key] = value;
        });
        return new_form_data;
    };
    this.parse = function (valor) {
        angular.forEach(valor, function (value, key) {
            if (
                key.indexOf("fecha") >= 0
                || key.indexOf("hora") >= 0
            ) {
                if (navigator.userAgent.search("Chrome") >= 0) {
                    if (key.indexOf("hora") >= 0) {
                        var tiempo = new Date($filter('date')('1970-01-01 ' + value, 'HH:mm', 'America/Lima'));
                        valor[key] = tiempo;
                    } else {
                        var fecha = new Date($filter('date')(value, 'yyyy/MM/dd', 'America/Lima'));
                        valor[key] = fecha;
                    }
                } else {
                    valor[key] = $filter('date')(value, 'yyyy/MM/dd', 'America/Lima');
                }
            }
        });
    };
});