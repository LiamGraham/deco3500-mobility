import React, { Component } from 'react'
import { Grid, Item, Segment, Button, Comment, Form, Header, Icon, Image } from 'semantic-ui-react'

import ProfileDisplay from '../components/profileDisplay'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }  

  render() {
    const { user } = this.props
    
    if (user) {
      return <div>

        <ProfileDisplay user={user} isSelf={true} />
        <Grid columns>
        <Grid.Column width={8}>
        <Header as='h1' attached='top'>
          Follow my work! 
        </Header>
        
        <Segment attached>
          <div>
            <Button color='facebook'>
              <Icon name='facebook' /> Facebook
            </Button>
            <Button color='twitter'>
              <Icon name='twitter' /> Twitter
            </Button>
            <Button color='instagram'>
              <Icon name='instagram' /> Instagram
            </Button>
            <Button color='youtube'>
              <Icon name='youtube' /> YouTube
            </Button>
          </div>
        </Segment>
        </Grid.Column>
        </Grid>

        {/* comment section */}
        {/* <Segment>
            <Comment.Group minimal>
                <Header as='h3' dividing>
                  Comments
                </Header>

                <Comment>
                  <Comment.Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU' />
                  <Comment.Content>
                    <Comment.Author as='a'>Ann</Comment.Author>
                    <Comment.Metadata>
                      <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Comment>
                  <Comment.Avatar src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70'/>
                  <Comment.Content>
                    <Comment.Author as='a'>John</Comment.Author>
                    <Comment.Metadata>
                      <div>5 days ago</div>
                    </Comment.Metadata>
                    <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>

                <Form reply>
                  <Form.TextArea />
                  <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
              </Comment.Group>
        </Segment> */}
      </div>
    } else {
      return <div className="App-container">
        <Header size='medium'>Please log in to view your profile!</Header>   
      </div>
    }
  }
}

export default ProfileContainer