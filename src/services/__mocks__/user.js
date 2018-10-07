
const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Teuvo Testaaja'
}

const getUser = () => {
  return Promise.resolve(user)
}

export default { getUser, user }
