import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
    <div className="container">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar10">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbar10">
        <ul className="navbar-nav nav-fill w-100">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="articles">Les articles</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="login">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)
}

export default Navbar
