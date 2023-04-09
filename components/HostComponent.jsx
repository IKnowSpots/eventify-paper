
import Image from 'next/image'
import { github,facebook, twitter, linkedin, medium, avatar } from '../assets'

import { setAlert, setGlobalState, useGlobalState } from '../store'
// import { payToMint } from '../Adulam'

const HostComponent = () => {
  const [nfts] = useGlobalState('nfts')

  const onMintNFT = async () => {
    setGlobalState('loading', {
      show: true,
      msg: 'Minting new NFT to your account',
    })

    
    await payToMint()
      .then(() => setAlert('Minting Successful...', 'green'))
      .catch(() => setGlobalState('loading', { show: false, msg: '' }))
  }

  const onCreatedNFT = () => {
    setGlobalState('modal', 'scale-100')
  }


  return (
    <div
      className="bg-[url('https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png')]
        bg-no-repeat bg-cover"
    >
      <div className="flex flex-col justify-center items-center mx-auto py-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-5xl font-bold text-center">
            A.I Arts <br />
            <span className="text-gradient">NFTs</span> Collection
          </h1>

          <p className="text-white font-semibold text-sm mt-3">
            Mint and collect the hottest NFTs around.
          </p>

          <button
            className="shadow-xl shadow-black text-white
            bg-[#e32970] hover:bg-[#bd255f] p-2
            rounded-full cursor-pointer my-4"
            onClick={onCreatedNFT}
          >
            Mint Now
          </button>

          <a
            href="https://daltonic.github.io/"
            className="flex flex-row justify-center space-x-2 items-center
            bg-[#000000ad] rounded-full my-4 pr-3 cursor-pointer"
          >
            {/* <img
              className="w-11 h-11 object-contain rounded-full"
              src={avatar}
              alt="Adulam Logo"
            /> */}
            <Image src={avatar} className="w-11 h-11 object-contain rounded-full"/>

            <div className="flex flex-col font-semibold">
              <span className="text-white text-sm">0xf55...146a</span>
              <span className="text-[#e32970] text-xs">Ansh</span>
            </div>
          </a>

          <p className="text-white text-sm font-medium text-center">
            Gospel Darlington kick-started his journey as a software engineer in
            2016. <br /> Over the years, he has grown full-blown skills in
            JavaScript stacks such as <br /> React, ReactNative, VueJs, and now
            blockchain.
          </p>

          <ul className="flex flex-row justify-center space-x-2 items-center my-4">
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://github.com/Daltonic"
            >
                <Image src={github} className="w-7 h-7"/>
            </a>
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://www.linkedin.com/in/darlington-gospel-aa626b125"
            >
                <Image src={linkedin} className="w-7 h-7"/>
            </a>
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://fb.com/darlington.gospel01"
            >
              {/* <img className="w-7 h-7" src={facebook} alt="facebook" /> */}
              <Image src={facebook} className="w-7 h-7"/>
            </a>
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://twitter.com/idaltonic"
            >
                <Image src={twitter} className="w-7 h-7"/>
            </a>
            <a
              className="bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2"
              href="https://darlingtongospel.medium.com/"
            >
                <Image src={medium} className="w-7 h-7"/>
            </a>
          </ul>

          <div
            className="shadow-xl shadow-black flex flex-row
            justify-center items-center w-10 h-10 rounded-full
          bg-white cursor-pointer p-3 ml-4 text-black 
            hover:bg-[#bd255f] hover:text-white transition-all
            duration-75 delay-100"
          >
            <span className="text-xs font-bold">{nfts.length}/99</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostComponent