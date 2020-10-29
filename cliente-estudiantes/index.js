var app = angular.module('app',[]);

app.controller('consultaCtrl',function($scope,$http)
{
    $scope.libros = [];

    const API = '../servidor/public/';
    const STORAGE = "../servidor/storage/app/";

    $scope.consultar = () => 
    {
        $scope.spinner = true;

        let data = {
            'codigo': $scope.codigo_universitario,
            'clave': $scope.clave
        }

        $http
        .post(API + 'consultar/libro', data)
        .then(res => {
            if(res.data.success)
            {
                $scope.libros = res.data.libros;

            }else
            {
                alert(res.data.message);
            }
        })
        .finally(fin => $scope.spinner = false);
    }

    $scope.preview = (libro) => 
    {
        $scope.show_pdf = false;
        setTimeout(function(){
            $('#modal-pdf').modal('show');
            $scope.pdf_file = STORAGE + libro.url_file;
            $scope.show_pdf = true;
            $scope.$apply();
        },500);
    };
    
});