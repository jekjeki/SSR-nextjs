import React from 'react'

function UserIdPage(props) {
    console.log(props.id)
  return (
    <div>{props.id}</div>
  )
}

export default UserIdPage

export async function getServerSideProps(context){
    const { params } = context

    const userId = params.uid

    return {
        props: {
            id: 'usr-id'+userId
        }
    }
}
