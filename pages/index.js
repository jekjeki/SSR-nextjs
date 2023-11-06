
import path from 'path'
import fs from 'fs/promises'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home(props) {

  const { products } = props
  const router = useRouter()

  return (
    <>
     <ul>
      {
        products.map((prod)=>(
          <li key={prod.id}><Link href={`/products/${prod.id}`}>{prod.title}</Link></li>
        ))
      }
     </ul>
    </>
  )
  
}

export async function getStaticProps(){
  
  const pathFile = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(pathFile)
  const data = JSON.parse(jsonData)

  if(data.products.length === 0){
    return{
      notFound: true,
      redirect: {
        destination: '/no-data'
      }
    }
  }

  return{
    props: {
      products: data.products 
    }
  }

}


