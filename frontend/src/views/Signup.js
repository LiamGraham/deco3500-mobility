import React, { Component } from 'react'
import { Header, Form, Segment, Radio, Grid } from 'semantic-ui-react'

const genreOptions = [
  { key: 'alternative', text: 'Alternative', value: 'alternative' },
  { key: 'blues', text: 'Blues', value: 'blues' },
  { key: 'classical', text: 'Classical', value: 'classical' },
  { key: 'country', text: 'Country', value: 'country' },
  { key: 'dance', text: 'Dance', value: 'dance' },
  { key: 'electronic', text: 'Electronic', value: 'electronic' },
  { key: 'hip hop', text: 'Hip Hop', value: 'hip hop' },
  { key: 'instrumental', text: 'Instrumental', value: 'instrumental' },
  { key: 'jazz', text: 'Jazz', value: 'jazz' },
  { key: 'orchestra', text: 'Orchestra', value: 'orchestra' },
  { key: 'pop', text: 'Pop', value: 'pop' },
  { key: 'punk', text: 'Punk', value: 'punk' },
  { key: 'reggae', text: 'Reggae', value: 'reggae' },
  { key: 'rock', text: 'Rock', value: 'rock' },
  { key: 'soul', text: 'Soul', value: 'soul' }
]

const skillOptions = [
  { key: 'acoustic guitar', text: 'Acoustic Guitar', value: 'acoustic guitar' },
  { key: 'bass guitar', text: 'Bass Guitar', value: 'bass guitar' },
  { key: 'cello', text: 'Cello', value: 'cello' },
  { key: 'clarinet', text: 'Clarinet', value: 'clarinet' },
  { key: 'double bass', text: 'Double Bass', value: 'double bass' },
  { key: 'drums', text: 'Drums', value: 'drums' },
  { key: 'electric guitar', text: 'Electric Guitar', value: 'electric guitar' },
  { key: 'flute', text: 'Flute', value: 'flute' },
  { key: 'mastering', text: 'Mastering', value: 'mastering' },
  { key: 'mixing', text: 'Mixing', value: 'mixing' },
  { key: 'piano', text: 'Piano', value: 'piano' },
  { key: 'production', text: 'Production', value: 'production' },
  { key: 'rapping', text: 'Rapping', value: 'rapping' },
  { key: 'singing', text: 'Singing', value: 'singing' },
  { key: 'trumpet', text: 'Trumpet', value: 'trumpet' },
  { key: 'violin', text: 'Violin', value: 'violin' }
]

class SignupForm extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 600 }}>
        <Header as='h2' color='blue' textAlign='center'>
          Sign Up today!
        </Header>
        <Segment padded >
          <Form >
            {/* basic information */}
            <Form.Group widths='equal'>
              <Form.Input fluid label='Username' placeholder='User Name' />
              <Form.Input fluid label='First Name' placeholder='First Name' />
              <Form.Input fluid label='Last Name' placeholder='Last Name' />
            </Form.Group>

            {/* genre music  */}
            <Form.Select
              fluid label='What kind of music do you make?' placeholder='You can select multiple genres' fluid multiple selection options={genreOptions} />

            {/* skills */}
            <Form.Select
              fluid label='What are your musical skills?' placeholder='You can select multiple skills' fluid multiple selection options={skillOptions} />

            {/* level of experience */}
            <Form.Field fluid label='What is your level of experience?'/>
            <Form.Group >
              <Form.Field
                control={Radio}
                label='Beginner'
                value='1'
                checked={value === '1'}
                onChange={this.handleChange}
              />
              <Form.Field
                control={Radio}
                label='Novice'
                value='2'
                checked={value === '2'}
                onChange={this.handleChange}
              />
              <Form.Field
                control={Radio}
                label='Intermediate'
                value='3'
                checked={value === '3'}
                onChange={this.handleChange}
              />
              <Form.Field
                control={Radio}
                label='Advance'
                value='4'
                checked={value === '4'}
                onChange={this.handleChange}
              />
              <Form.Field
                control={Radio}
                label='Expert'
                value='5'
                checked={value === '5'}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.TextArea label='Bio' placeholder='Tell us more about you...' />
            <Form.Checkbox label='I agree to the Terms and Conditions' />
            <Form.Button color='green' onClick={()=>{ alert('Sign up complete!'); }}>Submit</Form.Button>
            

          </Form>
        </Segment>
      </Grid.Column>
      </Grid>
    )
  }
}

export default SignupForm
