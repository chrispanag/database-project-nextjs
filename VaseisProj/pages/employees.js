import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'

import Actions from '../components/Actions.js'
import AddButton from '../components/AddButton.js'

import { Button } from 'semantic-ui-react'

import fetch from 'isomorphic-unfetch'

 const Employees = (props) => (
  <App>
    <Layout>
    <div className="ui center aligned content container">
      <h2 className="ui header">Employees List</h2>
        <table className="ui celled table">
          <thead>
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
          {props.employees.map(e => (
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
        <AddButton element="Employee"/>
        <Link href='/departmentEmployees'>
          <Button>Group Employees by Department</Button>
        </Link>
      </div>
    </Layout>
  </App>
)

Employees.getInitialProps = async function() {
  var body = {query:
    `query {
  employees {
    id,
    ssn,
    name,
    address,
    license
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

  return {employees: data.data.employees}
}

export default Employees
