import { useState } from "react";
import Login from "@/auth/Login";
import Register from "@/auth/Register";

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left */}
      <div className="relative hidden md:block">
        <img
          className="w-full h-full object-cover shadow-2xl"
          src="https://thumbs.dreamstime.com/b/selecting-right-candidate-streamlining-hr-ai-powered-recruitment-streamlines-helping-select-faster-364478686.jpg"
          alt="Applicant Tracking System Illustration"
        />
        <div
          className="absolute inset-0 bg-black/60 flex flex-col 
          items-center justify-center text-white p-8"
        >
          <h2 className="text-4xl font-extrabold mb-2 text-center tracking-wider ">
            Applicant Tracking System
          </h2>
          <p className="text-base text-center max-w-md">
            Streamline your hiring process with smart candidate management and
            real-time collaboration.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-4">
          {isLogin ? (
            <>
              <Login />
              <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-cyan-500 hover:underline font-medium"
                >
                  Register
                </button>
              </p>
              <div className="flex gap-3 justify-center items-center py-4">
                <div className="bg-gray-900/40 h-[1px] w-20 px-1"></div>
                <span className="text-[13px] text-gray-800">
                  or Sign in with
                </span>
                <div className="bg-gray-900/40 h-[1px] w-20 px-1"></div>
              </div>

              <div className=" grid grid-cols-2 px-4 gap-2">
                <div
                  className="border border-black/15 p-2
                  flex gap-2 justify-center items-center  hover:scale-105 duration-500
                  cursor-pointer"
                >
                  <img
                    className="w-5"
                    src="https://img.icons8.com/?size=512&id=17949&format=png"
                  />
                  <span
                    className="text-gray-700 tracking-wider text-sm
                     font-medium"
                  >
                    Google
                  </span>
                </div>

                <div
                  className="border border-black/15 p-2
                  flex gap-2 justify-center items-center  hover:scale-105 duration-500
                  cursor-pointer"
                >
                  <span
                    className="text-gray-700 tracking-wider text-sm
                     font-semibold"
                  >
                    Linked
                  </span>

                  <img
                    className="w-4"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <Register setIsLogin={setIsLogin} />
              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-cyan-500 hover:underline font-medium"
                >
                  Log in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
