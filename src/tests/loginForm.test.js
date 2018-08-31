import React from 'react'
import { LoginForm } from '../components/LoginForm'
import renderer from 'react-test-renderer'

it('+++ LOGINFORM renders correctly', () => {
  const tree = renderer
    .create(<LoginForm username='tollo' password='passi' />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

/*
inputA = wrapper.findAll('input').at(0)
inputA.setValue('123456')
*/
