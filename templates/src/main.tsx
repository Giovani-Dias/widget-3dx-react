import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { widgetStart, require3Dx, disableDefaultCSS } from 'widget-3dx-react'

widgetStart(() => {
  disableDefaultCSS();
  require3Dx(["DS/i3DXCompassServices/i3DXCompassServices"]).then(([i3DXCompassServices]) => {
    i3DXCompassServices.getServiceUrl({
      platformId: 'OnPremise',
      serviceName: '3DSpace',
      onComplete: (url) => {
        console.log('3DSpace URL:', url);
      }
    })
  })

  widget.addEvent("onLoad", () => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })

})
