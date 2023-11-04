import React, { Fragment } from 'react'
import path from 'path'
import fs from 'fs/promises'

function DetailPage(props) {

    const { products } = props

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

export async function getStaticPaths(){

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonFile = await fs.readFile(filePath)
    const data = JSON.parse(jsonFile)

    const json = data.products

    return {
        paths: json.map((js)=>(
            {params: { id : js.id}}
        )),
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
    console.log(dataById)

    return {
        props: {
            products: dataById
        }
    }
}

export default DetailPage