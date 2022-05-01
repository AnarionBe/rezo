import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.put('/:id', 'Users/UsersController.update').as('update_user')
  Route.delete('/:id', 'Users/UsersController.delete').as('delete_user')
  Route.post('/:id/link-wallet', 'Users/UsersController.linkWallet').as('link_wallet')
}).prefix('/api/v1/users').middleware('auth')
