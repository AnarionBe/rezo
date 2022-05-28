import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new LoginNoWalletException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class LoginNoWalletException extends Exception {
  handle(err, { response }) {
    return response.status(422).json([{
      code: err.message,
      field: 'wallet',
      message: 'Wallet is required',
    }])
  }
}
