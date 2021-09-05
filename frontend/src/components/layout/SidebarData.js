import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as HiIcons from 'react-icons/hi'
import * as SiIcons from 'react-icons/si'
import * as ImIcons from 'react-icons/im'

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
            icon: <AiIcons.AiFillControl />
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <FaIcons.FaUserCircle />
        },
        {
            title: 'My Requests',
            path: '/my-requests',
            icon: <IoIcons.IoDocumentText />
        },
        {
            title: 'Downloadable Forms',
            path: '/downloadable-forms',
            icon: <RiIcons.RiFileDownloadFill />
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <RiIcons.RiMessageFill />
        },
        {
            title: 'Log out',
            path: '/logout',
            icon: <RiIcons.RiLogoutBoxRFill />
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
            icon: <AiIcons.AiFillControl />
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <FaIcons.FaUserCircle />
        },
        {
            title: 'Announcements',
            icon: <IoIcons.IoNewspaper />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Create Announcement',
                    path: '/admin/new/announcement',
                    icon: <IoIcons.IoAddCircleSharp />
                },
                {
                    title: 'Announcements',
                    path: '/admin/announcements',
                    icon: <IoIcons.IoIosPaper />
                },
                {
                    title: 'Archived Announcements',
                    path: '/admin/archives/announcements',
                    icon: <RiIcons.RiInboxArchiveFill />
                }
            ]
        },
        {
            title: 'Forms',
            path: '/manageforms',
            icon: <HiIcons.HiDocumentDuplicate />
        },
        {
            title: 'Requests',
            icon: <FaIcons.FaListUl />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Requests',
                    path: '/admin/deptchair/requests',
                    icon: <RiIcons.RiAdminFill />
                },
                {
                    title: 'Trash',
                    path: '/requests/trash',
                    icon: <FaIcons.FaTrash />
                }
            ]
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <SiIcons.SiMessenger />
        },
        {
            title: 'Log out',
            path: '/logout',
            icon: <RiIcons.RiLogoutBoxRFill />
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
            icon: <AiIcons.AiFillControl />
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <FaIcons.FaUserCircle />
        },
        {
            title: 'Announcements',
            icon: <IoIcons.IoNewspaper />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Create Announcement',
                    path: '/admin/new/announcement',
                    icon: <IoIcons.IoAddCircleSharp />
                },
                {
                    title: 'Announcements',
                    path: '/admin/announcements',
                    icon: <IoIcons.IoIosPaper />
                },
                {
                    title: 'Archived Announcements',
                    path: '/admin/archives/announcements',
                    icon: <RiIcons.RiInboxArchiveFill />
                }
            ]
        },
        {
            title: 'Forms',
            path: '/manageforms',
            icon: <HiIcons.HiDocumentDuplicate />
        },
        {
            title: 'Requests',
            icon: <FaIcons.FaListUl />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'All Requests',
                    path: '/admin/cics/requests',
                    icon: <RiIcons.RiAdminFill />
                },
                {
                    title: 'Requests to Office',
                    path: '/admin/cics/requests',
                    icon: <ImIcons.ImOffice />
                },
                {
                    title: 'Trash',
                    path: '/requests/trash',
                    icon: <FaIcons.FaTrash />
                }
            ]
        },
        {
            title: 'Users',
            icon: <RiIcons.RiAccountCircleFill />,
            iconClosed: <RiIcons.RiArrowDownSFill />,
            iconOpened: <RiIcons.RiArrowUpSFill />,
            subNav: [
                {
                    title: 'Register User',
                    path: '/admin/register',
                    icon: <IoIcons.IoCreate />
                },
                {
                    title: 'View Users',
                    path: '/admin/users',
                    icon: <FaIcons.FaListUl />
                }
            ]
        },
        {
            title: 'Audit Log',
            path: '/audit',
            icon: <FaIcons.FaHistory />,
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <RiIcons.RiMessageFill />
        },
        {
            title: 'Log out',
            path: '/logout',
            icon: <RiIcons.RiLogoutBoxRFill />
        }
    ]
]