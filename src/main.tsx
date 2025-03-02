import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoApp from './TodoApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoApp />
  </StrictMode>,
)
