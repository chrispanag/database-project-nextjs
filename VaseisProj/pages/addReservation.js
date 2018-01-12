import React, { Component } from 'react'
import Router from 'next/router';
import * as _ from 'lodash';

import Layout from '../components/MyLayout.js'
import App from '../components/App.js'

import fetch from 'isomorphic-unfetch'
import { Form } from 'semantic-ui-react'

import textField from '../components/textField.js'

class FormReservation extends Component {
  state = {
    address: '',
    vat: ''
  };

  constructor(props) {
    super(props);
  }

  handleChange = (e, {name, value}) => this.setState({ [name]: value })

  handleSubmit = () => {
    var {
      vehicle_id,
      customer_id,
      employee_id,
      prepaid,
      date_end,
      date_start
    } = this.state;

    if (prepaid) {
      prepaid = true;
    } else {
      prepaid = false;
    }

    const body = {
      query:
        `mutation {
          createReservation (input: {
            vehicle_id: "${vehicle_id}",
            customer_id: "${customer_id}",
            employee_id: "${employee_id}",
            prepaid: ${prepaid},
            date_end: "${date_end}",
            date_start: "${date_start}"
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
      Router.push(`/reservations`);
    })
  }

  render () {
     const {
       vehicle_id,
       customer_id,
       employee_id,
       prepaid,
       date_end,
       date_start
     } = this.state

     console.log(this.props);
    return (
      <Form onSubmit={this.handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Input label="Start Date" name="date_start" onChange={this.handleChange} fluid/>
        <Form.Input label="End Date" name="date_end" onChange={this.handleChange} fluid/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Select name="vehicle_id" placeholder="Vehicle" label="Vehicle"
          options={this.props.vehicles.map(d => {return {key: d.id, text: `${d.brand} ${d.model}`, value: d.id}})} onChange={this.handleChange} fluid
        />
        <Form.Select name="customer_id" placeholder="Customer" label="Customer"
          options={this.props.customers.map(d => {return {key: d.id, text: d.vat, value: d.id}})} onChange={this.handleChange} fluid
        />
        <Form.Select name="employee_id" placeholder="Employee" label="Employee"
          options={this.props.employees.map(d => {return {key: d.id, text: d.name, value: d.id}})} onChange={this.handleChange} fluid
        />
        </Form.Group>
        <Form.Field label='Prepaid' name="prepaid" type="checkbox" control="input"/>


      <Form.Button content="Submit"/>
      </Form>

    )
  }
}

const addReservation = (props) => (
 <App>
   <Layout>
   <div className="ui left aligned container">
      <h1 className="ui header">Add Reservation</h1>
    <FormReservation vehicles={props.vehicles} employees={props.employees} customers={props.customers}/>
    </div>
   </Layout>
  </App>
)

addReservation.getInitialProps = async function() {
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

export default addReservation
