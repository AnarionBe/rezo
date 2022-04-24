import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.put('/:id', 'Users/UsersController.update').as('update_user')
  Route.delete('/:id', 'Users/UsersController.delete').as('delete_user')
}).prefix('/api/v1/users').middleware('auth')
