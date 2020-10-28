import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
const axios = require('axios')

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = { username: null }
  }

  handleChange = (key, value) => {
    console.log('setting state')
    this.setState({ [key]: value })
  }

  loginUser = async () => {
    const { username } = this.state
    let res
    if (username) {
      try {
        res = await axios.get(`https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/${username}`)
        if (res) {
          console.log(`Setting user as ${res.data.data}`)
          this.props.setUser(res.data.data)
        } else {
          alert('Failed to sign in. Please check the username is correct or try again later.')
        }
      } catch (error) {
        alert('Failed to sign in. Please check the username is correct or try again later.')
      }
      this.props.history.push('/explore')
    } else {
      alert('Please enter a username')
    }
  }

  render() {
    return <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='blue' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={(e, { value }) => {this.handleChange('username', value)}} />
            
            <Button color='blue' fluid size='large' onClick={this.loginUser}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='./Signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  }
}

export default LoginForm