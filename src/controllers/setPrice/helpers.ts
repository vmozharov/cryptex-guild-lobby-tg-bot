export function formatPriceText(text: string, price: number) {
  return text.replace('%price%', price.toString())
}
