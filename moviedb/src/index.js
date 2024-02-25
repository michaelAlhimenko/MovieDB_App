import React from 'react'
import ReactDOM from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'
import Alert from 'antd/es/alert/Alert.js'

import '../node_modules/antd/dist/antd.js'
import './index.css'
import App from './components/App/App.js'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.Fragment>
    <Online>
      <App />
    </Online>
    <Offline>
      <div className="offline">
        <Alert type="error" message={'There is no internet connection'} />
      </div>
    </Offline>
  </React.Fragment>
)

reportWebVitals()
