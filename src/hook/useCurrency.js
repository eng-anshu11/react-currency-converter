import { useEffect, useState } from 'react'

function useCurrency(currency) {
  const currencyCode = currency.toLowerCase()
  const [state, setState] = useState(() => ({
    currency: currencyCode,
    rates: {},
    error: '',
    loading: true,
  }))

  useEffect(() => {
    const controller = new AbortController()
    const requestedCurrency = currency.toLowerCase()

    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${requestedCurrency}.json`,
      { signal: controller.signal },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        return response.json()
      })
      .then((result) => {
        const currencyRates = result[requestedCurrency]

        if (!currencyRates) {
          throw new Error(`No rates were returned for ${requestedCurrency.toUpperCase()}`)
        }

        setState({
          currency: requestedCurrency,
          rates: currencyRates,
          error: '',
          loading: false,
        })
      })
      .catch((fetchError) => {
        if (fetchError.name === 'AbortError') {
          return
        }

        setState({
          currency: requestedCurrency,
          rates: {},
          error: `Unable to load currency rates: ${fetchError.message}`,
          loading: false,
        })
      })

    return () => controller.abort()
  }, [currency])

  if (state.currency !== currencyCode) {
    return { rates: {}, error: '', loading: true }
  }

  return state
}

export default useCurrency
