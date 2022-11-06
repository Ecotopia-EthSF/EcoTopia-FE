import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from 'react-share';
import { Copy } from '../icons/copy';
import { Instagram } from '../icons/brands/instagram';
import { Twitter } from '../icons/brands/twitter';
import { Facebook } from '../icons/brands/facebook';
import { Telegram } from '../icons/brands/telegram';
import { useDrawer } from '@/components/drawer-views/context';
import cn from 'classnames';
import Scrollbar from '@/components/ui/scrollbar';

import { FlashIcon } from '@/components/icons/flash';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
import TransactCoin from '@/components/ui/transact-coin';
import WalletCard from '@/components/ui/wallet-card-two';
import ActiveLink from '@/components/ui/links/active-link';
import Button from '@/components/ui/button';
import Web3 from 'web3';
import ecoTopiaABI from '@/config/ecoTopiaABI';
import tusdABI from '@/config/tusdABI';
// import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ethers } from 'ethers';
import { useModal } from '@/components/modal-views/context';
//images
import AuthorImage from '@/assets/images/author.jpg';

interface Props {
  nftSlug?: string;
}
export default function ShareView({ nftSlug = '#' }: Props) {
  const nftUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}`;
  const { openModal } = useModal();
  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  let [_, copyToClipboard] = useCopyToClipboard();

  // const web3 = new createAlchemyWeb3("https://polygon-mumbai.g.alchemy.com/v2/Gl5dXu7YF2nbWXwr7Tw-44iZ1mw1RX3h");
  const web3 = new Web3(Web3.givenProvider || "https://www.leisurecreatures.com");
  // var contract = new web3.eth.Contract(CONTACT_ABI, CONTRACT_ADDRESS);
  

  const tUSDContractAddress = "0xB579C5ba3Bc8EA2F5DD5622f1a5EaC6282516fB1";
  // const tUSDContract = new web3.eth.Contract(tusdABI, tUSDContractAddress);
  const ecoTopiaContractAddress = "0x428590b0833FcA5d2949D88c8788d78726e11554";
  const ecoTopiaContract = new web3.eth.Contract(ecoTopiaABI, ecoTopiaContractAddress);

  const handleCopyToClipboard = () => {
    copyToClipboard(nftUrl);
    setCopyButtonStatus('Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };


  // Creates fund transfer transaction
  const handleDeposit = async () => {
    try {
      // const { mumbai } = window;
      // console.log('print eth: ', mumbai)

      // if (mumbai) {
        const provider = new ethers.providers.JsonRpcProvider();
        const signer = provider.getSigner();

        const ecoContract = new ethers.Contract(
          ecoTopiaContractAddress,
          ecoTopiaABI,
          signer
        );

        let p2eTx = await ecoContract.depositAlluo( tUSDContractAddress, 1);
        console.log("Staking....", p2eTx.hash);

        let tx = await p2eTx.wait();

        // setMiningStatus(1)
      // } else {
        //setWalletError("Please install MetaMask Wallet.");
      // }
    } catch (error) {
      console.log('Error minting character', error)
      //setTxError(error.message);
    }
  };




  //   // tUSDContract.methods.approve(ecoTopiaContractAddress, 1 * 10^6).send().then(() => {
  //     console.log("Here 1");
  //     ecoTopiaContract.methods.depositAlluo(tUSDContractAddress, 1).send(
  //       {from: "0x3Ac9cAaA74EBD4Cf18C242262Aa13f8262A022d5", value: 1 }, function(err, result) {
  //         // result is tx hash
  //         if (!err && result.length > 0) {
  //           console.log("WOHOO")
  //         } else {
  //           console.log("Error")
  //         }
  //       });
  //   // });
  // };




  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-7 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
      <div className="text-lg font-medium uppercase -tracking-wide text-gray-900 ltr:text-left rtl:text-right dark:text-white lg:text-xl">

        <Scrollbar style={{ height: 'calc(100% + 20px)' }}>
        <div className=" pb-5 ">
          <div className="my-16 mx-5 flex h-full flex-col justify-center rounded-lg  bg-transparent p-6 dark:bg-light-dark sm:mx-6 xl:my-0 xl:mx-0 xl:p-8">
            <h1 className="mb-6 text-center uppercase tracking-wider ">
            Deposit Confirmation
            </h1>
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
            You confirm that you are depositing on EcoTopia:
            </h3>
            <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]" style={{fontSize:"40px", paddingTop:"8%", paddingBottom:"8%", color:" #5F8BFC"}}>
              $80 USDC
            </div>
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              Every month, you will earn: 2.5% APY based on a 12-month period
            </h3>
            <div>
              <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />
              
              <Button
                size="large"
                shape="rounded"
                fullWidth={true}
                onClick={() => handleDeposit()}
                className="mt-6 uppercase xs:mt-8 xs:tracking-widest xl:px-2 2xl:px-9"
              >
                Confirm Deposit
              </Button>
            </div>
            <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />
  
          </div>
        </div>
      </Scrollbar>
      </div>

      {/* <div className="flex flex-wrap gap-2 pt-4 md:gap-2.5 xl:pt-5">
        <div className="product-share flex flex-shrink-0 flex-wrap items-center gap-2 md:gap-2.5">
          <TwitterShareButton url={nftUrl}>
            <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
              <Twitter className="h-5 w-5 lg:h-6 lg:w-6" />
            </span>
            <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
              Twitter
            </span>
          </TwitterShareButton>
          <FacebookShareButton url={nftUrl}>
            <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
              <Facebook className="h-5 w-5 lg:h-6 lg:w-6" />
            </span>
            <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
              Facebook
            </span>
          </FacebookShareButton>
          <TelegramShareButton url={nftUrl}>
            <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
              <Telegram className="h-5 w-5 lg:h-6 lg:w-6" />
            </span>
            <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
              Telegram
            </span>
          </TelegramShareButton>

          <LinkedinShareButton url={nftUrl}>
            <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
              <Instagram className="h-5 w-5 lg:h-6 lg:w-6" />
            </span>

            <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
              Linkedin
            </span>
          </LinkedinShareButton>
        </div>
        <button onClick={handleCopyToClipboard}>
          <span className="text-md flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-14 xl:w-14">
            <Copy className="h-4 w-4 lg:h-5 lg:w-5" />
          </span>
          <span className="mt-2 block text-xs -tracking-widest text-gray-600 dark:text-gray-400">
            {copyButtonStatus}
          </span>
        </button>
      </div> */}
    </div>
  );
}
