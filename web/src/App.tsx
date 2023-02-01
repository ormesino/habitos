import './styles/global.css'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'

// import Habit from "./components/Habit"

export function App() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header />
        <Dashboard />
      </div>
    </div>
  )
}