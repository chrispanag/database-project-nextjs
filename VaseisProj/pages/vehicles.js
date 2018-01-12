import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'
import AddButton from '../components/AddButton.js'
import Actions from '../components/Actions.js'

import fetch from 'isomorphic-unfetch'

import { Icon, Label, Menu, Table } from 'semantic-ui-react'

 const Vehicles = (props) => (
  <App>
    <Layout>
    <div className="ui center aligned content container">
      <h2 className="ui header">Vehicles List</h2>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>id</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Brand</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Model</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>HP</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Cubism</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Kilometers</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Next Service</Table.HeaderCell>
              <Table.HeaderCell colSpan='2'>Department</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Actions</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>id</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {props.vehicles.map(v => (
            <Table.Row>
              <Table.Cell>{v.id}</Table.Cell>
              <Table.Cell>{v.brand}</Table.Cell>
              <Table.Cell>{v.model}</Table.Cell>
              <Table.Cell>{v.hp}</Table.Cell>
              <Table.Cell>{v.cubism}</Table.Cell>
              <Table.Cell>{v.km}</Table.Cell>
              <Table.Cell>{v.service_date}</Table.Cell>
              <Table.Cell>{v.department.id}</Table.Cell>
              <Table.Cell>{v.department.address}</Table.Cell>
              <Table.Cell>
                <Actions _id={v.id} Entity="Vehicle"/>
              </Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
        <AddButton element="Vehicle"/>
      </div>
    </Layout>
  </App>
)

Vehicles.getInitialProps = async function() {
  var body = {query:
    `query {
  vehicles {
    id,
    license_plate,
    year_bought,
    damages,
    ins_expiration,
    brand,
    type,
    model,
    hp,
    cubism,
    km,
    service_date,
    department {
      id,
      address
    }
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

  return {vehicles: data.data.vehicles}
}

export default Vehicles
