import React from 'react'

export default function Input({name, value, handleChange, placeholder}) {
  return (
    <div>
      <input type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}
