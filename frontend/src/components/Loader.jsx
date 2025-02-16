import React from 'react'

const Loader = () => {
  return (
    <div
      role='status'
      className="w-2 h-2 border-8 border-[#bae51a] border-solid border-t-transparent rounded-full animate-spin mx-auto"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    ></div>
  )
}

export default Loader
