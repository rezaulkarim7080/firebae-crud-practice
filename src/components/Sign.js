import React from "react";


const Sign = () => {
  return (
    <div className="flex flex-col justify-center py-20 items-center ">
      <h1 className="text-3xl font-bold text-[#008f8c] py-5">Sign-in page</h1>
      <p> Email</p>
      <input type="email" className="border px-5 py-2 rounded" placeholder="email"/>
      <p> password</p>
      <input type="password" className="border px-5 py-2 rounded" placeholder="password"/>
      <button className="bg-[#dbf227] px-5 py-2 rounded-lg mt-5"> login </button>
    </div>
  );
};

export default Sign;
