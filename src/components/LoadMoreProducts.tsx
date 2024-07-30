import { useEffect, useState } from "react"

export default function LoadMoreProducts({limit, skip}:{limit: number, skip: number}){
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState<any[]>([])
    const [count, setCount] = useState(0)


    async function fetchProducts(){
        try{
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${count*skip}`)
            const data = await response.json()
            if(data && data.products && data.products.length){
                setProducts(oldProducts => [...oldProducts, ...data.products])
                setIsLoading(false)
            }
            
        } catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
         fetchProducts()
    },[count])

    if(isLoading){
        return <div>
            Loading Products...
        </div>
    }
    return(<>
        <div className="grid grid-cols-5">
            {
                products && products.length?
                products.map(product=>{
                    return <div className="m-2 border-black border-2 flex flex-col items-center" key={product.id}>
                                <img 
                                src={product.thumbnail}
                                />
                                <span>{product.title}</span>
                            </div> 
                }): ""
            }
        </div>
        <div className="flex justify-center m-2">
            <button 
            className={count>=4? "border-black border-2 rounded-lg p-2 bg-slate-400 opacity-50 cursor-not-allowed":"border-black border-2 rounded-lg p-2 bg-slate-400"}
            onClick={()=>setCount(oldCount => oldCount+1)}
            disabled={count>=4}
            >Load more products</button>
        </div>
    </>
    )
}