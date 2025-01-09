import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EstateDetailComponent from './EstateDetailComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EstateDetailComponent />
  </StrictMode>,
)
