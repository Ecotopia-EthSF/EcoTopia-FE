import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import TransactionTable from '@/components/transaction/transaction-table';
import Button from '@/components/ui/button';
import { ethers } from 'ethers';
import ecoTopiaABI from '@/config/ecoTopiaABI';
import tusdABI from '@/config/tusdABI';

import Avatar from '@/components/ui/avatar';
import AuthorImage from '@/assets/images/author.jpg';

const tUSDContractAddress = '0xB579C5ba3Bc8EA2F5DD5622f1a5EaC6282516fB1';
const ecoTopiaContractAddress = '0x428590b0833FcA5d2949D88c8788d78726e11554';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const handleWithdraw = async () => {
    try {
      const { ethereum } = window;

      // if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum); // new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/Gl5dXu7YF2nbWXwr7Tw-44iZ1mw1RX3h");
      const signer = provider.getSigner();

      const ecoContract = new ethers.Contract(
        ecoTopiaContractAddress,
        ecoTopiaABI,
        signer
      );

      let p2eTx = await ecoContract.withdrawAlluo(tUSDContractAddress, 1);
      console.log('Withdrawing....', p2eTx.hash);

      let tx = await p2eTx.wait();

      // setMiningStatus(1)
      // } else {
      //setWalletError("Please install MetaMask Wallet.");
      // }
    } catch (error) {
      console.log('Error withdrawing', error);
      //setTxError(error.message);
    }
  };

  return (
    <>
      <NextSeo title="Ecotopia" description="Carbon ofsetting Defi protocol" />

      <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
        <LiquidityChart />
        <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
          <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
            <Avatar
              image={AuthorImage}
              alt="Author"
              className="mx-auto mb-6"
              size="lg"
            />
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              My Staked Balance
            </h3>
            <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              $10,86,000
            </div>
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              2.5 ton carbon offsetted
            </h3>
            <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              onClick={() => handleWithdraw()}
              className="mt-6 uppercase xs:mt-8 xs:tracking-widest xl:px-2 2xl:px-9"
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <TransactionTable />
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;
