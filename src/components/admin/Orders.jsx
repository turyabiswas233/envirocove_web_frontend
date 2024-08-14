import React, { useState } from "react";
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
          {showNoti && (
            <div className="absolute top-full -left-52 w-64">
              {orders.length > 0
                ? orders.map((od, i) =>
                    i < 8 ? <Message key={od.id} details={od} /> : null
                  )
                : "Notification is empty!"}
            </div>
          )}
        </div>
      </div>

      {/* top-nav-buttons */}
      <div className="grid grid-cols-2 gap-5 font-semibold">
        <button className="bg-transparent text-black py-3 rounded-full focus:bg-default-green focus:text-white">{`Pending (${orders.length})`}</button>
        <button className="bg-transparent text-black py-3 rounded-full focus:bg-default-green focus:text-white">Completed</button>
      </div>
    </div>
  );
}
const Message = ({ details }) => {
  return (
    <div className="bg-white rounded-xl p-3 grid my-2 hover:bg-horizon transition-colors ease-in-out cursor-default">
      <p className="text-lg text-default-gray font-semibold">{details?.name}</p>
      <p className="text-sm text-default-gray/80 font-normal">
        {details?.text}
      </p>
    </div>
  );
};
export default Orders;
