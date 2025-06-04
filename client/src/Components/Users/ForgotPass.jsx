import React, { useState } from 'react'



const ForgotPass = () => {

  const [email, setEmail] = useState("");


  // const forgotPassHandle = async (e) => {
  //   e.preventDefault;

  // }

  return (
    <div className="forgotpass-container min-h-screen flex justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-5"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">
          Forgot Password
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Check your email once the link is sent!
        </p>
        <div className="form-input">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="Enter registered email"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          SEND RESET LINK
        </button>
      </form>
    </div>

  )
}

export default ForgotPass
