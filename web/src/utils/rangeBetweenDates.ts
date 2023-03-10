import dayjs from 'dayjs'

//  Função para gerar um array de datas entre o primeiro dia do ano e o dia atual
export function generateRange() {
  const firstDay = dayjs().startOf('year')
  const today = new Date()

  const dates = []
  let compareDate = firstDay

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dates
}