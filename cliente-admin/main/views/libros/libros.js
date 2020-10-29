app
	.component('libros',{
		templateUrl: './main/views/libros/libros.html',
		controller: function ($scope,$http,sApi,sForm) 
		{
			var scope = $scope
			var server = API_ROUTE;

			const Clean = () => 
			{
				scope.object = {}
			};

			const Init = () => 
			{
				$http.get(server + 'libro')
					.then(res => {
						scope.libros = res.data.libros
					})
			}

			scope.save = () => 
			{
				if(scope.object.file && scope.object.file.type != 'application/pdf') 
					return alert("El archivo debe ser un pdf");

				let form_data = sForm.formData(scope.object);

				sApi
				.upload('libro/upload',form_data)
				.then(res => PostTransaction(res));
			}

			scope.delete = (id) => 
			{
				$http.delete(server + 'libro/delete/' + id)
					.then(res => {
						PostTransaction(res)
					})
			}

			scope.clean = () => {
				Clean()
			};

			scope.load = (libro) => {
				scope.object = angular.copy(libro)
			}

			const PostTransaction = (res) => 
			{
				alert(res.data.message)

				if(res.data.success)
				{
					Init()
					Clean()
					let _file = document.getElementById('file');
						_file.value = null;
				}
			}

			scope.viewPdf = (libro) => 
			{
				scope.show_pdf = false;
				setTimeout(function(){
					$('#modal-pdf').modal('show');
					scope.pdf_file = STORAGE + libro.url_file;
					console.log('pdf',scope.pdf_file);
					scope.show_pdf = true;
					scope.$apply();
				},500);
			};

			Init()
			Clean()

		}
	})