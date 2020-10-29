import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
const axios = require('axios')
const Swal = require('sweetalert2')

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = { username: null }
  }

  handleChange = (key, value) => {
    console.log('setting state')
    this.setState({ [key]: value })
  }

  getMatches = async (username) => {
    if (!username) {
      return null
    }
    let res
    try {
      res = await axios.get(`https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/${username}/matches?threshold=0.5`)
    } catch (error) {
      console.error(error)
    }
    console.log('got matches', res)
    return res.data.data
  }

  loginUser = async () => {
    const { username } = this.state
    let res
    this.setState({ loading: true })
    if (username) {
      try {
        res = await axios.get(`https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/${username}`)
        if (res) {
          const matches = await this.getMatches(username)
          const user = { matches, ...res.data.data}
          console.log(`Setting user as`)
          console.log(user)
          this.props.setUser(user)
          this.setState({ loading: false })
          this.props.history.push('/explore')
        } else {
          this.setState({ loading: false })
          Swal.fire({
            title: 'Login failed',
            text: 'Failed to sign in. Please check the username is correct or try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      } catch (error) {
        this.setState({ loading: false })
        Swal.fire({
          title: 'Login failed',
          text: 'Failed to sign in. Please check the username is correct or try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } else {
      Swal.fire({
        title: 'Login failed',
        text: 'Please enter a username',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      this.setState({ loading: false })
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
            
            <Button color='blue' fluid size='large' onClick={this.loginUser} loading={this.state.loading}>
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