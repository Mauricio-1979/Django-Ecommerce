
import { Outlet } from 'react-router-dom'
import Header from './Header';
import { Toaster } from 'react-hot-toast'
//import { useSearchStore } from '../store/search'
//import SearchResult from '../pages/SearchResult';
//import SearchResult from '../pages/SearchResult'

const Layout = () => {

  //const searchTerm = useSearchStore((state) => state.searchTerm)

  /*
  if(searchTerm !== ''){
    resultados
  } else {
    outlet
  }
  */
  return (
    <div>
      <Toaster />
      <Header />
      <div className='min-h-[1000px] bg-wite dark:bg-gray-900'>
        
            <Outlet/>
          
      </div>
    </div>
    
  )
}

export default Layout
