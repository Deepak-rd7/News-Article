import { Bookmark } from "lucide-react";
import React, { useEffect, useState } from "react";
import { addBookmark } from "../slice/BookmarkSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import LoaderComponent from "./LoaderComponent";

export default function NewsFeed({ articles = [] }) {
  const [allArticles, setAllArticles] = useState([]);
   const [itemstoView, setItemstoView] = useState(10);
  const [visibleData, setVisibledata] = useState([]);

  
  
  useEffect(() => {
    setAllArticles(articles);
    setVisibledata(articles.slice(0, 10));
  }, [articles]);

  function handleViewmore() {
    setItemstoView(itemstoView + 10);
    
    
    
    setVisibledata(allArticles.slice(0, itemstoView));
  }

  const dispatch = useDispatch();

  async function adduserBookmark(
    title,
    description,
    url,
    urlToImage,
    source,
    publisedAt
  ) {
    try {
      let result = await dispatch(
        addBookmark({ title, description, url, urlToImage, source, publisedAt })
      ).unwrap();

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {visibleData ? (
        visibleData.map((article, index) => (
          <div key={index} className=" p-4">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
              <img
                src={article.urlToImage}
                alt="News Image"
                className="w-full h-48 object-cover"
                onClick={() => window.open(article.url, "_blank")}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-700 text-sm mb-3">
                  {article.description}...
                </p>
                <div className="flex justify-between gap-3">
                  <p className="text-gray-800 text-sm font-medium">
                    Published: {article.publishedAt.split("T")[0]}
                  </p>
                  <p className="text-gray-800 text-sm font-medium">
                    Source:{article.source.name}
                  </p>
                  <p className="text-gray-800 text-sm font-medium">
                    Author:{article.author}
                  </p>
                  <Bookmark
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      adduserBookmark(
                        article.title,
                        article.description,
                        article.url,
                        article.urlToImage,
                        article.source.name,
                        article.publisedAt
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <LoaderComponent />
      )}
      {itemstoView < allArticles.length && (
        <div className="flex flex-col border-black justify-center items-center m-10">
          <h1
            className="text-xl hover:border-b hover:border-black font-bold transition-all duration-300 text-orange-600 hover:cursor-pointer"
            onClick={handleViewmore}
          >
            View more
          </h1>
        </div>
      )}
    </>
  );
}
