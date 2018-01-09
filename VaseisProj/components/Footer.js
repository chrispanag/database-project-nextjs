import Link from 'next/link'
import Stars from './stars'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
    <div className="ui center aligned vertical footer bottom segment row">
        <p >Created by Christos P., Nikoletta K. and Athina S.</p>
        <Stars />
    </div>
)

export default Header
