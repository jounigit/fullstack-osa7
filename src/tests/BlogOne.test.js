import React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ConnectedBlog, { Blog } from '../components/Blog'
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json'

const blog = {
  id: '5b1fb4575b22f939e7b46efa',
  user: {
    _id: '5b1f90d6afbb051c1c7a7eeb',
    username: 'herrax',
    name: 'Herra X'
  },
  likes: 2,
  title: 'Mehiläisiä blogi',
  author: 'M Bee',
  url: 'bee.com'
}

const initialState = { blog,
  username: 'testUser'
}

//*************************************************************
describe('>>>BLOGI --- (Shallow + passing the {store} directly)', () => {

  const mockStore = configureStore()
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<ConnectedBlog store={store} /> )
  })

  it('+++ render the connected component', () => {
    console.log('MOCKSTORE 2 ---- ', initialState)
    expect(wrapper.length).toEqual(1)
  })

  it('+++ Blog renders correctly', () => {
    const tree = renderer
      .create(<ConnectedBlog store={store} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

//*************************************************************
describe('>>>BLOGI --- (Mount + passing the {store} directly)', () => {

  const mockStore = configureStore()
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = mount( <Provider store={store}><ConnectedBlog /></Provider> )
  })

  it('+++ render the connected component', () => {
    expect(wrapper.find(ConnectedBlog).length).toEqual(1)
  })


  it('+++ renders Blog correctly', () => {
    expect(toJson(wrapper, {
      noKey: false,
      mode: 'deep'
    })).toMatchSnapshot()
  })

  it('+++ Blog renders correctly', () => {
    const tree = renderer
      .create(<ConnectedBlog store={store} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
