import React from 'react'
import { shallow, mount } from 'enzyme'
import ConnectedApp, { App } from '../App'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const mockStore = configureStore([thunk])
import { Provider } from 'react-redux'
import { login } from '../reducers/loginReducer'
import Blog from '../components/Blog'
import LoginForm from '../components/LoginForm'
import toJson from 'enzyme-to-json'

let wrapper

describe.skip('+++ Shallow Render REACT COMPONENTS', () => {
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('no blogs is rendered', () => {
    //app.update()
    const blogComponents = wrapper.find(Blog)
    expect(blogComponents.length).toBe(0)
  })

})

//*************************************************************
describe.skip('>>>APP --- (Shallow + passing the {store} directly)', () => {
  const initialState = { user: null }
  const mockStore = configureStore()
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<ConnectedApp store={store} /> )
  })

  it('+++ check Prop matches with initialState', () => {
    expect(wrapper.prop('user')).toEqual(initialState.user)
  })

  it('+++ render the connected component', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('+++ renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})

//***************************************************************************
describe.skip('>>>APP --- (Mount + wrapping in <Provider>)', () => {
  const initialState = { user: null }
  const mockStore = configureStore()
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = mount( <Provider store={store}><ConnectedApp /></Provider> )
  })

  it('+++ render the connected component', () => {
    expect(wrapper.find(ConnectedApp).length).toEqual(1)
  })

  it('+++ check Prop matches with initialState', () => {
    expect(wrapper.find(App).prop('user')).toEqual(initialState.user)
  })

  it('+++ check LoginForm is rendered', () => {
    const loginFormComponent = wrapper.find(App).find(LoginForm)
    console.log('LOGINFORM ---- ', loginFormComponent)
    expect(loginFormComponent.length).toBe(1)
  })

  it('+++ renders LoginForm correctly', () => {
    expect(toJson(wrapper, {
      noKey: false,
      mode: 'deep'
    })).toMatchSnapshot()
  })

})

//**************************************************************************
describe.skip('>>> APP ---- login action with wrong credentials', () => {
  it('handles login', async () => {
    const store = mockStore()
    //console.log('MOCKSTORE 2 ---- ', store)
    await store.dispatch(login('tollo', 'password'))
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'NEW_MSG',
      content: 'wrong username or password',
      style: 'error'
    })
  })
})

/*
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

export const mockStore = configureMockStore([thunk])
*/
