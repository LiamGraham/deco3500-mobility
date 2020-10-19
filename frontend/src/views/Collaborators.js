import React, { Component } from 'react'
import UserProfile from 'react-user-profile'
// import Overview from 'react-user-profile'

class App extends Component {
  render() {
    const photo = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    const userName = 'Harvey Specter'
    const location = 'New York, USA'

    const comments = [
      {
        id: '1',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
        userName: 'Julia Ross',
        content: 'Want to collaborate?',
        createdAt: 1543858000000
      }
    ]

    return (
      <div style={{ margin: '0 auto', width: '100%'}}>
        <UserProfile photo={photo} userName={userName} location={location} initialLikesCount={121} initialFollowingCount={723} initialFollowersCount={4433} initialComments={comments} />

      <div
      className="video"
      style={{
        position: "relative",
        paddingBottom: "56.25%" /* 16:9 */,
        paddingTop: 25,
        height: 0
      }}
      >
      <iframe
        style={{
          position: "absolute",
          top: 50,
          left: 400,
          width: "50%",
          height: "50%"
        }}
        src={"https://www.youtube.com/embed/yIujo65g0wU"}
        frameBorder="20"
      />
      </div>
    </div>

    )
  }
}

export default App
