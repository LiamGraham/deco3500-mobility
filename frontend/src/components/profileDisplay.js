import React, { Component } from 'react'
import { Grid, Item, Segment, Button, Comment, Form, Header, List, Image } from 'semantic-ui-react'

const images = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  'https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  'https://images.pexels.com/photos/4580470/pexels-photo-4580470.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/2802811/pexels-photo-2802811.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/5149881/pexels-photo-5149881.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
  'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5c76b7d331358e35dd2773a9%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D4401%26cropY1%3D0%26cropY2%3D4401',
  'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5babb7f1a7ea4342a948b79a%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D748%26cropX2%3D3075%26cropY1%3D1753%26cropY2%3D4082'
]

const soundCloudLinks = [
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp;",
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/138234&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
]

// var index = 0;
// index = Math.floor(Math.random() * images.length);
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 

class ProfileDisplay extends Component {

  getRandomSoundCloudLink() {
    return soundCloudLinks[Math.floor(Math.random() * soundCloudLinks.length)]
  }

  render() {
    const { user, isSelf } = this.props
      return <Grid columns='equal'>
            {/* my profile */}
           <Grid.Column>
              <Header as='h1' attached='top'>
                {isSelf ? 'My Profile' : `${user.firstName}'s Profile`}
              </Header>
              <Segment attached>
                {/* user pic/bio section */}
                <Grid columns={2}>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column width={3}>
                      {/* <Header>{this.images(index)}</Header> */}
                      <Image size='small' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                    </Grid.Column>
                      
                    <Grid.Column>
                      <Header as='h1' color='blue'>{`${user.firstName} ${user.lastName}`}
                        <Header.Subheader>Musician</Header.Subheader>
                      </Header>
                      <Header as='small'>{user.bio}</Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                {/* skills/genres section */}
                <Grid columns={3}>
                  <Grid.Row verticalAlign='top'>

                    <Grid.Column width={3}>
                      {/* empty filler box */}
                    </Grid.Column>

                    {/* genres */}
                    <Grid.Column>
                      <List>
                        <List.Item>
                          <List.Icon name='music' />
                            <List.Content>
                              <List.Header>{isSelf ? 'My Genres' : `${user.firstName}'s Genres`}</List.Header>
                              {user.genres.map((element) => {
                                return <List.Description>{capitalizeFirstLetter(element)} </List.Description> 
                              })}
                            </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Column>

                      {/* interests */} 
                    <Grid.Column>
                      <List>
                        <List.Item>
                          <List.Icon name='like' />
                            <List.Content>
                              <List.Header>{isSelf ? 'My Skills' : `${user.firstName}'s Interests`}</List.Header>
                              {user.skills.map((element) => {
                                return <List.Description>{capitalizeFirstLetter(element)} </List.Description> 
                              })}
                            </List.Content>
                        </List.Item>
                      </List>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment> 
          </Grid.Column>

          {/* my creations */}
          <Grid.Column >
              <Header as='h1' attached='top'>
                {isSelf ? 'My Creations' : `${user.firstName}'s Creations`}
              </Header>

              <Segment attached>
                <iframe width="100%" height="166" scrolling="no" frameborder="yes" allow="autoplay" 
                  src={this.getRandomSoundCloudLink()}>
                </iframe>

                <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" 
                  src={this.getRandomSoundCloudLink()}>
                </iframe>
              </Segment>
          </Grid.Column>
      </Grid>
  }
}

export default ProfileDisplay