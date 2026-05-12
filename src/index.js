import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { store } from './app/store'
import { attach401Interceptor } from './axios-setup'

attach401Interceptor()
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
