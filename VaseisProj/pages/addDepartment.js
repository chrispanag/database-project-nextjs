import React, { Component } from 'react'
import Router from 'next/router';
import * as _ from 'lodash';

import Layout from '../components/MyLayout.js'
import App from '../components/App.js'

import fetch from 'isomorphic-unfetch'
import { Form } from 'semantic-ui-react'

import textField from '../components/textField.js'

class FormDepartment extends Component {
  state = {
    address: '',
    vat: ''
  };

  constructor(props) {
    super(props);
  }

  handleChange = (e, {name, value}) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {
      address,
      communication,
      telephone
    } = this.state;

    const body = {
      query:
        `mutation {
          createDepartment (input: {
            address: "${address}",
            communication: "${communication}",
            telephone: "${telephone}"
          }) {
            id
          }
        }`
    }

    fetch('http://localhost:4000/graphql', {
  	  method: 'POST',
  	  body: JSON.stringify(body),
  	  headers: { 'Content-Type': 'application/json'}
    }).then(res => {
      const data = res.json()
      Router.push(`/departments`);
    })
  }

  render () {
     const {
       address,
       communication,
       telephone
     } = this.state

     console.log(this.props);
    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input label="Address" name="address" onChange={this.handleChange} fluid/>
        <Form.Input label="Communication" name="communication" onChange={this.handleChange} fluid/>
        <Form.Input label="Telephone" name="telephone" onChange={this.handleChange} fluid/>
      </Form.Group>

      <Form.Button content="Submit"/>
      </Form>

    )
  }
}

const addDepartment = (props) => (
 <App>
   <Layout>
   <div className="ui left aligned container">
      <h1 className="ui header">Add Department</h1>
    <FormDepartment vehicles={props.vehicles} employees={props.employees} customers={props.customers}/>
    </div>
   </Layout>
  </App>
)

addDepartment.getInitialProps = async function() {
  var body = {query:
    `query {
      customers {
        id,
        vat
      },
      vehicles {
        id,
        brand,
        model,
        reservations  {
          id,
          date_start,
          date_end
        }
      },
      employees {
        id,
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
  console.log(`Show data fetched. Count: ${data.data.length}`)
  return {vehicles: data.data.vehicles, customers: data.data.customers, employees: data.data.employees}
}

export default addDepartment
