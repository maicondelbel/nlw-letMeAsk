import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/AdminRoom/index'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/rooms/new" element={<NewRoom />}></Route>
      <Route path="/rooms/:id" element={<Room />}></Route>
      <Route path="/admin/rooms/:id" element={<AdminRoom />}></Route>
    </Routes>
  )
}
