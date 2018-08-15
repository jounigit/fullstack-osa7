const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

// User tests
describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'herrax',
      name: 'Herra X',
      password: 'salainen',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length+1)
    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique' })

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('POST /api/users fails with too short username', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'ly',
      name: 'Liian Lyhyt',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be at least 3 characters' })

    const usersAfter = await helper.usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('POST /api/login succeeds with proper credits', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: 'herrax',
        password: 'salainen',
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    //console.log('UUSSERRI:: ', response.body.token )
    expect(response.body.username).toContain('herrax')
  })

  afterAll(() => {
    server.close()
  })

})
