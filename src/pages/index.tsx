import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import TransactionTable from '@/components/transaction/transaction-table';

import Avatar from '@/components/ui/avatar';
import AuthorImage from '@/assets/images/author.jpg';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  return (
    <>
      <NextSeo
        title="Ecotopia"
        description="Carbon ofsetting Defi protocol"
      />

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
              My Balance
            </h3>
            <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
              $10,86,000
            </div>
            <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
              25 carbon offsetted
            </h3>
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
