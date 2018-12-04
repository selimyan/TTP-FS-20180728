export const stringifyTickers = (portfolio) => {
  let tickers = []
  for (let i = 0; i < portfolio.length; i++) {
    tickers.push(portfolio[i].ticker)
  }
  return tickers.join(',').toLowerCase()
}

export const getCurrentValue = (portfolio) => {
  let total = 0
  for (let i = 0; i < portfolio.length; i++) {
    let stock = portfolio[i]
    total += stock.value
  }
  return total
}

export const createPortfolio = (stocks, data) => {
  let portfolio = []
  for (let i = 0; i < stocks.length; i++) {
    let currentStock = stocks[i]
    let item = {
      ticker: currentStock.ticker,
      quantity: currentStock.quantity,
      price: data[currentStock.ticker].quote.latestPrice,
      value: data[currentStock.ticker].quote.latestPrice * currentStock.quantity
    }
    portfolio.push(item)
  }
  return portfolio
}