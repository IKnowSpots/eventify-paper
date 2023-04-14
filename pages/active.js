import { motion } from 'framer-motion';
import styles from '../styles/style';
import { staggerContainer } from '../utils/motion';
import InsightCard from '../components/InsightsCard';
import { TypingText, TitleText } from '../components/CustomTexts';
import { PaperEmbeddedWalletSdk } from '@paperxyz/embedded-wallet-service-sdk'

import { useEffect, useState } from 'react';
import { EventifyAddress, EventfiyAbi } from "../config"
import { ethers } from "ethers";
import axios from "axios";
import { socials } from '../constants';

import { footerVariants } from '../utils/motion';

const Active = () => {
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [sdk, setSdk] = useState()
    const [user, setUser] = useState({})


    console.log(items,"items loaded")
    useEffect(() => {
        fetch();
    }, []);

    const clientId = process.env.NEXT_PUBLIC_PAPER_KEY

    useEffect(() => {
      setSdk(
        new PaperEmbeddedWalletSdk({
          clientId: clientId,
          chain: 'Mumbai',
        }),
      )
    }, [])
  
    useEffect(() => {
      getUserInfo()
    }, [sdk])
  
    async function getUserInfo() {
      if (sdk) {
        const result = await sdk.getUser()
        setUser(result)
      }
    }

    // ---------

    async function generateLink(__tokenId) {
        const data = {
            contractId: "f5b49e5b-2027-44c8-892c-911a17dffbea",
            title: "Mumbai Example",
            description: "Describe your project *with Markdown!*",
            imageUrl: "https://unsplash.it/240/240",
            expiresInMinutes: 15,
            limitPerTransaction: 5,
            twitterHandleOverride: "string",
            successCallbackUrl: "string",
            redirectAfterPayment: false,
            cancelCallbackUrl: "string",
            walletAddress: user.walletAddress,
            email: user.authDetails.email,
            sendEmailOnCreation: false,
            requireVerifiedEmail: false,
            quantity: 1,
            metadata: {},
            mintMethod: {
              name: "buyTicket",
              args: {
                  _ticketId: __tokenId,
                  _host: user.walletAddress,
              },
              payment: {
                currency: "MATIC",
                value: "0.01 * 1"
              }
            },
            eligibilityMethod: {
              name: "string",
              args: {
                METHOD_ARG_NAME: "Unknown Type: mixed type"
              }
            },
            contractArgs: "string",
            feeBearer: "BUYER",
            hideNativeMint: false,
            hidePaperWallet: false,
            hideExternalWallet: false,
            hidePayWithCard: false,
            hidePayWithCrypto: false,
            hidePayWithIdeal: true,
            sendEmailOnTransferSucceeded: true
          };
          
          const config = {
            headers: {
              'Authorization': 'Bearer 893094e5-63fa-4904-ae34-57fda185af04',
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          };
          
          axios.post('https://withpaper.com/api/2022-08-12/checkout-link-intent', data, config)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
    }

    // ---------


    const INFURA_ID = process.env.NEXT_PUBLIC_INFURA

    const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/${INFURA_ID}`)
        
    provider.once('purchased', () => {
        console.log('a tx just occurred')
        // bridge(host, owner, tokenUri)
    })

    async function fetch() {
        const contract = new ethers.Contract(
            EventifyAddress,
            EventfiyAbi,
            provider
        );
        
        const data = await contract.unverifiedEvents();
        const itemsFetched = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await contract.uri(i.tokenId.toString());
                console.log(tokenUri)
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatEther(i.price);
                let item = {
                    price,
                    name: meta.data.name,
                    cover: meta.data.cover,
                    description: meta.data.description,
                    date: meta.data.date,
                    venue: meta.data.venue,
                    supply: i.supply.toNumber(),
                    tokenId: i.tokenId.toNumber(),
                    remaining: i.remaining.toNumber(),
                    host: i.host,
                    buyLink: i.buyLink.toString(),
                };
                return item;
            })
        );

        setItems(itemsFetched);
        // console.log(itemsFetched);
        setLoaded(true);
    }


    function click() {
        generateLink(2)
        console.log('clicked')
    }


    return(
      <div>
        

        <section className={`sm:p-16 xs:p-8 px-10 py-12 relative z-10 bg-[#151c25] `}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto flex flex-col`}
        >
                      <div className="gradient-04 z-0" />

          <TypingText title="| Insight" textStyles="text-center" />
          <TitleText title={<>Insight about events</>} textStyles="text-center" />
          <div className="mt-[50px] flex flex-col gap-[30px]">
                <button onClick={click}>debug</button>

            {items.map((item,i) =>{
                return(
                    
                    <InsightCard 
                    key={i}
                    price={item.price}
                    name={item.name}
                    cover={item.cover}
                    date={item.date}
                    venue={item.venue}
                    theme={item.theme}
                    tokenId={item.supply}
                    supply={item.supply}
                    remaining={item.remaining}
                    description={item.description}
                    host={item.host}
                    buyLink={item.buyLink}
                    />
                )
            })}
          </div>
        </motion.div>

      </section>
      <div className='bg-[#151c25]'>

      <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white">
          Book your Tickets
        </h4>
        <button type="button" className="flex items-center h-fit py-4 px-6 bg-[#8A42D8] rounded-[32px] gap-[12px]">
          <img
            src="/headset.svg"
            alt="headset"
            className="w-[24px] h-[24px] object-contain"
          />
          <span className="font-normal text-[16px] text-white">
            Book Now
          </span>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white">
            EVENTIFY
          </h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2023 Eventify. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
      </div>
      </div>
      
    )
}

export default Active