import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'Posts/PostsController.create').as('create_post')
}).prefix('/api/v1/posts').middleware('auth')
