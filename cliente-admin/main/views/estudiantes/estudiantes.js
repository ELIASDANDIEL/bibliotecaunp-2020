app
	.component('estudiantes',{
		templateUrl: './main/views/estudiantes/estudiantes.html',
		controller: function ($scope,$http) 
		{
			var scope = $scope
			var server = API_ROUTE;

			const Clean = () => 
			{
				scope.object = {
					id: null,
					nombres: null,
					apellidos: null,
					codigo: null,
					dni: null,
					facultad: null
				}
			}

			const Init = () => 
			{
				$http.get(server + 'estudiante')
					.then(res => {
						scope.estudiantes = res.data.estudiantes
					})
			}

			scope.save = () => 
			{

				if(scope.object.id)
				{
					$http.put(server + 'estudiante/update/' + scope.object.id, scope.object)
						.then(res => {
							PostTransaction(res)
						})
				}
				else
				{
					$http.post(server + 'estudiante/store', scope.object)
						.then(res => {
							PostTransaction(res)	
						})
				}
			}

			scope.delete = (id) => 
			{
				$http.delete(server + 'estudiante/delete/' + id)
					.then(res => {
						PostTransaction(res)
					})
			}

			scope.clean = () => {
				Clean()
			}

			scope.load = (estudiante) =>{
				scope.object = angular.copy(estudiante)
			}

			const PostTransaction = (res) => 
			{
				alert(res.data.message)
				if(res.data.success)
				{
					Init()
					Clean()
				}
			}

			Init()
			Clean()

		}
	})