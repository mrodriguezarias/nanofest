import React from "react"

const Header = () => {
  return (
    <header>
      <h1 onClick={() => window.location.reload(true)}>
        <span className="red">Na</span>
        <span className="orange">no</span>
        <span className="yellow">Fe</span>
        <span className="green">st</span>
        <span className="spacer"></span>
        <span className="blue">20</span>
        <span className="purple">20</span>
      </h1>
    </header>
  )
}

export { Header }
export default Header
