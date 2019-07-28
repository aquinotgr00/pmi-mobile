// import moment from 'moment'

export function formatCurrency (number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number)
}

export function formatDate (date, options) {
  return moment(date).format(options)
}

export function daysRemaining(finish) {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  const today = new Date()
  const finishDate = new Date(finish).getTime()

  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(today - finishDate);

  // Convert back to days and return
  return Math.round(difference_ms/ONE_DAY);
}
