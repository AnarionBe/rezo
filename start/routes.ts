/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

import './routes/users'
import './routes/posts'

Route.group(() => {
  Route.get('/ping', () => {}).as('ping').middleware('auth')
  Route.post('/login', 'Users/AuthController.login').as('login')
  Route.post('/register', 'Users/AuthController.register').as('register')
  Route.post('/logout', 'Users/AuthController.logout').as('logout')
}).prefix('/api/v1')

Route.on('*').render('index')
