import moment from 'moment'

export function formatCurrency (number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
}

export function formatDate (date, options) {
  return moment(date).format(options)
}

export function daysRemaining(finish) {
  const today = moment()
  const finishDate = moment(finish)
  return finishDate.diff(today, 'days')
}
