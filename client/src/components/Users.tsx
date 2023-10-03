import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { get_users, delete_user } from '../api/users';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast'
import Loader from "./Loader";
import { User } from "../Interfaces";

interface Props {
  results: any
}

const Users = ({results}: Props) => {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['users'],
    queryFn: get_users
  })

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({

    mutationFn: delete_user,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Product delete Successfully")
    },
    onError: () => {
      toast.error("Error!")
    },
  });
  
  if(isError) return toast.error("Error!")
  if(isLoading) return <Loader />
  if(deleteUserMutation.isLoading) return <Loader />

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">User ID</th>
            <th scope="col" className="px-4 py-3">Email</th>
            <th scope="col" className="px-4 py-3">Name</th>
            <th scope="col" className="px-4 py-3">Last Name</th>
            <th scope="col" className="px-4 py-3 lex items-center justify-center gap-4">Actions</th>
          </tr>
        </thead>

        {results && results?.users?.length > 0 ? (
          <>
          {results && results.users.map((user: User) =>(

          <tbody>
            <tr className="border-b dark:border-gray-700">
              <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.last_name}</td>
              <td className="px-4 py-3 flex items-center justify-center gap-4">
                <BsFillTrashFill size={22} 
                  onClick={() => deleteUserMutation.mutate(user.id)}
                  className="text-red-300 cursor-pointer"/>
                <AiFillEdit size={22} className="text-green-300 cursor-pointer"/>
              </td>
            </tr>
        </tbody>
          ))}
          </>
        ) : (
          <tbody>
          {data && data?.map((user: User) =>(
            <tr className="border-b dark:border-gray-700">
              <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}</th>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.last_name}</td>
              <td className="px-4 py-3 flex items-center justify-center gap-4">
                <BsFillTrashFill size={22} 
                  onClick={() => deleteUserMutation.mutate(user.id)}
                  className="text-red-300 cursor-pointer"/>
                <AiFillEdit size={22} className="text-green-300 cursor-pointer"/>
              </td>
            </tr>
          ))}
        </tbody>
        )}
        
      </table>
    </div>
  )
}

export default Users