import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { get_orders, edit_order } from '../api/orders';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast'
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Order } from "../Interfaces";

interface Props {
  results: Orders
}

const Orders = ({ results }: Props) => {

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders_list'],
    queryFn: get_orders
  })

  const queryClient = useQueryClient();

  const editOrderMutation = useMutation({

    mutationFn: edit_order,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order Delivered!")
    },
    onError: () => {
      toast.error("Error!")
    },
  });

  console.log("orer_seccion: ", orders)

  if (isError) return toast.error("Error!")
  if (isLoading) return <Loader />
  //if(editOrderMutation.isLoading) return <Loader />

  return (

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Order Id
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Delivered
            </th>
            <th scope="col" className="px-6 py-3">
              Delivered at
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-6 py-3">
              Total Pice
            </th>
            <th scope="col" className="px-6 py-3">
              More Details
            </th>
          </tr>
        </thead>        
        {results && results.orders.length > 0 ? (
          results && results.orders.map((item:any) => (
            <tbody key={item.id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox"
                      checked={item.is_delivered}
                      onClick={() => editOrderMutation.mutate(item.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.id}
                </th>
                <td className="px-6 py-4">
                  {item.user}
                </td>
                <td className="px-6 py-4">
                  {item.is_delivered}
                </td>
                <td className="px-6 py-4">
                  {item.delivered_at !== null ?
                    item.delivered_at.slice(0, 10) :
                    <p>false</p>
                  }
                </td>
                <td className="px-6 py-4">
                  {item.created_at.slice(0, 10)}
                </td>
                <td className="px-6 py-4">
                  ${(Number(item.total_price)).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <Link to={`/order/${item.id}`}>
                    See
                  </Link>
                </td>
              </tr>

            </tbody>       
          
          )) 
          ) : (
            orders && orders.map((item) => (
              <tbody key={item.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id="checkbox-table-search-1" type="checkbox"
                        checked={item.is_delivered}
                        onClick={() => editOrderMutation.mutate(item.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.id}
                  </th>
                  <td className="px-6 py-4">
                    {item.user}
                  </td>
                  <td className="px-6 py-4">
                    {item.is_delivered}
                  </td>
                  <td className="px-6 py-4">
                    {item.delivered_at !== null ?
                      item.delivered_at.slice(0, 10) :
                      <p>false</p>
                    }
                  </td>
                  <td className="px-6 py-4">
                    {item.created_at.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4">
                    ${(Number(item.total_price)).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/order/${item.id}`}>
                      See
                    </Link>
                  </td>
                </tr>
  
              </tbody>       
            
            )) 
            )
        }

      </table>
    </div>

  )
}

export default Orders