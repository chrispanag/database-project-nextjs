import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'

import AddButton from '../components/AddButton.js'

import Actions from '../components/Actions.js'

import fetch from 'isomorphic-unfetch'
// TODO : CREATE Reservations

 const Reservations = (props) => (
  <App>
    <Layout>
    <div className="ui center aligned content container">
      <h2 className="ui header">Reservations List</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>id</th>
              <th>Address</th>
              <th>Communication</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {props.reservations.map(r => (
            <tr>
              <td>{r.id}</td>
              <td>{r.address}</td>
              <td>{r.communication}</td>
              <td>
                <Actions _id={r.id} Entity="Reservation"/>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <AddButton element="Reservation"/>
      </div>
    </Layout>
  </App>
)

Reservations.getInitialProps = async function() {
  var body = {query:
    `query {
  reservations {
    id,
    prepaid,
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

  return {reservations: data.data.reservations}
}

export default Reservations
