import React, { Component } from 'react'
import Router from 'next/router';
import * as _ from 'lodash';

import Layout from '../components/MyLayout.js'
import App from '../components/App.js'

import fetch from 'isomorphic-unfetch'
import { Form } from 'semantic-ui-react'

import Schema from 'form-schema-validation';

import textField from '../components/textField.js'

class FormCustomer extends Component {
  state = {
    address: '',
    vat: '',
    name: ''
  };

  constructor(props) {
    super(props);
  }

  handleChange = (e, {name, value}) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { address, vat, name } = this.state;

    const body = {
      query:
        `mutation {
          createCustomer (input: {
            address: "${address}",
            name: "${name}"
            vat: "${vat}"
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
      Router.push(`/customers`);
    })
  }

  render () {
     const {
       address,
       vat,
       name
     } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input label="Name" name="name" onChange={this.handleChange} fluid/>
        <Form.Input label="Address" name="address" onChange={this.handleChange} fluid/>
        <Form.Input label="VAT" name="vat" onChange={this.handleChange} fluid/>
      </Form.Group>

      <Form.Button content="Submit"/>
      </Form>

    )
  }
}

const addCustomer = (props) => (
 <App>
   <Layout>
   <div className="ui left aligned container">
      <h1 className="ui header">Add Customer</h1>
      <FormCustomer />
    </div>
   </Layout>
  </App>
)

export default addCustomer
