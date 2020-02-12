import React from 'react'

export default function Button({ handleSubmit }) {
  return (
    <div>
      <button
        type="submit"
        onClick={handleSubmit}
      >
        play
      </button>
    </div>
  )
}
