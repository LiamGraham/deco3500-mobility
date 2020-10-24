import React from 'react'
import { Image, Item, Segment, Button, Comment, Form, Header } from 'semantic-ui-react'

const ProfileContainer = () => (
  <div>
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size='tiny' src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />

          <Item.Content>
            <Item.Header as='a'>Harvey Specter</Item.Header>
            <Item.Meta>Musician</Item.Meta>
            <Item.Description>I am an aspiring Jazz musician and keen to collaborate!</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>

    <Segment>
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
    </Segment>
  </div>
)

export default ProfileContainer