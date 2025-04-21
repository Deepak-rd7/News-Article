import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import NewsFeed from '../components/NewsFeed';
import { useSelector,useDispatch } from 'react-redux';
import { checkAuth, setLoggedIn } from '../slice/authSlice';
import { fetchBuisnessArticles,fetchTeslaArticles,fetchTechCrunchArticles, fetchGadgetsArticles } from '../slice/ArticleSlice';


export default function NewsFeedPage() {

    const {articleType}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { buisnessArticles, teslaArticles, techCrunchArticles,gadgetsArticles  } =
    useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchBuisnessArticles());
    dispatch(fetchTeslaArticles());
    dispatch(fetchTechCrunchArticles());
    dispatch(fetchGadgetsArticles());

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
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-10">{articleType.charAt(0).toUpperCase()+articleType.slice(1) } News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articleType==='buisness'&& <NewsFeed articles={buisnessArticles}/>}
            {articleType==='tesla'&& <NewsFeed articles={teslaArticles}/>}
            {articleType==='techCrunch'&& <NewsFeed articles={techCrunchArticles}/>}
            {articleType==='gadgets'&& <NewsFeed articles={gadgetsArticles}/>}
     </div>
       
    </>
  )
}
