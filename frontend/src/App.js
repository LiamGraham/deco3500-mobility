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

  setUser = (user) => {
    this.setState({ user })
  }

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
          {this.state.user ? 
            <>
              <p>Signed in as {this.state.user.username}</p>
              <Button onClick={() => {this.setUser(null)}} style={{ marginLeft: '0.5em' }}>
                Sign Out
              </Button>
            </>
            :
            <>
              <Button as={Link} to='login' >
                Log In
              </Button>
              <Button as={Link} to='signup' style={{ marginLeft: '0.5em' }}>
                Sign Up
              </Button>
            </> 
          }  
          </Menu.Item>
        </Menu.Menu>

        </Menu>

        <Switch>
          <Route exact path='/' render={(props) => (<Home {...props} user={this.state.user} setUser={this.setUser} />)} />
          <Route path='/home' render={(props) => (<Home {...props} user={this.state.user} setUser={this.setUser} />)} />
          <Route path='/explore' render={(props) => (<Explore {...props} user={this.state.user} setUser={this.setUser} />)} />
          <Route path='/collaborators' render={(props) => (<Collaborators {...props} user={this.state.user} setUser={this.setUser} />)} />
          <Route path='/profile' render={(props) => (<Profile {...props} user={this.state.user} setUser={this.setUser} />)} />
          <Route path='/about' render={(props) => (<About {...props} user={this.state.user} setUser={this.setUser} />)} />
          <Route path='/login' render={(props) => (<Login {...props} user={this.state.user} setUser={this.setUser} />)} />
          <Route path='/signup' render={(props) => (<Signup {...props} user={this.state.user} setUser={this.setUser} />)} />

        </Switch>
      </div>

      
    )
  }
}