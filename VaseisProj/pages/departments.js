import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'

import AddButton from '../components/AddButton.js'
import Actions from '../components/Actions.js'

import fetch from 'isomorphic-unfetch'

 const Departments = (props) => (
  <App>
    <Layout>
    <div className="ui center aligned content container">
      <h2 className="ui header">Departments List</h2>
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
          {props.departments.map(e => (
            <tr>
              <td>{e.id}</td>
              <td>{e.address}</td>
              <td>{e.communication}</td>
              <td>
                <Actions _id={e.id} Entity="Department"/>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <AddButton element="Department"/>
      </div>
    </Layout>
  </App>
)

Departments.getInitialProps = async function() {
  var body = {query:
    `query {
  departments {
    id,
    communication,
    address
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

export default Departments
