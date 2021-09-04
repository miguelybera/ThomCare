import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'


export const SidebarData = [
    {
        title: 'ThomCare Homepage',
        path: '/',
        icon: <AiIcons.AiFillHome />
    },
    {
        
        title: 'Announcement',
       
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Create Announcement',
                path: '/createannouncement',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Announcements',
                path: '/announcementslist',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Archived Announcements',
                path: '/archivedannouncementslist',
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
                path: '/managerequests',
                icon: <AiIcons.AiFillHome />
            },
            {
                title: 'Trash',
                path: '/trash',
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
                path: '/registeruser',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'View Users',
                path: '/userslist',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Audit Log',
        
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Audit Log',
                path: '/auditlog',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    }
    
]

