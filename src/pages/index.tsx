import { User } from '@/interfaces/user.interface';
import { Base } from '@/layouts/Base';
import { AppDispatch, RootState } from '@/redux/store';
import { deleteUser, getAllUsers, getUserById } from '@/redux/users/user.slice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ModalProps {
  isShow: boolean,
  selectedUser: User | null,
  setShowModal: (value: boolean) => void
  handleSubmitDelete: (id: string) => void
}

const Modal: React.FC<ModalProps> = ({ isShow, selectedUser, setShowModal, handleSubmitDelete }) => {
  return !isShow ? null : (
    <div id="defaultModal" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] h-full bg-slate-600/20">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-start justify-between p-4 border-b rounded-t0">
                <h3 className="text-xl font-semibold text-gray-900">
                    Confirm?
                </h3>
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="defaultModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Are you sure want to delete this data ({selectedUser?.username})?
                </p>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                <button data-modal-hide="defaultModal" onClick={() => handleSubmitDelete(selectedUser?.id as string) } type="button" className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                <button data-modal-hide="defaultModal" onClick={() => setShowModal(false) } type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">Cancel</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { users, selectedUser } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteButton = (id: string): void => {
    dispatch(getUserById(id));
    setShowModal(true);
    console.log(selectedUser);
  };

  const handleEditButton = async (id: string): void => {
    await dispatch(getUserById(id));
    router.push(`/user/edit/${id}`);
  };

  const handleSubmitDelete = (id: string): void => {
    dispatch(deleteUser(id));
    dispatch(getAllUsers());
    setShowModal(false);
  }
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, users]);

  return (
    <Base>
      <div className="mt-5 container mx-auto">
        <div className="bg-gray-50 shadow-sm rounded p-5">
          <h1 className='font-medium text-xl text-slate-700 mb-1'>Simple user management</h1>
          <p className='font-thin'>This user management using React, NextJS and Redux</p>
          <div className="flex mt-5">
            <Link href="/user/create" className='bg-emerald-400 py-2 px-3 rounded text-white hover:bg-emerald-500 active:bg-emerald-600'>Add new user</Link>
          </div>
          
          <div className="relative overflow-x-auto mt-5 rounded">
              <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              No
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Username
                          </th>
                          <th scope="col" className="px-6 py-3">
                              First name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Last name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Action
                          </th>
                      </tr>
                  </thead>
              <tbody>
                {(users == null || users.length == 0) && 
                  <tr className="bg-white border-b">
                    <td colSpan={5} className="px-6 py-4 text-center">No data found</td>
                  </tr>
                }
                {users && users.map((item, index) => {
                  return (
                    <tr className="bg-white border-b" key={item.id}>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {index + 1}
                      </th>
                      <td className="px-6 py-4">
                          {item.username}
                      </td>
                      <td className="px-6 py-4">
                          {item.first_name}
                      </td>
                      <td className="px-6 py-4">
                          {item.last_name}
                      </td>
                      <td className="px-6 py-4">
                          <div className="inline-flex rounded-md shadow-sm" role="group">
                            <button onClick={() => handleEditButton(item.id)} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-yellow-300 border border-yellow-300 rounded-l-lg hover:bg-yellow-400 hover:text-gray-900 focus:z-10 focus:ring-2">
                              Edit
                            </button>
                            <button type="button" onClick={() => handleDeleteButton(item.id) } className="px-4 py-2 text-sm font-medium text-gray-200 bg-rose-500 border-t border-b rounded-r-lg border-rose-500 hover:bg-rose-600 hover:text-gray-200 focus:z-10 focus:ring-2">
                              Delete
                            </button>
                          </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
          </div>
        </div>
      </div>
      <Modal isShow={showModal} selectedUser={selectedUser} setShowModal={setShowModal} handleSubmitDelete={handleSubmitDelete} />
    </Base>
  )
}
