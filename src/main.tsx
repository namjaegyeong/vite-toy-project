import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RecruitmentListComponent from './RecruitmentListComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecruitmentListComponent />
  </StrictMode>,
)
