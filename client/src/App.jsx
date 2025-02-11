import { createContext } from 'react'
// import './App.css'
import LoginForm from './components/login'
import { Route, Routes } from 'react-router-dom'
import AllUsers from './components/AllUsers'
import ChatWindow from './components/ChatWindow'
import GroupChat from './components/groupMessage'

export const UserData = createContext()

function App() {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.data?._id; // Safely access userId


  return (
    <div>
      <UserData.Provider value = {{
        user,
        userId
      }}>

     <Routes>
      <Route path='/' element={<LoginForm/>}/>
      <Route path='/chat' element={<AllUsers/>}/>
      <Route path='/chat/:Id' element={<ChatWindow/>}/>
      <Route path='/groupchat/:groupId' element = {<GroupChat/>}/>
     </Routes>

     </UserData.Provider>
    </div>
  )
}

export default App
