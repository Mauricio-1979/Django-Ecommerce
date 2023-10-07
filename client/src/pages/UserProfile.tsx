import { useAuthStore } from "../store/auth";
import { Token } from "../Interfaces";
import jwt_decode from 'jwt-decode';
//import { Link, useNavigate } from "react-router-dom";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { edit_user } from "../api/users";
import { my_orders } from "../api/orders";
import Loader from "../components/Loader";

function UserProfile() {

  const [show, setShow] = useState(true)
  const [stateName, setStateName] = useState<string>('');
  const [stateLast_name, setStateLast_name] = useState<string>('');
  const [stateEmail, setStateEmail] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);


  const token: string = useAuthStore.getState().access;
  const tokenDecoded: Token = jwt_decode(token)
  const user_id = tokenDecoded.user_id;
  const avatar = tokenDecoded.avatar
  const email = tokenDecoded.email;
  const name = tokenDecoded.name;
  const last_name = tokenDecoded.last_name;

  useEffect(() => {
    if (token) {
      setStateName(name)
      setStateLast_name(last_name)
      setStateEmail(email)
      setImage(avatar)
    }
  }, [token])


  const queryClient = useQueryClient();

  const editUserMutation = useMutation({
    mutationFn: edit_user,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success("User update successfully")
      setShow(true)
    },
    onError: () => {
      toast.error("Error")
      setShow(true)
    }
  })

  const { data, isError, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: my_orders,
  })

  if (isError) return toast.error("Error!")
  if (isLoading) return <Loader />

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editUserMutation.mutate({
      id: user_id,
      name: stateName,
      last_name: stateLast_name,
      email: stateEmail,
      avatar: image
    })
  }



  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsHovered(false);
  };


  const removeImage = () => {
    setImage(null)
    setIsHovered(false)
  }

  return (

    <div className="flex justify-center pt-[100px]">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {show ? (
          <>
            <div className="flex flex-col items-center pb-10">
              <img className="w-24 h-24 mb-3 mt-5 rounded-full shadow-lg" src={filePreview || `http://localhost:8000${avatar}`} alt="Bonnie image" />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {email}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {name} {" "} {last_name}
              </span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <button onClick={() => setShow(false)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Edit Profile
                </button>

              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">Order ID</th>
                    <th scope="col" className="px-4 py-3">Email</th>
                    <th scope="col" className="px-4 py-3">Username</th>
                    
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">sdsd</th>
                    <td className="px-4 py-3">sdsdsd</td>
                    <td className="px-4 py-3">sdsdsd</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>

          </>
        ) : (
          <div className="p-11">
            <form onSubmit={handleSubmit}>
              <div className="p-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input
                  type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name..."
                  value={name}
                  onChange={(e) => setStateName(e.target.value)}
                />
                f</div>
              <div className="p-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input
                  type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name..."
                  value={last_name}
                  onChange={(e) => setStateLast_name(e.target.value)}
                />
              </div>

              <div className="p-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input
                  type="email" name="stateEmail" id="stateEmail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..."
                  value={stateEmail}
                  onChange={(e) => setStateEmail(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2 p-2">
                <div className="flex items-center justify-center w-full">
                  {image === null ? (
                    <label
                      htmlFor="dropzone-file"
                      className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg 
                    cursor-pointer bg-gray-40 ${isHovered ? "bg-gray-600" : "hover:bg-gray-600"
                        }`}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX.
                          800x400px)
                        </p>
                      </div>
                      <input
                        ref={inputRef}
                        type="file"
                        id="dropzone-file"
                        multiple={true}
                        onChange={handleFileChange}
                        className="absolute w-full h-[300px] opacity-0"
                      />
                    </label>
                  ) : (
                    <div>
                      <button
                        onClick={removeImage}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="defaultModal"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">
                          Close modal
                        </span>
                      </button>
                      <img
                        className="h-48 w-96"
                        src={filePreview || `http://localhost:8000${avatar}`}
                        alt="Imagen seleccionada"

                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex mt-4 space-x-3 md:mt-6">
                <button
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Save changes
                </button>

              </div>
            </form>
          </div>

        )
        }

      </div >
    </div >
  )
}

export default UserProfile