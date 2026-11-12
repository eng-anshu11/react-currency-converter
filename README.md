# Currency Converter

A lightweight currency converter built with React and Vite. Choose a source and target currency to convert an amount using the latest rates available from the currency API.

## Features

- Convert between currencies provided by the exchange-rate API.
- Change either currency and swap the source and target.
- Load rates for the selected source currency.
- Show loading and request-error states.

## Built with

- React
- Vite
- Tailwind CSS
- [Currency API](https://github.com/fawazahmed0/exchange-api)

## Getting started

### Requirements

- Node.js (LTS recommended)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the project with Oxlint |

## Exchange-rate data

Rates are requested from the Currency API for the selected source currency. An internet connection is required. If the request fails, the app displays an error in the interface.
