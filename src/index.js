import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import App from './App'

Sentry.init({
  dsn: 'https://8fbb0aa55f254e26b50e2c376ba9909b@o4504411854929920.ingest.sentry.io/4504423532527616',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.25
})

window.Buffer = window.Buffer || require('buffer').Buffer

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
