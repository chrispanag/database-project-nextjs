import React, { Component } from 'react'
import Router from 'next/router';
import * as _ from 'lodash';

import Layout from '../components/MyLayout.js'
import App from '../components/App.js'

import fetch from 'isomorphic-unfetch'
import { Form } from 'semantic-ui-react'

import Schema from 'form-schema-validation';

import textField from '../components/textField.js'

class FormEmployee extends Component {
  state = {
    name: '',
    ssn: '',
    address: '',
    license: '',
    department_id: ''
  };

  constructor(props) {
    super(props);
  }

  handleChange = (e, {name, value}) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, ssn, address, license, department_id } = this.state;

    const body = {
      query:
        `mutation {
          createEmployee (input: {
            name: "${name}",
            ssn: "${ssn}",
            address: "${address}",
            license: "${license}",
            department_id: "${department_id}"
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
      Router.push(`/employees`);
    })
  }

  render () {
     const { name, ssn, address, license, department_id } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
    <Form.Input label="Name" name="name" onChange={this.handleChange} fluid/>
    <Form.Input label="SSN" name="ssn" onChange={this.handleChange} fluid/>
    <Form.Input label="Address" name="address" onChange={this.handleChange} fluid/>
    <Form.Input label="License" name="license" onChange={this.handleChange} fluid/>
    <Form.Select name="department_id" placeholder="Department" label="Department"
      options= {this.props.departments.map(d => {return {key: d.id, text: d.id, value: d.id}})} onChange={this.handleChange} fluid
    />

    <Form.Button content="Submit"/>
    </Form>

    )
  }
}

const addVehicle = (props) => (
 <App>
   <Layout>
   <div className="ui left aligned container">
      <h1 className="ui header">Add Employee</h1>
      <FormEmployee departments={props.departments}/>
    </div>
   </Layout>
  </App>
)

addVehicle.getInitialProps = async function() {
  var body = {query:
    `query {
      departments {
        id
      }
    }`
  }
  const res = await fetch('http://localhost:4000/graphql', {
	  method: 'POST',
	  body: JSON.stringify(body),
	  headers: { 'Content-Type': 'application/json'}
  })
  const data = await res.json()
  console.log(`Show data fetched. Count: ${data.length}`)

  return {departments: data.data.departments}
}

export default addVehicle
