import { useEffect, useState } from "react";
import { account } from "../api/index";
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoad] = useState(true);
  useEffect(() => {
    account
      .profile("GET")
      .then((res) => res.json())
      .then((data) => {
        if (data?.username) {
          setUser(data);
        } else setUser(null);
      })
      .catch((err) => {
        setUser(null);
        console.log(err);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return { user, loading };
};
const useCore = () => {
  const [isVendor, setVendor] = useState(false);
  const [add, setAddress] = useState("");
  const [loading, setLoad] = useState(true);
  useEffect(() => {
    account.core
      .isVendor()
      .then((res) => res.json())
      .then((data) => {
        if (data?.type) if (data?.type === "vendor") setVendor(true);
        if (data?.address)
          if (data?.address === "" || data?.address === "Not Set");
          else setAddress(data?.address);
      })
      .catch((err) => {
        setVendor(false);
        console.log(err);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return { isVendor, add, loading };
};

export { useCore, useAuth };
