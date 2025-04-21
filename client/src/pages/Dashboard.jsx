import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBuisnessArticles,
  fetchTeslaArticles,
} from "../slice/ArticleSlice";
import LoaderComponent from "../components/LoaderComponent";
import toast from "react-hot-toast";
import {  checkAuth, setLoggedIn } from "../slice/authSlice";


export default function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { buisnessArticles, teslaArticles, buisnessStatus, teslaStatus } =
    useSelector((state) => state.articles);
    const {loggedIn}=useSelector(state=>state.auth)
  

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const latestBuisnessArticles = Array.isArray(buisnessArticles)
    ? buisnessArticles
        .filter((article) => new Date(article.publishedAt) >= sevenDaysAgo)
        .slice(0, 10)
    : [];

  const latestTeslaArticles = Array.isArray(teslaArticles)
    ? teslaArticles
        .filter((article) => new Date(article.publishedAt) >= sevenDaysAgo)
        .slice(10, 20)
    : [];


    const latestNews = Array.isArray(teslaArticles)
    ? teslaArticles
        .filter((article) => new Date(article.publishedAt) >= sevenDaysAgo)
        .slice(40,50)
    : [];

 

  useEffect( () => {
    dispatch(fetchBuisnessArticles());
    dispatch(fetchTeslaArticles());

    async function validAuth() {
      try {
        await dispatch(checkAuth()).unwrap();
        dispatch(setLoggedIn());
        
      } catch (error) {
        
        
        navigate('/');
      }
    }
    validAuth();

     
  }, [dispatch]);

  return (
    <>
      <div className="relative  bg-gradient-to-br from-orange-100 to-orange-200  mx-auto ">
       


        {/* Articles */}
        {/* // Latest News */}
        <div className="relative px-4 py-4 ">
          <h1 className="text-3xl font-bold mb-5 text-center">Latest News</h1>
         
          {buisnessStatus === "loading" ? (
            <LoaderComponent />
          ) : (
            
              <ArticleCard articles={latestNews} />
            
          )}
          
        </div>
        {/* Buisness news */}
        <div className=" px-4 py-4">
          <div className="flex flex-col  items-center">
              <h1 className="text-3xl font-bold mb-5">Buisness News</h1>
              <p className="h-0.5  bg-orange-500 rounded-sm"></p>
          </div>
          
          {buisnessStatus === "loading" ? (
            <LoaderComponent />
          ) : (
            
              <ArticleCard articles={latestBuisnessArticles} />
            
          )}
        </div>

        {/* EV Tesla news */}
        <div className="relative px-4 py-4">
          <h1 className="text-3xl font-bold mb-5 text-center">EV News</h1>
          {teslaStatus === "loading" ? (
            <LoaderComponent />
          ) : (
           
              <ArticleCard articles={latestTeslaArticles} />
           
          )}
        </div>
      </div>
    </>
  );
}
