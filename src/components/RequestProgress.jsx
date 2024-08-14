import React from "react";
import afterl from '/images/afterLogin.svg'
function RequestProgress() {
  return (
    <div className="py-24 px-4  w-auto  overflow-y-auto space-y-6">
      <div className="header grid grid-cols-1 gap-5">
        <h2 className="font-bold text-left text-3xl">
          We are currently processing <Loader /> your request for vendor account
          approval.
        </h2>
      </div>
      <div>
        <img src={afterl}/>
      </div>
      <p className="text-lg">This usually takes up to 24 hours. We will notify you the update via notification once your application is reviewed. You can setup your vendor account on approval.</p>
    </div>
  );
}
const Loader = () => {
  return (
    <span className="bg-default-green p-2 inline-flex gap-2 w-fit rounded-full">
      <span className="bounce h-3 w-3 bg-white rounded-full flex justify-center items-center"></span>
      <span className="bounce h-3 w-3 bg-white rounded-full flex justify-center items-center"></span>
      <span className="bounce h-3 w-3 bg-white rounded-full flex justify-center items-center"></span>
    </span>
  );
};
export default RequestProgress;
