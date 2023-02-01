import logo from '../assets/logo.svg'
import { Plus } from 'phosphor-react'

export function Header() {
  return (
    //  Criação de um header com a logo e um botão
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logo} alt='Logo Habits' />
      <button
        type='button'
        className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300'
      >
        <Plus size={24} className='text-violet-500' />
        Novo Hábito
      </button>
    </div>
  )
}