import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'

import AddButton from '../components/AddButton.js'
import Actions from '../components/Actions.js'

import fetch from 'isomorphic-unfetch'

import * as _ from 'lodash'

 const DepartmentsCabrio = (props) => (
  <App>
    <Layout>
    <div className="ui center aligned content container">
      <h2 className="ui header">Departments with Cabrios List</h2>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>id</th>
              <th>Address</th>
              <th>Communication</th>
              <th>Telephone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {props.vehicles.map(e => (
            <tr>
              <td>{e.id}</td>
              <td>{e.address}</td>
              <td>{e.communication}</td>
              <td>{e.telephone}</td>
              <td>
                <Actions _id={e.id} Entity="Department"/>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </Layout>
  </App>
)

DepartmentsCabrio.getInitialProps = async function() {
  var body = {query:
    `query {
  vehiclesCabrio {
    id,
    department {
      id,
      address,
      communication
      telephone
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

  var departments = _.map(data.data.vehiclesCabrio, d => d.department)
  console.log(departments);
  return {vehicles: _.uniq(departments)}
}

export default DepartmentsCabrio
