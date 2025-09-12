export const getYears = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = 0; i <= 110; i++) {
    years.push(currentYear - i)
  }
  return years
}

export const hundredYears = getYears()
