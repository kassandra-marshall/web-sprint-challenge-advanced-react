// Write your tests here
import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'

import AppClass from './AppClass'
import AppFunctional from "./AppFunctional"

test('Render AppClass without errors', () => {
  render(<AppClass/>)
})

test('Render AppFunctional withouot errors', () => {
  render(<AppFunctional/>)
})

test('Can press a directional button', () => {
  render(<AppClass/>)
  const up = document.querySelector('#up')
  fireEvent.click(up)

})

test('Can type an email', () => {
  render(<AppClass/>)
  const email = document.querySelector('#email')
  fireEvent.change(email, {target: {value: 'asdf@asdf.com'}})
  expect(email).toHaveValue('asdf@asdf.com')
})

test('Can submit form', () => {
  render(<AppClass/>)
  const up = document.querySelector('#up')
  const email = document.querySelector('#email')
  const submit = document.querySelector('#submit')
  fireEvent.click(up)
  fireEvent.change(email, {target: {value: 'asdf@asdf.com'}})
  fireEvent.click(submit)
})