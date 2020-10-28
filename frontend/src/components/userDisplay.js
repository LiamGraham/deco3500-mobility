import React, { Component } from 'react'
import { Button, Modal, Item, Segment } from 'semantic-ui-react'

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
    const { collaborator } = this.props

    if (!collaborator) {
      return null
    }
    
    console.log(collaborator)
    return <div>{style}
      <Modal
        open={this.props.open}
        header={`Would you like to collaborate with ${collaborator.firstName}?`}
        content={
          <div>
            {/* <Header size='medium'>Please log in to view your matches!</Header>    */}
            <h2>Based on your preferences, we have matched you with {collaborator.firstName}. Do you want to collaborate?</h2>

            {this.props.collaborator ? 
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Image size='tiny' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />

                    <Item.Content>
                      <Item.Header as='a'>{collaborator.firstName}</Item.Header>
                      <Item.Meta>Musician</Item.Meta>
                      <Item.Description>{collaborator.bio}</Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
              :
              <p>Loading...</p>
            }
          </div>
        }
        actions={['No', { key: 'done', content: 'Yes', positive: true }]}
        onClose={() => this.close()}
        // onOpen={() => this.setOpen(true)}
      />
    </div>
  }
}

export default UserDisplay
