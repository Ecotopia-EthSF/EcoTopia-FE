import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import AnchorLink from '@/components/ui/links/anchor-link';
import Button from '@/components/ui/button';
import NotificationCard, {
  NotificationCardProps,
} from '@/components/ui/notification-card';

//images
import User1 from '@/assets/images/avatar/8.jpg';
import User2 from '@/assets/images/avatar/9.jpg';
import User3 from '@/assets/images/avatar/10.jpg';
import User4 from '@/assets/images/avatar/11.jpg';

const notifications = [
  {
    id: 1,
    type: 'offsetted',
    actor: {
      name: 'Shradzz',
      avatar: User1,
    },
    time: 'Just Now',
    url: '',
    notifier: '1 ton',
  },
  {
    id: 2,
    type: 'offsetted',
    actor: {
      name: 'RichExplorer',
      avatar: User2,
    },
    time: '10 minutes ago',
    url: '#',
    notifier: '1 ton',
  },
  {
    id: 3,
    type: 'offsetted',
    actor: {
      name: 'Mkkk',
      avatar: User3,
    },
    time: '20 minutes ago',
    url: '#',
    notifier: '2 ton',
  },
  {
    id: 4,
    type: 'offsetted',
    actor: {
      name: 'Debstep',
      avatar: User4,
    },
    time: '30 minutes ago',
    url: '#',
    notifier: '5 ton',
  },
];

const NotificationPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Ecotopia" description="Carbon ofsetting Defi protocol" />
      <div className="mx-auto w-[660px] max-w-full">
        <div className="mb-7 flex items-center justify-between gap-6">
          <h2 className="text-center text-lg font-medium text-gray-900 dark:text-white sm:text-xl lg:text-2xl">
            Feed
          </h2>
          <Button
            color="white"
            variant="transparent"
            size="mini"
            shape="rounded"
          ></Button>
        </div>

        {notifications.map((notification) => {
          const notificationItem = notification as NotificationCardProps;
          return (
            <NotificationCard key={notification.id} {...notificationItem} />
          );
        })}
      </div>
    </>
  );
};

NotificationPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default NotificationPage;
