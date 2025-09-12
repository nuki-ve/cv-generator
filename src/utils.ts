/**
 * Returns an array of years, from the current year to 110 years ago
 * @description Created to fill the options of the 'year' selects (CVForm)
 * @returns {number[]} Years array
 * @example
 * getYears() => [2025, 2024, ..., 1915]
 */
export const getYears = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = 0; i <= 110; i++) {
    years.push(currentYear - i)
  }
  return years
}

/**
 * Stores the array of years to avoid redo the loop every time
 * 
 * @example
 * // Instead of: 
 * {getYears().map(...)} // Heavy loop
 * // do: 
 * {hundredYears.map(...)} // Less heavy
 */
export const hundredYears = getYears()
