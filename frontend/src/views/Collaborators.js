import axios from 'axios'
import React, { Component } from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import Swal from 'sweetalert2'

class GridExampleStretched extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      collaborators: null,
    }
  }

  componentDidMount() {
    this.getSavedCollaborators()
  }

  getSavedCollaborators = async () => {
    const { user } = this.props
    if (!user) {
      return
    }
    this.setState({ loading: true })
    let res
    try {
      res = await axios.get(`https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/${user.username}/saved`)
      console.log(res.data.data)
      this.setState({ loading: false, collaborators: res.data.data })
    } catch (error) {
      this.setState({ loading: false })
      console.error(error)
      Swal.fire({
        title: `Failed to load collaborators`,
        text: `Sorry, we encountered an error when loading your collaborators, please try again later.`,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  render() {
    const { loading } = this.state
    if (loading) {
      return <div className="App-container">
        <Header size='medium'>Retrieving collaborators...</Header>      
      </div>
    }
    return <Grid columns='equal'>
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
  }
}

export default GridExampleStretched