import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'


export const SidebarData = [
    [ //student
        {
            title: 'ThomCare Homepage',
            path: '/',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Control Panel',
            path: '/controlpanel',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'My Requests',
            path: '/my-requests',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Downloadable Forms',
            path: '/downloadable-forms',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Log out',
            path: '/logout',
            icon: <AiIcons.AiFillHome />
        }
    ],
    [ //dept chair
        {
            title: 'ThomCare Homepage',
            path: '/',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Control Panel',
            path: '/controlpanel',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Announcements',
            icon: <AiIcons.AiFillHome />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Create Announcement',
                    path: '/admin/new/announcement',
                    icon: <IoIcons.IoIosPaper />
                },
                {
                    title: 'Announcements',
                    path: '/admin/announcements',
                    icon: <IoIcons.IoIosPaper />
                },
                {
                    title: 'Archived Announcements',
                    path: '/admin/archives/announcements',
                    icon: <IoIcons.IoIosPaper />
                }
            ]
        },
        {
            title: 'Forms',
            path: '/manageforms',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Requests',
            icon: <AiIcons.AiFillHome />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Requests',
                    path: '/admin/deptchair/requests',
                    icon: <AiIcons.AiFillHome />
                },
                {
                    title: 'Trash',
                    path: '/requests/trash',
                    icon: <AiIcons.AiFillHome />
                }
            ]
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Log out',
            path: '/logout',
            icon: <AiIcons.AiFillHome />
        }
    ],
    [ //cics staff
        {
            title: 'ThomCare Homepage',
            path: '/',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Control Panel',
            path: '/controlpanel',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Announcements',
            icon: <AiIcons.AiFillHome />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Create Announcement',
                    path: '/admin/new/announcement',
                    icon: <IoIcons.IoIosPaper />
                },
                {
                    title: 'Announcements',
                    path: '/admin/announcements',
                    icon: <IoIcons.IoIosPaper />
                },
                {
                    title: 'Archived Announcements',
                    path: '/admin/archives/announcements',
                    icon: <IoIcons.IoIosPaper />
                }
            ]
        },
        {
            title: 'Forms',
            path: '/manageforms',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Requests',
            icon: <AiIcons.AiFillHome />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'All Requests',
                    path: '/admin/cics/requests',
                    icon: <AiIcons.AiFillHome />
                },
                {
                    title: 'Requests to Office',
                    path: '/admin/cics/requests',
                    icon: <AiIcons.AiFillHome />
                },
                {
                    title: 'Trash',
                    path: '/requests/trash',
                    icon: <AiIcons.AiFillHome />
                }
            ]
        },
        {
            title: 'Users',
            icon: <AiIcons.AiFillHome />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Register User',
                    path: '/admin/register',
                    icon: <IoIcons.IoIosPaper />
                },
                {
                    title: 'View Users',
                    path: '/admin/users',
                    icon: <IoIcons.IoIosPaper />
                }
            ]
        },
        {
            title: 'Audit Log',
            path: '/audit',
            icon: <AiIcons.AiFillHome />,
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <AiIcons.AiFillHome />
        },
        {
            title: 'Log out',
            path: '/logout',
            icon: <AiIcons.AiFillHome />
        }
    ]
]