interface HabitProps {
  completed: number
}

function Habit(props: HabitProps) {
  return (
    <div className='bg-red-800 font-mono h-12 w-12 flex text-white rounded m-2 text-center justify-center items-center'>
      {props.completed}
    </div>
  )
}

export default Habit;