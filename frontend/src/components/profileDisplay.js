import React, { Component } from 'react'
import { Grid, Item, Segment, Button, Comment, Form, Header, List } from 'semantic-ui-react'

class ProfileDisplay extends Component {

    render() {
        const { user, isSelf } = this.props
        return <Grid columns='equal'>
            {/* <Grid.Row stretched> */}
              {/* profile column */}              
              <Grid.Column>
                <div>
                  <Header as='h1' attached='top'>
                    {isSelf ? 'My Profile' : `${user.firstName}'s Profile`}
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
                              <List.Header>{isSelf ? 'My Interests' : `${user.firstName}'s Interests`}</List.Header>
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
                              <List.Header>{isSelf ? 'My Genres' : `${user.firstName}'s Genres`}</List.Header>
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
                    {isSelf ? 'My Creations' : `${user.firstName}'s Creations`}
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
    }
}

export default ProfileDisplay
