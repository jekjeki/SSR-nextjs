import React from 'react'

function ProfilePage(props) {

    const { username } = props 

  return (
    <div>{username}</div>
  )
}

export default ProfilePage

export async function getServerSideProps(context){
    return {
        props: {
            username: 'Max'
        }
    }
}