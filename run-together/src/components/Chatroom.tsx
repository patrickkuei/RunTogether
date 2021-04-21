import React from 'react'
import Header from './Header'
import InputForm from './InputForm'
import MessageList from './MessageList'

export default function Chatroom() {
  return (
    <div>
      Chat Screen
      <Header />
      <MessageList />
      <InputForm />
    </div>
  )
}
