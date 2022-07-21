import React, { useEffect, useState } from "react";
import { baseurl } from "../App";
import axios from "axios";

const Profile = () => {
  const [profile, setprofile] = useState({});
  useEffect(() => {
    axios.get(`${baseurl}/account/profile/`).then((res) => {
      console.log(res.data);
      setprofile(res.data);
    });
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                  {`${profile.first_name} ${profile.last_name}`}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base">
                  <span className="font-bole">role : </span> {profile.role}
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4 flex flex-col items-center justify-center mt-auto">
                {/* <span className="font-bold">
                  Date Joined : {profile.date_joined.split("T")[0]}{" "}
                </span> */}
                <span className="font-bold">
                  {" "}
                  Username : {profile.username}
                </span>
                <span className="font-bold"> Email {profile.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
