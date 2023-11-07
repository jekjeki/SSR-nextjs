import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

function TransactionPage(props) {
    
    const [transactions, setTransactions] = useState(props.transactiondatas)
    const {data, error} = useSWR('https://nextjs-test-api-d2643-default-rtdb.firebaseio.com/transaction.json')

    useEffect(()=>{

        if(data){
            let arrTrans = []
    
            for(const key in data){
                arrTrans.push({
                    id: key,
                    date: data[key].date,
                    status: data[key].status
                })
            }
    
            setTransactions(arrTrans)
        }
    }, []);

    if(!data && !transactions){
        return <p>Loading...</p>
    }

    if(error){
        return <p>No data yet</p>
    }

  return (
    <div>
        <ul>
        {
            transactions.map((tr)=>(
                <li key={tr.id}>{tr.id}</li>
            ))
        }

        </ul>
    </div>
  )
}

export async function getStaticProps(){

    const response = await fetch('https://nextjs-test-api-d2643-default-rtdb.firebaseio.com/transaction.json')

    const data = await response.json()

    const transactions = []

    for(const key in data){
        console.log(key)
        transactions.push({
            id: key,
            date: data[key].date,
            status: data[key].status
        })
    }

    return {
        props: {
            transactiondatas: transactions,
        },
        revalidate: 10
    }
}

export default TransactionPage