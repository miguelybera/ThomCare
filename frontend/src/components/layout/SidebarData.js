import React from 'react'

export const SidebarData = [
    [ //student
        {
            title: 'ThomCare Homepage',
            path: '/',
            icon: <i class="fa fa-home" aria-hidden="true"></i>
        },
        {
            title: 'Control Panel',
            path: '/controlpanel',
            icon: <i class="fa fa-cog" aria-hidden="true"></i>
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <i class="fa fa-user" aria-hidden="true"></i>
        },
        {
            title: 'My Requests',
            path: '/me/requests',
            icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
        },
        {
            title: 'Downloadable Forms',
            path: '/downloadable-forms',
            icon: <i class="fa fa-file-text" aria-hidden="true"></i>
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <i class="fa fa-comments" aria-hidden="true"></i>
        },
        {
            title: 'Log out',
            path: '',
            icon: <i class="fa fa-sign-out" aria-hidden="true"></i>
        }
    ],
    [ //dept chair
        {
            title: 'ThomCare Homepage',
            path: '/',
            icon: <i class="fa fa-home" aria-hidden="true"></i>
        },
        {
            title: 'Control Panel',
            path: '/controlpanel',
            icon: <i class="fa fa-cog" aria-hidden="true"></i>
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <i class="fa fa-user" aria-hidden="true"></i>
        },
        {
            title: 'Announcements',
            icon: <i class="fa fa-bullhorn" aria-hidden="true"></i>,
            iconClosed: <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>,
            iconOpened: <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>,
            subNav: [
                {
                    title: 'Create Announcement',
                    path: '/admin/new/announcement',
                    icon: <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                },
                {
                    title: 'Announcements',
                    path: '/admin/announcements',
                    icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
                },
                {
                    title: 'My Announcements',
                    path: '/admin/me/announcements',
                    icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
                },
                {
                    title: 'Archived Announcements',
                    path: '/admin/archives/announcements',
                    icon: <i class="fa fa-archive" aria-hidden="true"></i>
                },
                {
                    title: 'Announcement Types',
                    path: '/admin/announcementTypes',
                    icon: <i class="fa fa-archive" aria-hidden="true"></i>
                }
            ]
        },
        {
            title: 'Requests',
            icon: <i class="fa fa-file" aria-hidden="true"></i>,
            iconClosed: <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>,
            iconOpened: <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>,
            subNav: [
                {
                    title: 'Requests',
                    path: '/admin/deptchair/requests',
                    icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
                },
                {
                    title: 'Trash',
                    path: '/admin/requests/trash',
                    icon: <i class="fa fa-trash" aria-hidden="true"></i>
                }
            ]
        },
        {
            title: 'Others',
            icon: <i class="fa fa-users" aria-hidden="true"></i>,
            iconClosed: <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>,
            iconOpened: <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>,
            subNav: [
                {
                    title: 'Courses',
                    path: '/admin/courses',
                    icon: <i class="fa fa-home" aria-hidden="true"></i>
                },
                {
                    title: 'Forms',
                    path: '/admin/manageforms',
                    icon: <i class="fa fa-home" aria-hidden="true"></i>
                },
                {
                    title: 'Students',
                    path: '/admin/deptchair/students',
                    icon: <i class="fa fa-trash" aria-hidden="true"></i>
                },
            ]
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <i class="fa fa-comments" aria-hidden="true"></i>
        },
        {
            title: 'Log out',
            path: '',
            icon: <i class="fa fa-sign-out" aria-hidden="true"></i>
        }
    ],
    [ //cics staff
        {
            title: 'ThomCare Homepage',
            path: '/',
            icon: <i class="fa fa-home" aria-hidden="true"></i>

        },
        {
            title: 'Control Panel',
            path: '/controlpanel',
            icon: <i class="fa fa-cog" aria-hidden="true"></i>
        },
        {
            title: 'My Profile',
            path: '/profile',
            icon: <i class="fa fa-user" aria-hidden="true"></i>
        },
        {
            title: 'Announcements',
            icon: <i class="fa fa-bullhorn" aria-hidden="true"></i>,
            iconClosed: <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>,
            iconOpened: <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>,
            subNav: [
                {
                    title: 'Create Announcement',
                    path: '/admin/new/announcement',
                    icon: <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                },
                {
                    title: 'Announcements',
                    path: '/admin/announcements',
                    icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
                },
                {
                    title: 'My Announcements',
                    path: '/admin/me/announcements',
                    icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
                },
                {
                    title: 'Archived Announcements',
                    path: '/admin/archives/announcements',
                    icon: <i class="fa fa-archive" aria-hidden="true"></i>
                },
                {
                    title: 'Announcement Types',
                    path: '/admin/announcementTypes',
                    icon: <i class="fa fa-archive" aria-hidden="true"></i>
                }
            ]
        },
        {
            title: 'Requests',
            icon: <i class="fa fa-file" aria-hidden="true"></i>,
            iconClosed: <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>,
            iconOpened: <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>,
            subNav: [
                {
                    title: 'All Requests',
                    path: '/admin/all/requests',
                    icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
                },
                {
                    title: 'Office Requests',
                    path: '/admin/cics/requests',
                    icon: <i class="fa fa-home" aria-hidden="true"></i>
                },
                {
                    title: 'Available requests',
                    path: '/admin/cics/available/requests',
                    icon: <i class="fa fa-home" aria-hidden="true"></i>
                },
                {
                    title: 'Assigned to me',
                    path: '/admin/me/requests',
                    icon: <i class="fa fa-home" aria-hidden="true"></i>
                },
                {
                    title: 'Trash',
                    path: '/admin/requests/trash',
                    icon: <i class="fa fa-trash" aria-hidden="true"></i>
                }
            ]
        },
        {
            title: 'Others',
            icon: <i class="fa fa-user" aria-hidden="true"></i>,
            iconClosed: <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>,
            iconOpened: <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>,
            subNav: [
                {
                    title: 'Courses',
                    path: '/admin/courses',
                    icon: <i class="fa fa-home" aria-hidden="true"></i>
                },
                {
                    title: 'Forms',
                    path: '/admin/manageforms',
                    icon: <i class="fa fa-home" aria-hidden="true"></i>
                },
                {
                    title: 'User accounts',
                    path: '/admin/users',
                    icon: <i class="fa fa-list-ul" aria-hidden="true"></i>
                },
                {
                    title: 'Register User',
                    path: '/admin/register',
                    icon: <i class="fa fa-plus-circle" aria-hidden="true"></i>
                }
            ]
        },
        {
            title: 'Audit Log',
            path: '/audit',
            icon: <i class="fa fa-book" aria-hidden="true"></i>,
        },
        {
            title: 'Messages',
            path: '/messenger',
            icon: <i class="fa fa-comments" aria-hidden="true"></i>
        },
        {
            title: 'Log out',
            path: '',
            icon: <i class="fa fa-sign-out" aria-hidden="true"></i>
        }
    ]
]