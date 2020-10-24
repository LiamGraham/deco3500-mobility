import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

class UserDisplay extends Component {
  constructor(props) {
    super(props) 
    console.log(props)
    console.log('constructing user Display')
  }

  render() {
    console.log('calling render')

    // return () => (<div>{style}<ModalExampleShorthand/></div>)
    
    
    return <div>{style}
      <Modal
        trigger={<Button>Match</Button>}
        open={this.props.open}
        header={`It's a match! ${this.props.id}`}
        content='Based on your preferences, we have matched you with this user. Do you want to collaborate?'
        actions={['No', { key: 'done', content: 'Yes', positive: true }]}
      />
    </div>
  }
}


// const ModalExampleShorthand = (id, open) => {
//   console.log(id, open)
// }

export default UserDisplay
