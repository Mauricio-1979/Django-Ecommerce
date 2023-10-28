import { useParams } from "react-router-dom"
import { solo_order } from "../api/orders"
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import Loader from "../components/Loader"
import { Order_items } from "../Interfaces";
import Logo from "../assets/logo.png"

const SoloOrder = () => {

  const { id } = useParams()

  const { data:order, isError, isLoading } = useQuery({
    queryKey: ['orders_usuario'],
    queryFn: () => solo_order(Number(id)),
  })


  if (isError) return toast.error("Error!")
  if (isLoading) return <Loader />
//<div className="mx-auto max-w-screen-xl px-4 lg:px-12"> after section
//className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">

      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Shipping address
            </h1>
            <div className="space-y-4 md:space-y-2"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name: {order.user}</label>
              </div>

              { order.shipping_address && order.shipping_address.address ? (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address: {order.shipping_address.address}
                </label>
              </div>) : (
                <p>No address</p>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {order.is_delivered ? (
                    <p>Yes</p>
                  ) : (
                    <p style={{ color: 'red' }}>Not Delivery</p>
                  )
                  }
                </label>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
              </div>
            </div>
          </div>

        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <h2 className="text-gray-600 text-xl font-bold mb-3 ml-4">Order {id}</h2>

          

          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="relative mt-5 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">

                <div className="flex items-center flex-1 space-x-4">
                  <h5>
                    <span className="text-gray-300 text-xl font-bold">
                      Products in you cart:
                    </span>
                  </h5>
                  <h5>
                    <span className="text-gray-300 text-xl font-bold">
                      Total: {order.total_price === null && "0"}{" "}
                      $ {order.total_price}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items && order.order_items.map((product: Order_items) => {
                      return (


                        <tr
                          key={product.id}
                          className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <th
                            scope="row"
                            className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            { product.image ? (
                              <img
                              src={`http://127.0.0.1:8000${product.image.replace('/media/', '/')}`}
                              alt={product.product}
                              className="w-auto h-8 mr-3"
                            />
                            ): (
                              <img className="w-8 h-8 mr-2" src={Logo} alt="" />
                            )
                            }                            

                            {product.product}
                          </th>
                          <td className="px-4 py-2">
                            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center space-x-3">

                              <div>
                                {
                                  product.quantity
                                }
                                <input
                                  type="number"
                                  id="first_product"
                                  className="hidden bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="1"
                                  required
                                />
                              </div>

                            </div>
                          </td>
                          <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ${product.price}
                          </td>

                          <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            $ {product.quantity !== undefined ? product.price * product.quantity : 0}
                          </td>
                        </tr>


                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          
        </div>
        <div className="w-32 px-4 lg:px-12">
          <p className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            Item: $ {order.total_price}
          </p>
        </div>
      </section>

    </>
  )
}

export default SoloOrder
