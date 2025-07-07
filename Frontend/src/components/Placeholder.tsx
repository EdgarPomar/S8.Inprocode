// src/components/Placeholder.tsx
import React from 'react'

interface PlaceholderProps {
  onContinue: () => void
}

const Placeholder: React.FC<PlaceholderProps> = ({ onContinue }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <button
        className="btn btn-primary btn-lg"
        onClick={onContinue}
        style={{ minWidth: '200px' }}
      >
        Continuar
      </button>
    </div>
  )
}

export default Placeholder
