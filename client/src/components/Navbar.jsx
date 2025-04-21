import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, LogOut, ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setLoggedOut } from "../slice/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropDown, setDropdown] = useState(false);

  const { loggedIn } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    dispatch(setLoggedOut());
    navigate("/");
   
    toast.success("LoggedOut Successfully");
  }

  return (
    <div className="relative  mx-auto  px-5 py-4 border-b-2  flex justify-between ">
      <div className="flex flex-col items-center">
        <h3 className="font-semibold text-3xl text-black">The News App</h3>
        <p className="h-0.5 w-1/2 bg-orange-500 rounded-sm"></p>
      </div>

      <div className="flex gap-3 mt-1">
        <ul className="flex gap-3 text-lg font-bold">
          <li className="hover:cursor-pointer hover:text-orange-500" onClick={()=>navigate('/dashboard')}>Home</li>
          <li className="hover:cursor-pointer hover:text-orange-500">About</li>
          <li className="hover:cursor-pointer hover:text-orange-500">
            Contact
          </li>
          {loggedIn && (
            <div className="relative">
              <div className="flex items-center">
                <li
                  className="hover:cursor-pointer  hover:text-orange-500"
                  onClick={() => {
                    setDropdown(!dropDown);
                  }}
                >
                  Category
                </li>
                {dropDown ? (
                  <ArrowUp
                    className={`text-gray-400 h-4 w-4 mt-1.5 hover:cursor-pointer`}
                    onClick={() => {
                      setDropdown(false);
                    }}
                  />
                ) : (
                  <ArrowDown
                    className={`text-gray-400 h-4 w-4 mt-1.5 hover:cursor-pointer`}
                    onClick={() => setDropdown(true)}
                  />
                )}
              </div>

              {dropDown && (
                <div className="absolute top-8 left-0 bg-white shadow-lg p-4 rounded-lg w-48 z-20">
                  <ul>
                    <Link to={'/newsfeed/buisness'}>
                      {" "}
                      <li className="text-gray-700 mb-2 hover:text-orange-500 cursor-pointer"  onClick={() => {
                      setDropdown(false);
                    }}>
                        Business
                      </li>
                    </Link>

                    <Link to={'/newsfeed/tesla'}>
                      <li className="text-gray-700 mb-2 hover:text-orange-500 cursor-pointer"  onClick={() => {
                      setDropdown(false);
                    }}>
                        EVs/Tesla
                      </li>
                    </Link>
                    <Link to={'/newsfeed/techCrunch'}>
                      <li className="text-gray-700 mb-2 hover:text-orange-500 cursor-pointer"  onClick={() => {
                      setDropdown(false);
                    }}>
                        TechCrunch
                      </li>
                    </Link>
                    <Link to={'/newsfeed/gadgets'}>
                      <li className="text-gray-700 mb-2 hover:text-orange-500 cursor-pointer"  onClick={() => {
                      setDropdown(false);
                    }}>
                        Gadgets
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>

     
      <div className="relative flex gap-4 text-left">
        <div className="group">
          
          {!loggedIn && <div className="" onClick={() => navigate("/signup")}>
            <CircleUserRound className="h-10 w-7 hover:cursor-pointer hover:text-orange-400" />
          </div>}
        </div>

        {loggedIn && (
          <div className="relative group text-left space-x-4">
            <Bookmark className="h-10 w-7 hover:cursor-pointer hover:text-orange-400" onClick={()=>navigate('/bookmarks')}/>
            <div className="invisible absolute z-50 top-full right-5 font-bold   px-1 text-sm py-0.5 rounded-sm  w-[105px]   text-white  bg-black opacity-70 group-hover:visible transition-all duration-100 ">
              <p>View bookmarks</p>
            </div>
          </div>
        )}

        {loggedIn && (
          <div className="relative group text-left space-x-4">
            <LogOut
              className="h-10 w-7 hover:cursor-pointer hover:text-orange-400"
              onClick={handleLogout}
            />
            <div className="invisible absolute z-50 top-full right-5 font-bold   px-1 text-sm py-0.5 rounded-sm  w-[50px]   text-white  bg-black opacity-70 group-hover:visible transition-all duration-100 ">
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
