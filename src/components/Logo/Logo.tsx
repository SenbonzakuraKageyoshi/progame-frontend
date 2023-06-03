import React from 'react'
import logo from '../../images/logo.svg';

const Logo = React.memo(() => {
  return (
    <img src={logo} alt="Progame лого" className="logo" width={170} height={50} />
  )
})

export default Logo