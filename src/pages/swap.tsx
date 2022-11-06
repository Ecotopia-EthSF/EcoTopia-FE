import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import DashboardLayout from '@/layouts/_dashboard';
import Trade from '@/components/ui/trade';
import { useModal } from '@/components/modal-views/context';
import ListCard from '@/components/ui/list-card';
import Avalanche from '@/assets/images/avalanche.svg';
import Anchor from '@/assets/images/anchor.svg';
import Cappasity from '@/assets/images/cappasity.svg';
import PancakeBunny from '@/assets/images/pancake-bunny.svg';
import Ethereum from '@/assets/images/currency/ethereum.svg';
import { SearchIcon } from '@/components/icons/search';
const searchFilter = [
  { id: 1, name: 'POLYGON', logo: Avalanche },
  { id: 2, name: 'ETHEREUM', logo: Ethereum },
  { id: 3, name: 'OPTIMISM', logo: Cappasity },
];

const SwapPage: NextPageWithLayout = () => {
  let [toggleCoin, setToggleCoin] = useState(false);
  let [tellorValue, setTellorValue] = useState('');

  const { openModal } = useModal();
  return (
    <>
      <NextSeo title="Ecotopia" description="Carbon ofsetting Defi protocol" />
      <Trade>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div
            className={cn(
              'relative flex gap-3',
              toggleCoin ? 'flex-col-reverse' : 'flex-col'
            )}
          >
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-5 lg:mt-6">
              {searchFilter?.map((item) => (
                <div key={item?.id} role="button">
                  <ListCard
                    item={item}
                    className="shrink-0 rounded-full p-2 transition-transform hover:-translate-y-0.5 hover:bg-gray-50 focus:-translate-y-0.5 focus:bg-gray-50 ltr:pr-5 rtl:pl-5"
                  />
                </div>
              ))}
            </div>

            <CoinInput
              // label={'From'}
              exchangeRate={0.0}
              defaultCoinIndex={4}
              getCoinValue={(data) => setTellorValue(data.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 xs:gap-[18px]">
          {/* <TransactionInfo label={'Min. Received'} />
          <TransactionInfo label={'Rate'} />
          <TransactionInfo label={'Offered by'} /> */}
          <TransactionInfo label={'Current Annual Rate (APR):'} value={'7%'} />
          <TransactionInfo
            label={'Current Annual Carbon offset (Tonnes):'}
            value={(parseInt(tellorValue) * 7) / 100}
          />
          {/* <TransactionInfo label={'Network Fee'} />
          <TransactionInfo label={'Criptic Fee'} /> */}
        </div>
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
          onClick={() => openModal('SHARE_VIEW')}
          // onClick={() => openModal('WALLET_CONNECT_VIEW')}
        >
          DEPOSIT
        </Button>
      </Trade>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SwapPage;
