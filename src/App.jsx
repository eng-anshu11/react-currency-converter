import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrency from './hook/useCurrency'

function App() {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState('')
  const [conversionError, setConversionError] = useState('')
  const { rates, error: currencyError, loading } = useCurrency(from)

  const options = Object.keys(rates).length
    ? Object.keys(rates).map((currency) => currency.toUpperCase())
    : [from, to]
  const rate = rates[to.toLowerCase()]

  const convert = () => {
    if (typeof rate !== 'number' || !Number.isFinite(rate)) {
      setConversionError(`No exchange rate is available for ${from} to ${to}.`)
      return
    }

    setConvertedAmount(amount * rate)
    setConversionError('')
  }

  const swap = () => {
    setFrom(to)
    setTo(from)

    if (convertedAmount !== '') {
      setAmount(Number(convertedAmount))
      setConvertedAmount(amount)
    }

    setConversionError('')
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/2223715503/photo/abstract-financial-data-visualization-with-digital-stock-market-graphs.jpg?s=2048x2048&w=is&k=20&c=0Q2FmzPnjgxNnUyyaOQ4PS9Ro9wQtQEWCWgJ1iu1ECU=')",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                CurrencyOptions={options}
                onAmountChange={(value) => {
                  setAmount(value)
                  setConvertedAmount('')
                  setConversionError('')
                }}
                onCurrencyChange={(currency) => {
                  setFrom(currency)
                  setConvertedAmount('')
                  setConversionError('')
                }}
                SelectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                CurrencyOptions={options}
                onCurrencyChange={(currency) => {
                  setTo(currency)
                  setConvertedAmount('')
                  setConversionError('')
                }}
                SelectCurrency={to}
                AmountDisabled
              />
            </div>
            {currencyError && (
              <p role="alert" className="mb-3 text-red-700">
                {currencyError}
              </p>
            )}
            {conversionError && (
              <p role="alert" className="mb-3 text-red-700">
                {conversionError}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || typeof rate !== 'number'}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Loading rates...'
                : `Convert ${from} to ${to}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
