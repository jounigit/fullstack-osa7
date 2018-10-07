import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import ConnectedBlog from '../components/Blog'

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

//*************************************************************
describe('>>>BLOGI --- (Shallow + passing the {store} directly)', () => {
  const initialState = blog
  const mockStore = configureStore()
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<ConnectedBlog store={store} /> )
  })

  it('+++ render the connected component', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('+++ check Prop matches with initialState', () => {
    //console.log('MOCKSTORE 2 ---- ', initialState)
    expect(wrapper.prop('blog')).toEqual(initialState.blog)
  })
})
