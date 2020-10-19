import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Collaborators from './views/Collaborators';
import Explore from './views/Explore';
import Signup from './views/Signup';

import { Menu, Segment, Input, Button } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment  >
        <Menu secondary >
          <Menu.Item
            as={Link} to='home'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            as={Link} to='explore'
            name='explore'
            active={activeItem === 'explore'}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            as={Link} to='collaborators'
            name='collaborators'
            active={activeItem === 'collaborators'}
            onClick={this.handleItemClick}
          />

          <Menu.Item
            as={Link} to='about'
            name='about'
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          />

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          <Menu.Item>
            <Button as='a' >
              Log In
            </Button>
            <Button as={Link} to='signup' style={{ marginLeft: '0.5em' }}>
              Sign Up
            </Button>
          </Menu.Item>
        </Menu.Menu>

        </Menu>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/explore' component={Explore} />
          <Route path='/collaborators' component={Collaborators} />
          <Route path='/about' component={About} />
          <Route path='/signup' component={Signup} />

        </Switch>
      </Segment>
    )
  }
}