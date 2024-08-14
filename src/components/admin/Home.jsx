import React, { useState } from "react";
import bell from "/images/icons/bell.svg";
import received from "/images/icons/received.svg";
import danger from "/images/icons/danger.svg";
import { Link } from "react-router-dom";
const HeroBox = ({ label, icon, number = 0, bg }) => {
  return (
    <div
      className={`h-fit px-4 flex py-5 items-start justify-between rounded-2xl text-white ${bg}`}
    >
      <div className="grid space-y-2">
        <p>{label}</p>
        <h1 className="my-2 text-4xl font-semibold">{number}</h1>
      </div>
      <img src={icon} width={40} alt="icon" />
    </div>
  );
};
function AdminHome() {
  const heroInfo = [
    {
      label: "Active",
      icon: received,
      number: 48,
      color: "bg-tBlack",
    },
    {
      label: "Stock out",
      icon: danger,
      number: 12,
      color: "bg-totamo",
    },
  ];
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

  const items = [
    {
      id: 120,
      title: "4 pcs 100 volt 2 amp Bridge rectified- 2W10",
      image: danger,
      price: 5173.25,
      sold: 52,
      stock: 35,
    },
    {
      id: 1020,
      title: "3 pcs 1000 volt 5 amp Bridge rectified- 2W100",
      image: received,
      price: 10173.25,
      sold: 22,
      stock: 57
    }
  ];
  return (
    <div className="p-5 w-auto min-h-screen bg-bg-gray space-y-8 pb-32">
      {/* header */}
      <div className="pt-6 flex justify-between gap-5">
        <h2 className="font-bold text-left text-3xl w-fit flex items-center gap-4">
          Products
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
      <div className="p-4 rounded-full bg-default-green text-white w-fit text-center font-semibold fixed right-5 bottom-24 z-20 shadow-lg shadow-default-green/40 hover:shadow-transparent hover:bg-green-500 transition-colors">
        <Link to={"/admin/addproduct"}>Add a Product</Link>
      </div>

      {/* main body */}
      <div className="grid grid-cols-2 gap-2">
        {heroInfo.map((ele, eid) => (
          <HeroBox
            key={eid}
            label={ele.label}
            icon={ele.icon}
            number={ele.number}
            bg={ele.color}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Product List</h2>
        <select className="text-lg bg-transparent border-none outline-none">
          <option value="active">Active</option>
        </select>
      </div>
      {items.map((it, id) => {
        return (
          <ItemCard
            key={id}
            id={id}
            title={it.title}
            image={it.image}
            price={it.price}
            sold={it.sold}
            stock={it.stock}
          />
        );
      })}
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

const ItemCard = ({ id, image, title, price, sold, stock }) => {
  return (
    <div className="rounded-2xl bg-white p-5 my-2 space-y-3">
      <div className="flex gap-5 justify-between">
        <img
          className="bg-gray-300 rounded-xl aspect-square object-cover p-2"
          src={image}
          width={100}
          height={100}
        />
        <div className="space-y-2">
          <p>{title}</p>
          <button className="font-medium text-base rounded-full bg-tBlack text-white py-2 px-5">
            Edit
          </button>
        </div>
      </div>
      <hr className="border-horizon/30" />
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2 space-y-3">
          <p>Revenue</p>
          <h2 className="text-3xl font-semibold text-title">
            <span className="text-default-green">৳</span> {price}
          </h2>
        </div>
        <div className="space-y-3">
          <p>Sold</p>
          <h2 className="text-3xl font-semibold text-title">{sold}</h2>
        </div>
        <div className="space-y-3">
          <p>In Stock</p>
          <h2 className="text-3xl font-semibold text-title">{stock}</h2>
        </div>
      </div>
    </div>
  );
};
export default AdminHome;
