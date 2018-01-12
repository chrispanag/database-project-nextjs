import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'

import AddButton from '../components/AddButton.js'
import Actions from '../components/Actions.js'

import fetch from 'isomorphic-unfetch'

 const Leases = (props) => (
  <App>
    <Layout>
    <div className="ui center aligned content container">
      <h2 className="ui header">Leases List</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>id</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {props.leases.map(l => (
            <tr>
              <td>{l.id}</td>
              <td>{l.date_start}</td>
              <td>{l.date_end}</td>
              <td>
                <Actions _id={l.id} Entity="Lease"/>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </Layout>
  </App>
)

Leases.getInitialProps = async function() {
  var body = {query:
    `query {
  leases {
    id,
    date_start,
    date_end
  }
}`
  }
  const res = await fetch('http://localhost:4000/graphql', {
	  method: 'POST',
	  body: JSON.stringify(body),
	  headers: { 'Content-Type': 'application/json'}
  })
  const data = await res.json()
  console.log(data);
  console.log(`Show data fetched. Count: ${data.length}`)

  return {leases: data.data.leases}
}

export default Leases
