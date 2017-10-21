function SimpleApp(service) {
this.service = service

this.echo = (nickname) => {
  var firsname = this.service(nickname)
  return `Hello ${firsname}!`
//  return 'Hello World!'
}
}

function BuuAuthen(authService) {
this.authService = authService

  this.signIn = (username,password) => {
    var obj = this.authService(username,password)
    return {
      name: obj.name,
      token: '0000000000'
    }
  }

}



test('Simple Mock', () => {
  const mockFn = jest.fn('mook')
    .mockReturnValue('Nattanich')

  var app = new SimpleApp(mockFn)
  var nickname = 'mook'
  var result = app.echo(nickname)

  expect(mockFn).toHaveBeenCalled()
  expect(mockFn).toHaveBeenCalledWith(nickname)
  expect(result).toBe('Hello Nattanich!')
})

test('Sign-in with Facebook', () => {

  const facebookAuthMock = jest.fn()
  .mockReturnValue({
    name: 'Nattanich Toopsamoot',
    facebookId: '123456',
    email: 'nattanic@gmail.com'
  })
  var auth = new BuuAuthen(facebookAuthMock)


  var username = 'Nattanich Toopsamoot'
  var password = '0123456789'
  var accountInfo = auth.signIn('username,password')

  expect(facebookAuthMock).toHaveBeenCalled()
  expect(facebookAuthMock).toHaveBeenCalledWith(username,password)
  expect(accountInfo).toBe('Nattanich')
  expect(accountInfo).toHaveProperty('token')
  expect(accountInfo.token).toHaveLength(10)
})
