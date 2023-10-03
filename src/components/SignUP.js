import React from 'react';



const SignUP = () => {
    return (
     
           <div className="flex flex-col justify-center py-20 items-center ">
      <h1 className="text-3xl font-bold text-[#f2668b] py-5">This is Sign-Up page</h1>
      <p> Email</p>
      <input type="email" className="border px-5 py-2 rounded" placeholder="email"/>
      <p> password</p>
      <input type="password" className="border px-5 py-2 rounded" placeholder="password"/>
      <button href="/src/components/Sign.js" className="bg-[#f2668b] px-5 py-2 rounded-lg mt-5"> Sign-up</button>
    </div>
       
    );
};

export default SignUP;