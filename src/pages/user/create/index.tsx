import { NextPage } from "next";
import { Base } from '@/layouts/Base';

const CreateUser: NextPage = () => {
  return (
    <Base>
      <div className="mt-5 container mx-auto">
        <div className="bg-gray-50 shadow-sm rounded p-5">
          <h1 className='font-medium text-xl text-slate-700 mb-1'>Create new user</h1>
          <p className='font-thin'>This user management using React, NextJS and Redux</p>
          <div id="formArea" className="mt-5">
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username" />
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First name" />
            </div>
            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Last name" />
            </div>
            <button type="button" className="bg-emerald-400 hover:bg-emerald-500 focus:bg-emerald-600 px-3 py-2 rounded">Add new user</button>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default CreateUser;