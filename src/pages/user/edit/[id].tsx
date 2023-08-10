/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import { Base } from '@/layouts/Base';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import { getUserById, setUpdatePayload, updateUser } from "@/redux/users/user.slice";
import { useRouter } from "next/router";

const CreateUser: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {isLoading, errors, isRedirectUpdate, selectedUser} = useSelector((store: RootState) => store.userReducer);
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState<string>(selectedUser?.first_name as string);
  const [lastName, setLastName] = useState<string>(selectedUser?.last_name as string);
  
  const handleSubmit = () => {
    const payload = {
      id, 
      first_name: firstName,
      last_name: lastName
    }
    dispatch(setUpdatePayload(payload));
    dispatch(updateUser());
  }

  useEffect(() => {
    dispatch(getUserById(id as string));
    if (errors == null && isRedirectUpdate) {
      router.push("/");
    }
  }, [id, errors, isRedirectUpdate]);
  
  return (
    <Base>
      <div className="mt-5 container mx-auto">
        <div className="bg-gray-50 shadow-sm rounded p-5">
          <h1 className='font-medium text-xl text-slate-700 mb-1'>Update user</h1>
          <p className='font-thin'>This user management using React, NextJS and Redux</p>
          {
            errors &&
            <div id="errorArea" className="mt-5">
              <div className="bg-rose-100 p-5 rounded">
                {errors && errors.map((item, index) => {
                  return (
                    <p key={item} className="font-light text-sm">- {item}</p>
                  );
                })}
              </div>
            </div>
          }
          {
            !isLoading && 
            <div id="formArea" className="mt-5">
              <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                  <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First name" onChange={(event) => setFirstName(event.target.value)} value={firstName}/>
              </div>
              <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                  <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last name" onChange={(event) => setLastName(event.target.value)} value={lastName} />
              </div>
              {isLoading
                ? <button type="button" disabled className="text-white bg-emerald-300  px-3 py-2 rounded">Loading</button>
                : <button type="button" className="text-white bg-emerald-400 hover:bg-emerald-500 focus:bg-emerald-600 px-3 py-2 rounded" onClick={() => handleSubmit() }>Update user</button>
              }
            </div>
          }
        </div>
      </div>
    </Base>
  );
}

export default CreateUser;