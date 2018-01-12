import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'

import Actions from '../components/Actions.js'
import AddButton from '../components/AddButton.js'

import { Button } from 'semantic-ui-react'

import fetch from 'isomorphic-unfetch'

 const departmentEmployees = (props) => (
  <App>
    <Layout>
    <div className="ui center aligned content container">
      <h3 className="ui header"> Grouped Employees by Department</h3>
      {props.departments.map(d => (
        <table className="ui celled table">
          <thead>
            <tr>
              <th colSpan='6'>{d.id}</th>
            </tr>
            <tr>
              <th>id</th>
              <th>Full Name</th>
              <th>SSN</th>
              <th>Address</th>
              <th>License</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {d.employees.map(e => (
            <tr>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.ssn}</td>
              <td>{e.address}</td>
              <td>{e.license}</td>
              <td>
                <Actions _id={e.id} Entity="Employee"/>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      ))}
      </div>
    </Layout>
  </App>
)

departmentEmployees.getInitialProps = async function() {
  var body = {query:
    `query {
  departments {
    id,
    employees {
      id,
      name,
      ssn,
      address,
      license
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

  return {departments: data.data.departments}
}

export default departmentEmployees
