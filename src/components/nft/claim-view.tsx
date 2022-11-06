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
import Image from '@/components/ui/image';
import { authorData } from '@/data/static/author';
//images
import AuthorImage from '@/assets/images/author.jpg';

interface Props {
  nftSlug?: string;
}
export default function ShareView({ nftSlug = '#' }: Props) {
  const nftUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}`;
  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(nftUrl);
    setCopyButtonStatus('Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-7 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
      <div className="text-lg font-medium uppercase -tracking-wide text-gray-900 ltr:text-left rtl:text-right dark:text-white lg:text-xl">

        <Scrollbar style={{ height: 'calc(100% + 20px)' }}>
        <div className=" pb-5 ">
          <div className="my-16 mx-5 flex h-full flex-col justify-center rounded-lg  bg-transparent p-6 dark:bg-light-dark sm:mx-6 xl:my-0 xl:mx-0 xl:p-8">
            <h1 className="mb-6 text-center uppercase tracking-wider ">
            CONGRATS ON YOUR FIRST STAKE 🎉  <br/>
            CLAIM YOUR NFT
            </h1>
   
            <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
                <Image
                src={authorData?.cover_image?.thumbnail}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                alt="Cover Image"
                />
            </div>
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              This NFT will evolve as you continue to Stake with Ecotopia
            </h3>
            <div>
              
              <Button
                size="large"
                shape="rounded"
                fullWidth={true}
                className="mt-6 uppercase xs:mt-8 xs:tracking-widest xl:px-2 2xl:px-9"
              >
                CLAIM NOW
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
