import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import ListCard from '@/components/ui/list-card';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
// static data
import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const myDynamicNFTURL =
  'https://api.covalenthq.com/v1/80001/tokens/0x1a862a8e7f753fc5c8680cebf0c2b5e14f60f560/nft_metadata/4/?key=ckey_9f2b0a8385f5404faf4d9192e77';

export default function ProfileTab() {
  const [nfts, setNFTs] = useState('');

  useEffect(() => {
    const handleLoadingDynamicNFTs = async () => {
      axios.get(myDynamicNFTURL).then((res) => {
        const nfts = res.data;
        console.log(nfts);
        setNFTs(nfts);
      });
    };

    console.log(nfts);
    if (!nfts) handleLoadingDynamicNFTs().catch(console.error);
  });

  //

  return (
    <ParamTab
      tabMenu={[
        {
          title: 'Eco Dynamic NFTs',
          path: 'collection',
        },
        // {
        //   title: 'Portfolio',
        //   path: 'portfolio',
        // },
        // {
        //   title: 'History',
        //   path: 'history',
        // },
      ]}
    >
      <TabPanel className="focus:outline-none">
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4">
          {nfts?.data?.items?.map((nft) => (
            <CollectionCard
              item={nft.nft_data[0]}
              key={nft?.nft_data?.token_id ? nft?.nft_data?.token_id : 'a'}
            />
          ))}
        </div>
      </TabPanel>
      {/*       
      <TabPanel className="focus:outline-none">
        <div className="space-y-8 md:space-y-10 xl:space-y-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {authorWallets?.map((wallet) => (
              <ListCard item={wallet} key={wallet?.id} variant="medium" />
            ))}
          </div>
          <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
              Protocols
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {authorProtocols?.map((protocol) => (
                <ListCard item={protocol} key={protocol?.id} variant="large" />
              ))}
            </div>
          </div>
          <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
              Networks
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
              {authorNetworks?.map((network) => (
                <ListCard item={network} key={network?.id} variant="medium" />
              ))}
            </div>
          </div>
        </div>
      </TabPanel> */}
      <TabPanel className="focus:outline-none">
        <div className="space-y-8 xl:space-y-9">
          {/* <TransactionSearchForm /> */}
          <TransactionHistory />
        </div>
      </TabPanel>
    </ParamTab>
  );
}
