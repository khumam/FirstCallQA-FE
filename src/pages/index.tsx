import { User } from '@/interfaces/user.interface';
import { Base } from '@/layouts/Base';
import { AppDispatch, RootState } from '@/redux/store';
import { getAllUsers } from '@/redux/users/user.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const users: User[] | null = useSelector((state: RootState) => state.userReducer.users);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Base>
      <div className="mt-5 container mx-auto">
        <div className="bg-gray-50 shadow-sm rounded p-5">
          <h1 className='font-medium text-xl text-slate-700 mb-1'>Simple user management</h1>
          <p className='font-thin'>This user management using React, NextJS and Redux</p>
          <div className="flex mt-5">
            <button className='bg-emerald-400 py-2 px-3 rounded text-white hover:bg-emerald-500 active:bg-emerald-600'>Add new user</button>
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
                          Action
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              </table>
          </div>
        </div>
      </div>
    </Base>
  )
}
