import Header from './Header'
import Footer from './Footer'

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    <div className="ui divider"></div>
    {props.children}
    <div className="ui divider"></div>
    <Footer />
  </div>
)


export default Layout
