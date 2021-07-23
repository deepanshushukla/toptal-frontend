import {
    UserOutlined,
    HomeOutlined
} from '@ant-design/icons';

import { DASHBOARD,USERS, NAVIGATION_PATH } from 'constants/navigationPath';
import {ADMIN, CLIENT, REALTOR} from './userRoles';

export const INAPP_NAVIGATION_ITEMS = [
    { key: NAVIGATION_PATH[DASHBOARD].key, label: 'Dashboard',roles: [ADMIN, CLIENT, REALTOR], path: NAVIGATION_PATH[DASHBOARD].path,icon: HomeOutlined },
    { key: NAVIGATION_PATH[USERS].key, label: 'Users',  roles: [ ADMIN ], path: NAVIGATION_PATH[USERS].path , icon: UserOutlined},
];