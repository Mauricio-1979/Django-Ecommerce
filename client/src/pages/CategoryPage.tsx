import { Link } from "react-router-dom"
import Logo from '../assets/logo.png';
import { useQuery } from "@tanstack/react-query";
import { get_category } from "../api/products";


const CategoryPage = () => {

  // const {data} = useQuery({
  //   queryKey: ['product'],
  //   queryFn: () => {
  //     return get_category
  //   }

  // })


  return (
    <div className="flex justify-center">
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16">

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/categories/OS`}>
            <img
              className="rounded-t-lg"
              src={Logo}
              alt=""
            />
          </Link>
          <div className="p-5 ">
            <Link to={`/categories/OS`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                OS
              </h5>
            </Link>
          </div>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/cate/Keyboards`}>
            <img
              className="rounded-t-lg"
              src={Logo}
              alt=""
            />
          </Link>
          <div className="p-5 ">
            <Link to={`/cate/Keyboards`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Keyboards
              </h5>
            </Link>
          </div>
        </div>

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/cate/Lang`}>
            <img
              className="rounded-t-lg"
              src={Logo}
              alt=""
            />
          </Link>
          <div className="p-5 ">
            <Link to={`/cate/Lang`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Lang
              </h5>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CategoryPage