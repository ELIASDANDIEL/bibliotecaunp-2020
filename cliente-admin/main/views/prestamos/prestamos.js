app
	.component('prestamos',{
		templateUrl: './main/views/prestamos/prestamos.html',
		controller: function ($scope,$http,form) 
		{
			var scope = $scope
			var server = '../public/'

			scope.view = 1

			scope.openModal = (libro) => 
			{
				scope.object = {
					libro: libro.titulo,
					libro_id: libro.id,
					fecha_prestamo: new Date(),
					fecha_devolucion: null,
					estudiante_id: null
				}

				Modal(true)
			}

			const Modal = (flag) => {
				let action = flag ? 'show' : 'hide'
				$('#modal').modal(action)
			}

			const Init = () => 
			{
				ListarEstudiantes()
				ListarPrestamos()
			}

			const ListarEstudiantes = () =>
			{
				$http.get(server + 'estudiante')
					.then(res => {
						scope.estudiantes = res.data.estudiantes
					})
			}

			const ListarPrestamos = () => 
			{
				$http.get(server + 'prestamo')
					.then(res => {
						scope.disponibles = res.data.disponibles
						scope.prestados = res.data.prestados
					})
			}

			scope.show = (index) => {
				scope.view = index
			}

			scope.save = () => 
			{
				let json = form.validate(scope.object)

				$http.post(server + 'prestamo/store', json)
					.then(res => {
						PostTransaction(res)	
					})
			}

			scope.devolver = (id) => 
			{
				$http.delete(server + 'prestamo/devolver/' + id,{})
					.then(res => {
						PostTransaction(res,false)
					})
			}

			const PostTransaction = (res,action_modal = true) => 
			{
				if(res.data.success)
				{
					alert(res.data.message)
					ListarPrestamos()

					if(action_modal)
						Modal(false)
				}
			}

			Init()

		}
	})