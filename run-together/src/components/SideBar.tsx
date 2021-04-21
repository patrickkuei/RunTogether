import React from 'react'
import ChatroomList from './ChatroomList'
import Header from './Header'
import SearchBar from './SearchBar'

export default function SideBar() {
  return (
    <div>
      SideBar
      <Header />
      <SearchBar />
      <ChatroomList />
    </div>
  )
}
