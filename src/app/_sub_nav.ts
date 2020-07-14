interface SubNavAttributes {
    [propName: string]: any;
}
interface SubNavWrapper {
    attributes: SubNavAttributes;
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

export interface SubNavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: SubNavData[];
    variant?: string;
    attributes?: SubNavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: SubNavWrapper;
}

export const SubnavItems: SubNavData[] = [
    {
        name: 'Progress',
        url: '/manage/client-management/edit',
        icon: 'icon-speedometer'
    },
    {
        name: 'Weigh Ins',
        url: '/manage/client-management/weigh-ins',
        icon: 'icon-user'
    },
    {
        name: 'Progress Pics',
        url: '/manage/client-management/progress-pics',
        icon: 'icon-people'
    },
    {
        name: 'Goals',
        url: '/manage/client-management/goals',
        icon: 'icon-people'
    },
    {
        name: 'Activity',
        url: '/manage/client-management/activity',
        icon: 'icon-support'
    },
    {
        name: 'Profile',
        url: '/manage/client-management/profile',
        icon: 'icon-user'
    }
];
