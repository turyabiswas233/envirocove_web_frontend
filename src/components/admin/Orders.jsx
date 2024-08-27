import React, { useEffect, useState } from "react";
import bell from "/images/icons/bell.svg";
function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Shakib Khan",
      text: "New message from Shakib",
    },
    {
      id: 2,
      name: "Turya Biswas",
      text: "2 messages from Turya",
    },
    {
      id: 3,
      name: "Shakib Khan",
      text: "New message from Shakib",
    },
    {
      id: 4,
      name: "Turya Biswas",
      text: "2 messages from Turya",
    },
    {
      id: 5,
      name: "Shakib Khan",
      text: "New message from Shakib",
    },
    {
      id: 6,
      name: "Turya Biswas",
      text: "2 messages from Turya",
    },
  ]);
  const [showNoti, setShowNoti] = useState(false);

  return (
    <div className="p-5 w-auto min-h-screen bg-bg-gray space-y-8 pb-32">
      {/* header */}
      <div className="pt-6 flex justify-between gap-5">
        <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4">
          Orders
        </h2>
        {/* notification panel */}
        <div
          className="p-3 w-fit h-fit rounded-full bg-white relative"
          onClick={() => setShowNoti((pre) => !pre)}
        >
          <img className="w-fit h-fit" width={75} height={75} src={bell} />
          {orders.length > 0 && (
            <div className="absolute top-1.5 right-2 bg-totamo p-1 rounded-full"></div>
          )}

          <div
            className="absolute top-full -left-52 w-64"
            style={{
              pointerEvents: showNoti ? "auto" : "none",
            }}
          >
            {orders.length > 0
              ? orders.map((od, i) =>
                  i < 8 ? (
                    <Message
                      key={od.id}
                      details={od}
                      id={i}
                      toggle={showNoti}
                    />
                  ) : null
                )
              : "Notification is empty!"}
          </div>
        </div>
      </div>

      {/* top-nav-buttons */}
      <div className="grid grid-cols-2 gap-5 font-semibold">
        <button className="bg-transparent text-black py-3 rounded-full focus:bg-default-green focus:text-white">{`Pending (${orders.length})`}</button>
        <button className="bg-transparent text-black py-3 rounded-full focus:bg-default-green focus:text-white">
          Completed
        </button>
      </div>
    </div>
  );
}
const Message = ({ details, id, toggle }) => {
  const [anime, setanime] = useState(false);

  useEffect(() => {
    setanime(toggle);
  }, [toggle]);
  return (
    <div
      className={`bg-white/30 backdrop-blur-md rounded-xl p-3 grid my-2 hover:bg-horizon/50 ease-in-out cursor-default transition-opacity duration-300 ${
        anime ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transitionDelay: `${anime ? id * 50 : 50 / (id + 1)}ms`,
      }}
    >
      <p className="text-lg text-default-gray font-semibold">{details?.name}</p>
      <p className="text-sm text-default-gray/80 font-normal">
        {details?.text}
      </p>
    </div>
  );
};
export default Orders;
