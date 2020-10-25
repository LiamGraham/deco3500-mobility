import React from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'

const GridExampleStretched = () => (

  <Grid columns='equal'>
    <Grid.Row stretched>
      <Grid.Column>
        <div>
          <Header as='h2' attached='top'>
            Your Collaborators
          </Header>
          <Segment attached>
            Stuff 
          </Segment>
        </div>
      </Grid.Column>

      <Grid.Column width={4}>
        <div>
          <Header as='h2' attached='top'>
            Future Saved Collaborators
          </Header>
          <Segment attached>
            Stuff 
          </Segment>
          <Segment>1</Segment>
          <Segment>2</Segment>
          <Segment>3</Segment>
        </div>
      </Grid.Column>
      
    </Grid.Row>
  </Grid>
)

export default GridExampleStretched