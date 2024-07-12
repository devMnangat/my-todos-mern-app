import React from 'react'

export default function Button({className= "", children, ...others}) {
  return (
    
      <button className={`bg-blue-600 text-white rounded-lg py-3 px-6 ml-2 cursor-pointer ${className} `} {...others}>{children}</button>

  )
}
