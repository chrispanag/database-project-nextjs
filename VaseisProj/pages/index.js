import Layout from '../components/MyLayout.js'
import App from '../components/App.js'
import Link from 'next/link'

import fetch from 'isomorphic-unfetch'

 const Index = (props) => (
  <App>
    <Layout>
      <div className="ui center aligned content container">
        <p>NACars is a dummy company ;p</p>
        <ul>
      {props.employees.map((employee) => (
        <li key={employee.id}>
          <Link as={`/p/${employee.id}`} href={`/post?id=${employee.id}`}>
            <a>{employee.name}</a>
          </Link>
        </li>
      ))}
    </ul>
      </div>
    </Layout>
  </App>
)

Index.getInitialProps = async function() {
  var body = {query:
    `query {
      employees {
        id,
        ssn,
        name
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

export default Index
