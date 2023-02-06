import { Check } from "phosphor-react";

export function NewHabitForm() {
  return (
    //  Formulário de criação de novo hábito
    <form className = "w-full flex flex-col mt-6" >
      <label
        htmlFor="title"
        className="font-semibold leading-tight"
      >
        Qual o seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Estudar 2 horas por dia"
        className="p-4 rounded-lg mt-3 bg-zinc-700 text-white placeholder:text-zinc-400"
        autoFocus
      />

      <label
        htmlFor=""
        className="font-semibold leading-tight mt-4"
      >
        Qual a recorrência
      </label>
      
      <button
        type="submit"
        className="mt-6 rounded-lg gap-3 p-4 flex items-center font-semibold justify-center bg-green-600 hover:bg-green-500"
      >
        <Check
          size={20}
          weight="bold"
        />
        Confirmar
      </button>
    </form >
  )
}