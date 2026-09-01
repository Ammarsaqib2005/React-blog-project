import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function postCard({ $id, title, featuredImage }) {
  return (
    <div>
      <Link to={`/post/${$id}`}>
        <div className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="w-full mb-4 overflow-hidden rounded-xl">
           <img src={appwriteService.getFileView(featuredImage)} 
           alt={title}
           className='w-full h-64 object-cover rounded-xl' 
           />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
      </Link>
    </div>
  );
}

export default postCard;
