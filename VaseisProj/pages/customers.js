import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'

import AddButton from '../components/AddButton.js'
import Actions from '../components/Actions.js'

import fetch from 'isomorphic-unfetch'
// TODO : CREATE Reservations

 const Customers = (props) => (
  <App>
    <Layout>
    <div className="ui center aligned content container">
      <h2 className="ui header">Customers List</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>id</th>
              <th>Address</th>
              <th>VAT</th>
              <th>Date Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {props.customers.map(r => (
            <tr>
              <td>{r.id}</td>
              <td>{r.address}</td>
              <td>{r.vat}</td>
              <td>{r.date_registered}</td>
              <td>
                <Actions _id={r.id} Entity="Customer"/>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <AddButton element="Customer"/>
      </div>
    </Layout>
  </App>
)

Customers.getInitialProps = async function() {
  var body = {query:
    `query {
  customers {
    id,
    address,
    vat,
    date_registered
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

  return {customers: data.data.customers}
}

export default Customers
