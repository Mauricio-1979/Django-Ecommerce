import { search_prod } from "../api/products"
import { useQuery } from "@tanstack/react-query"
import { useSearchStore } from "../store/search"
import ProductCard from "../components/ProductCard"
import { Product } from "../Interfaces"

const SearchResult = () => {

  const searchTerm = useSearchStore((state) => state.searchTerm)

  const {data} = useQuery({
    queryKey: ['product', searchTerm],
    queryFn: () => {
      if(searchTerm){
        return search_prod(searchTerm)
      }

      return {product: []}
    }
  })
  

  return (
    <>
      <div className="flex justify-center" >
        <div
          className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16"
          >   
          { data && data.product.map((product: Product) => (
          <ProductCard product={product} />
          ))}
        </div>
      </div> 
    </>
  )
}

export default SearchResult