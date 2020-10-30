import React from 'react';
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

function Home() {
  return (
    <div>
      <div className="App-container">
        <Header size='huge'>Find your future collaborator today!</Header>
        <Header size='medium'>Welcome to the Cadence</Header>
        <Button size='large' color='blue' as={Link} to='signup'>Join Now</Button>
      </div>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We Help Musicians and Artists
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We can help make your music career so much easier so you can focus on your music.
                Let us delight you and empower your needs through pure data analytics and algorithms.
              </p>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Discover
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We inspire musicians by
                creating a simple, easy to use
                platform that will automatically
                find users and initiate
                collaboration.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src='https://images.pexels.com/photos/159376/turntable-top-view-audio-equipment-159376.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "I found the perfect musician to collaborate with"
              </Header>
              <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                "It makes collaborating so easy!"
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <b> Richard Brown</b> Musician
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Get Inspired
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Instead of focusing on finding users online, focus on music content creation and hard work. Cadence will
            match you based on your musical preferences. 
          </p>
          

          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <a href='#'>Case Studies</a>
          </Divider>

          <Header as='h3' style={{ fontSize: '2em' }}>
            How it works...
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Through extensive research and feedback from real musicians, Cadence is designed to
            intelligently guide individuals
            towards the formation of
            effective collaborations.
            Using the information provided during user
            sign up, the system is able to
            make appropriate matches, and be
            sensitive to the social factors governing
            collaboration formation and execution.
          </p>
          <Button size='large' color ='blue' as={Link} to='signup'>
            Alright, I'm Interested
          </Button>
        </Container>
      </Segment>

      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Signup</List.Item>
                  <List.Item as='a'>Contact Us</List.Item>
                  
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <List.Item as='a'>FAQ</List.Item>
                  <List.Item as='a'>How To Access</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as='h4' inverted>
                  Reference
                </Header>
                <p>
                  Team Mobility DECO3500
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
}

export default Home