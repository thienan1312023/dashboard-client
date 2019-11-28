/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    module: 'Dashboard'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    module: 'UserProfile'
  },
  {
    path: '/user-list',
    name: 'User List',
    module: 'UserList'
  },
  {
    path: '/devotion-list',
    name: 'Devotion List',
    module: 'DevotionList'
  },
  {
    path: '/disbursement-list',
    name: 'Disbursement List',
    module: 'DisbursementList'
  },
  {
    path: '/notifications',
    name: 'Notifications',
    module: 'Notifications'
  }
]
