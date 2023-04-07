import { useEffect, useState } from 'react';
import { PaperEmbeddedWalletSdk, UserStatus } from "@paperxyz/embedded-wallet-service-sdk";

export default function Dashboard() {

    const [sdk, setSdk] = useState()
    const [user, setUser] = useState({})

    const clientId = process.env.NEXT_PUBLIC_PAPER_KEY

    useEffect(() => {
        setSdk(new PaperEmbeddedWalletSdk({
            clientId: clientId,
            chain: 'Mumbai',
        }))
    }, [])


    useEffect(() => {
        getUserInfo()
    }, [sdk])

    async function getUserInfo() {
        if (sdk) {
            const result = await sdk.getUser();
            setUser(result)
        }
    }

    function click() {
        console.log(user)
    }


    return (
        <div>
            <p>Dashboard</p>
            <p>email: {user?.authDetails?.email || ""}</p>
            <p>address: {user?.walletAddress || ""}</p>
            <button onClick={click}>debug</button>
        </div>
    )
}