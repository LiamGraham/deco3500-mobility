import axios from 'axios'
import React, { Component } from 'react'
import { Button, Modal, Header, Segment, Grid } from 'semantic-ui-react'
import Swal from 'sweetalert2'
import ProfileDisplay from '../components/profileDisplay'

const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

class UserDisplay extends Component {
  constructor(props) {
    super(props) 
    console.log(props)
    console.log('constructing user Display')
  }

  close() {
    this.props.close()
  }

  render() {
    console.log('calling render')
    const { collaborator, user } = this.props

    if (!collaborator) {
      return null
    }
    
    console.log(collaborator)
    return <div>{style}
      <Modal
        open={this.props.open}
        header={`Would you like to collaborate with ${collaborator.firstName}?`}
        content={
          <Segment padded>
            <Header as='h3' textAlign='center'>Based on your preferences, we have matched you with {collaborator.firstName}. Do you want to collaborate?</Header>

            {this.props.collaborator ? 
              <ProfileDisplay user={this.props.collaborator} isSelf={false} />
              :
              <p>Loading...</p>
            }
          </Segment> 
        }
        actions={['No', { key: 'done', content: 'Yes', positive: true, onClick: async () => {
          let res
          try {
            res = await axios.put(`https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/${user.username}/saved?username=${collaborator.username}`, { username: collaborator.username })
            Swal.fire({
              title: `Added ${collaborator.firstName} as a collaborator`,
              text: `You have added ${collaborator.firstName} as a collaborator. Go to your collaborators page to start talking to them!`,
              icon: 'success',
              confirmButtonText: 'OK'
            })
          } catch (error) {
            Swal.fire({
              title: `Failed to connect with ${collaborator.firstName}`,
              text: `Sorry, we encountered an error when connecting with ${collaborator.firstName}, please try again later.`,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
          
        }}]}
        onClose={() => this.close()}
        // onOpen={() => this.setOpen(true)}
      />
    </div>
  }
}

export default UserDisplay
