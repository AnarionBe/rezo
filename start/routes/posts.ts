import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'Posts/PostsController.create').as('create_post')
  Route.post('/:id/comment', 'Posts/PostsController.create').as('create_comment')
  Route.get('/', 'Posts/PostsController.get').as('get_posts')
  Route.get('/:id', 'Posts/PostsController.view').as('view_post')
  Route.delete('/:id', 'Posts/PostsController.delete').as('delete_post')
}).prefix('/api/v1/posts').middleware('auth')
