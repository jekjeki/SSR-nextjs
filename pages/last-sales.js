import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

function LastSalesPage(props) {

    // const [isLoading, setLoading] = useState(false)
    const [sales, setSales] = useState(props.sales)

    const {data, error} = useSWR('https://nextjs-test-api-d2643-default-rtdb.firebaseio.com/sales.json')

    useEffect(()=>{
        if(data){
            const salesData = []

            for(const key in data){
                salesData.push({
                    id: key,
                    username: data[key].username, 
                    value: data[key].value  
                })
            }
            setSales(salesData)
        }
    }, [sales]);

    // useEffect(()=>{
    //     setLoading(true)
    //     fetch('https://nextjs-test-api-d2643-default-rtdb.firebaseio.com/sales.json')
    //     .then((res)=>res.json())
    //     .then((data)=>{
            
    //         const dataSales = []

    //         for(const key in data){
    //             console.log(key)
    //             dataSales.push({
    //                 id: key,
    //                 username: data[key].username,
    //                 value: data[key].value
    //             })
    //         }

    //         setSales(dataSales)
    //         setLoading(false)
    //     })
    // }, [])

    if(!data && !sales){
        return <p>
            Loading...
        </p>
    }

    if(error){
        return <p>No Data yet !</p>
    }

  return (
    <div>
        <ul>
            {
                sales.map((sa)=>(
                    <li key={sa.id}>{sa.username} - {sa.value}</li>
                ))
            }
        </ul>
    </div>
  )
}


export async function getStaticProps(){
    const response = await fetch('https://nextjs-test-api-d2643-default-rtdb.firebaseio.com/sales.json')
        
        const data = await response.json()
            
            const dataSales = []

            for(const key in data){ 
                console.log(key)
                dataSales.push({
                    id: key,
                    username: data[key].username,
                    value: data[key].value
                })
            }
        
        return {
            props: {
                sales: dataSales,
                revalidate: 10
            }
        }
}

export default LastSalesPage