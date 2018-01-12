import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <div className="ui seven item menu">
        <Link  href="/">
          <a className="item" style={linkStyle}>Home</a>
        </Link>
        <Link  href="/employees">
          <a className="item" style={linkStyle}>Employees</a>
        </Link>
        <Link  href="/vehicles">
          <a className="item" style={linkStyle}>Vehicles</a>
        </Link>
        <Link  href="/departments">
          <a className="item" style={linkStyle}>Departments</a>
        </Link>
        <Link  href="/leases">
          <a className="item" style={linkStyle}>Leases</a>
        </Link>
        <Link  href="/reservations">
          <a className="item" style={linkStyle}>Reservations</a>
        </Link>
        <Link  href="/customers">
          <a className="item" style={linkStyle}>Customers</a>
        </Link>
    </div>
    </div>
)

export default Header
