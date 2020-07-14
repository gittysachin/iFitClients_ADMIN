interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    name: 'Business Owners',
    url: '/manage/business-owners',
    icon: 'icon-user'
  },
  {
    name: 'Users',
    url: '/manage/users',
    icon: 'icon-user'
  },
  {
    name: 'Clients',
    url: '/manage/client-management',
    icon: 'icon-people'
  },
  {
    name: 'Coaches',
    url: '/manage/trainers-management',
    icon: 'icon-people'
  },
  {
    name: 'Nutrition',
    url: '/manage/nutrition/category',
    icon: 'icon-support'
  },
  {
    name: 'Workouts',
    url: '/manage/workout/category',
    icon: 'icon-fire'
  }
];
