import React, { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css"; 
import "swiper/css/autoplay";
import toast from "react-hot-toast";
import { useSelector,useDispatch } from "react-redux";
import { addBookmark } from "../slice/BookmarkSlice";



export default function ArticleCard({ articles = [] }) {
  const [bookmarked, setBookmarked] = useState(false);

  const dispatch=useDispatch();

  async function adduserBookmark(title,description,url,urlToImage,source,publisedAt) {
   try {
    let result=await dispatch(addBookmark({title,description,url,urlToImage,source,publisedAt})).unwrap();
   
    toast.success(result.message);

   } catch (error) {
    toast.error(error.message);
   }

  }


  return (
    <>


    <div className="w-11/12 mx-auto">
    <Swiper
        slidesPerView={4} // Number of articles to show at once
        spaceBetween={20} // Space between slides
        loop={true} // Infinite loop
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto slide every 3 seconds
        modules={[Autoplay]} // Autoplay module
       
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <div
              key={article.index}
              className="bg-white h-[400px] rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition"
            >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover
                "
              />

              <div className="p-4 flex flex-col justify-between items ">
                <h3 className="font-bold text-base mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {article.description?.slice(0, 100)}...
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  className="text-blue-500 text-sm hover:underline "
                >
                  Read more
                </a>
              </div>

              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-orange-500"
                onClick={() => setBookmarked(!bookmarked)}
              >
                 <Bookmark onClick={()=>adduserBookmark(article.title,article.description,article.url,article.urlToImage,article.source.name,article.publisedAt)}/>
              
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      
    </>
  );
}
