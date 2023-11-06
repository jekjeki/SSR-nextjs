import React, { Fragment } from 'react'
import path from 'path'
import fs from 'fs/promises'

function DetailPage(props) {

    const { products } = props

    if(!products){
        return (
            <p>Loading</p>
        )
    }

  return (
    <div>
        <Fragment>
            <div>
                <div>
                    <p>{products.title}</p>
                </div>
                <div>
                    <p>{products.description}</p>
                </div>
            </div>
        </Fragment>
    </div>
  )
}

const getData = async () => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonFile = await fs.readFile(filePath)
    const data = JSON.parse(jsonFile)

    return data
}

export async function getStaticPaths(){

    const data = await getData()

    const id = data.products.map((da) => da.id)

    const idWithParams = id.map((pid) => ({params: {id : pid}}))

    // const json = data.products

    // return {
    //     paths: json.map((js)=>(
    //         {params: { id : js.id}}
    //     )),
    //     fallback: false
    // }

    return {
        paths: idWithParams,
        fallback: false
    }
}

export async function getStaticProps(context){
    const { params } = context

    const prodId = params.id 

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonFile = await fs.readFile(filePath)
    const data = JSON.parse(jsonFile)

    const dataById = data.products.find((da)=>da.id === prodId)

    if(!dataById){
        return {notfound: true }
    }

    return {
        props: {
            products: dataById
        }
    }
}

export default DetailPage