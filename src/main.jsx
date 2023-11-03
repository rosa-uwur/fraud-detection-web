import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './HeaderPag'
import ContentPag from './ContentPag'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='main'>
      <Header />
      <ContentPag />
    </div>
  </React.StrictMode>,
)
