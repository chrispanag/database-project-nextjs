import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <div className="ui three item menu">
        <Link  href="/">
          <a className="item" style={linkStyle}>Home</a>
        </Link>
        <Link  href="/about">
          <a className="item" style={linkStyle}>About</a>
        </Link>
    </div>
    <h1 className="ui center aligned header">NACars</h1>
    </div>
)

export default Header
