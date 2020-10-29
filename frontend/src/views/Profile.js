import React, { Component } from 'react'
import { Grid, Item, Segment, Button, Comment, Form, Header, List } from 'semantic-ui-react'


class ProfileContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { user } = this.props
    
    if (user) {
      return <div>

        <Grid columns='equal'>
            {/* <Grid.Row stretched> */}
              {/* profile column */}              
              <Grid.Column>
                <div>
                  <Header as='h1' attached='top'>
                    My Profile
                  </Header>

                  <Segment attached>
                    <Item.Group>
                      <Item>
                        <Item.Image size='tiny' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                        <Item.Content>
                          <Header size='large' color='blue'>{`${user.firstName} ${user.lastName}`}</Header>
                          <Item.Meta>Musician</Item.Meta>
                          <Header size='small'>{user.bio}</Header>
                        </Item.Content>
                      </Item>
                    </Item.Group>

                    <Grid.Row>
                      {/* interests */}
                      <List>
                        <List.Item>
                          <List.Icon name='like' />
                            <List.Content>
                              <List.Header>My Interests</List.Header>
                              {user.skills.map((element) => {
                                return <List.Description>{element} </List.Description> 
                              })}
                            </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Row>

                    <Grid.Row>
                      {/* skills */}
                      <List>
                        <List.Item>
                          <List.Icon name='music' />
                            <List.Content>
                              <List.Header>My Genres</List.Header>
                              {user.genres.map((element) => {
                                return <List.Description>{element} </List.Description> 
                              })}
                            </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Row>

                  </Segment>


                  
                  
                </div>
              </Grid.Column>

              <Grid.Column >
                <div>
                  <Header as='h1' attached='top'>
                    My Creations
                  </Header>
                  <Segment attached>
                    <iframe width="100%" height="166" scrolling="no" frameborder="yes" allow="autoplay" 
                      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp;">
                    </iframe>

                    <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" 
                      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/138234&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">
                    </iframe>

                  </Segment>
                  
                </div>
              </Grid.Column>
              
            {/* </Grid.Row> */}
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