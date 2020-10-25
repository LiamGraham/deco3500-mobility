import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Profile from './views/Profile';
import Collaborators from './views/Collaborators';
import Explore from './views/Explore';
import Login from './views/Login';
import Signup from './views/Signup';

import { Menu, Input, Button, Image } from 'semantic-ui-react'

export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className='App-nav'> 
        <Menu secondary stackable>
          <Menu.Item as={Link} to='home'>
            <Image src='/logo.png' size='small'/>
          </Menu.Item>
          
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
            as={Link} to='profile'
            name='profile'
            active={activeItem === 'profile'}
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
          <Button as={Link} to='login' >
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
          <Route path='/profile' component={Profile} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />

        </Switch>
      </div>

      
    )
  }
}