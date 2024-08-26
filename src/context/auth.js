import { useEffect, useState } from "react";
import { account } from "../api/index";
export const useAuth = () => {
    const [user, setUser] = useState(null)
    useEffect(() => {


        account.profile('get').then(res => res.json())
            .then(data => {
                if (data.username) {
                    setUser(data)
                    console.log(data);
                }
                else setUser(null)
            }).catch(err => { setUser(null); console.log(err) });
    }, [])


    return [user ];
}
