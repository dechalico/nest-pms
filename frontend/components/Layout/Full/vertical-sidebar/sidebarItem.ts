import {
  LayoutDashboardIcon,
  BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  LoginIcon,
  MoodHappyIcon,
  ApertureIcon,
  UserPlusIcon,
  BuildingIcon,
  UsersIcon,
  FriendsIcon,
  BuildingHospitalIcon,
  AppsFilledIcon,
  ReceiptIcon,
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  BgColor?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Monitoring' },
  {
    title: 'Clients',
    icon: BuildingHospitalIcon,
    to: '/monitoring/clients',
  },
  {
    title: 'Principals',
    icon: AppsFilledIcon,
    to: '/monitoring/principals',
  },
  {
    title: 'Warranties',
    icon: ReceiptIcon,
    to: '/monitoring/warranty-types',
  },
  { header: 'Management' },
  {
    title: 'Offices',
    icon: BuildingIcon,
    to: '/management/offices',
  },
  {
    title: 'Users',
    icon: UsersIcon,
    to: '/management/users',
  },
  {
    title: 'Engineers',
    icon: FriendsIcon,
    to: '/management/engineers',
  },
  { header: 'Home' },
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    to: '/',
  },
  { header: 'ui' },
  {
    title: 'Alert',
    icon: AlertCircleIcon,
    to: '/ui-components/alerts',
  },
  {
    title: 'Button',
    icon: CircleDotIcon,
    to: '/ui-components/buttons',
  },
  {
    title: 'Cards',
    icon: BoxMultiple1Icon,
    to: '/ui-components/cards',
  },
  {
    title: 'Tables',
    icon: BorderAllIcon,
    to: '/ui-components/tables',
  },

  { header: 'Auth' },
  {
    title: 'Login',
    icon: LoginIcon,
    to: '/auth/login',
  },
  {
    title: 'Register',
    icon: UserPlusIcon,
    to: '/auth/register',
  },
  { header: 'Extra' },
  {
    title: 'Icons',
    icon: MoodHappyIcon,
    to: '/pages/icons',
  },
  {
    title: 'Sample Page',
    icon: ApertureIcon,
    to: '/pages/sample-page',
  },
];

export default sidebarItem;
