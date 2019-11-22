/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/user-list',
    name: 'User List',
    view: 'UserList'
  },
  {
    path: '/devotion-list',
    name: 'Devotion List',
    view: 'DevotionList'
  },
  {
    path: '/disbursement-list',
    name: 'Disbursement List',
    view: 'DisbursementList'
  },
  {
    path: '/notifications',
    name: 'Notifications',
    view: 'Notifications'
  }
]
