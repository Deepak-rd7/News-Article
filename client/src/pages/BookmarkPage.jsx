import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setLoggedIn,checkAuth } from "../slice/authSlice";
import LoaderComponent from '../components/LoaderComponent'
import { getBookmarks, removeBoomark } from "../slice/BookmarkSlice";
import {  TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function BookmarksPage() {
  const dispatch=useDispatch();

const navigate=useNavigate();
  const {bookmarkedArticles}=useSelector(state=>state.bookmarks)

  
  
  async function removeuserBookmark(id) {
    try {
      const result=await dispatch(removeBoomark(id)).unwrap();
       
      dispatch(getBookmarks());
      
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    } 
  }

  useEffect(()=>{
       async function validAuth() {
              try {
                await dispatch(checkAuth()).unwrap();
                dispatch(setLoggedIn());
                
              } catch (error) {
              
                
                navigate('/');
              }
            }
            validAuth();

            dispatch(getBookmarks());
  },[dispatch])

  
  
  return (
    <div className="w-full mx-auto p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">📑 Bookmarked Articles</h1>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
  { bookmarkedArticles ? bookmarkedArticles.map((article,index)=>(<div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <img
        src={article.urlToImage}
        alt="article"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
         { article.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {article.description && article.description.slice(0,80)}...
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>🌐 Source:{article.source}</span>
         
        </div>
        <div className="mt-4 flex justify-between items-center">
          <a
            href={article.url}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more →
          </a>
          <button onClick={()=>removeuserBookmark(article._id)} className="text-red-500 hover:text-red-700 transition duration-200 text-sm flex justify-center items-center">
            <TrashIcon className=" h-4"/> Remove
          </button>
        </div>
      </div>
    </div>)) :  <h1 className="text-3xl font-bold mb-6 text-gray-800">No Bookmarks</h1>}

    </div>

  </div>
  
  );
}
