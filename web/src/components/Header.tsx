import * as Dialog from '@radix-ui/react-dialog'
import { Plus, X } from 'phosphor-react'

import Logo from '../assets/logo.svg'
import { NewHabitForm } from './NewHabitForm'

export function Header() {


  return (
    //  Criação de um header com a logo e um botão
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={Logo} alt='Logo Habits' />

      <Dialog.Root>

        <Dialog.Trigger
          type='button'
          className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 transition-colors hover:border-violet-500 hover:bg-violet-500 group focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-bg'
        >
          <Plus size={20} className='text-violet-500 group-hover:text-white' />
          Novo Hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

          <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Dialog.Title className='text-3xl leading-right font-extrabold'>
              Criar Hábito
            </Dialog.Title>
            <Dialog.Close className='absolute top-6 right-6 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-violet-600 rounded-lg'>
              <X size={24} aria-label='Fechar' />
            </Dialog.Close>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}