// import path from 'path';
import React from 'react'
// import { path } from '../Backend/Models/address';


const NotFound = React.lazy(() => import('../src/views/pages/page404/Page404'));
// const Charts = React.lazy(() => import('./views/charts/Charts'))



// const SponsoredApprovalList = React.lazy(() => import('./views/admin-views/SponsoredApprovals/SponsoredApprovalList'),)
// const ViewSponsoredApproval = React.lazy(() => import('./views/admin-views/SponsoredApprovals/ViewSponsoredApproval'),)
// const EditSponsoredApproval = React.lazy(() => import('./views/admin-views/SponsoredApprovals/EditSponsoredApproval'),)

// Order





const routes = [
  { path: '/access-denied', name: 'Access Denied', element: AccessDenied },
  { path: '/', name: 'Home', element: Dashboard, module: 'dashboard' },

  // { path: '/charts', name: 'Charts', element: Charts },





  // Coupon Management
  { path: '/coupon-list', name: 'Coupon List', element: CouponList, module: 'promotions' },
  { path: '/coupon-add', name: 'Add Coupon', element: AddCoupon, module: 'promotions' },
  { path: '/coupon-edit/:id', name: 'Edit Coupon', element: EditCoupon, module: 'promotions' },
  { path: '/coupon-view/:id', name: 'View Coupon', element: ViewCoupon, module: 'promotions' },

  //Faq Management
  { path: '/faq-list', name: 'FAQ List', element: FaqList, module: 'promotions' },



  // Static Pages Management
  { path: '/page-list', name: 'Page List', element: PageList, module: 'pageManagement' },
  { path: '/page-edit/:id', name: 'Edit Page', element: EditPage, module: 'pageManagement' },


  //Roles Management
  { path: '/role-list', name: 'Role List', element: RoleList, module: 'roleManagement' },
  { path: '/role-add', name: 'Add Role', element: AddRole, module: 'roleManagement' },
  { path: '/role-edit/:id', name: 'Edit Role', element: EditRole, module: 'roleManagement' },
  { path: '/role-view/:id', name: 'View Role', element: ViewRole, module: 'roleManagement' },




  { path: '/app-config', name: 'App Config', element: AppConfig, module: 'bussinessSettings' },
  { path: '/profile', name: 'View Role', element: AdminProfile },

  { path: '/push-notifications', name: 'Push Notifications', element: PushNotifications, module: 'promotions' },


  // Product Management
  { path: '/product-list', name: 'Product List', element: ProductList, module: 'productManagement' },
  { path: '/product-add', name: 'Add Product', element: AddProduct, module: 'productManagement' },
  { path: '/product-edit/:id', name: 'Edit Product', element: EditProduct, module: 'productManagement' },
  { path: '/product-view/:id', name: 'View Product', element: ViewProduct, module: 'productManagement' },




  // Order Routes
  { path: '/order-list', name: 'Order List', element: OrderList, module: 'orders' },
  { path: '/order-view/:id', name: 'Order Details', element: ViewOrder, module: 'orders' },


  // Reports Routes
  { path: '/cancelled-order/report', name: 'Order Reports', element: CancelledOrder, module: 'reports', },
  { path: '/commission/report', name: 'Commission Report', element: CommisionReport, module: 'reports' },
  { path: '/orders/report', name: 'Order Report', element: OrdersReport, module: 'reports' },
  { path: '/transaction/report', name: 'Transaction Report', element: TransactionReport, module: 'reports' },

  // Order Transaction Routes
  { path: '/order-transaction-list', name: 'Order Transaction List', element: OrderTransactionList, module: 'orders' },
  // { path: '/order-transaction-view/:id', name: 'View Order Transaction', element: ViewOrderTransaction },

  { path: '*', name: 'Not Found', element: NotFound },


{ path: '/support-chat-predefined-question', name: 'Predefined Question', element: PredefinedQuestion, module: 'support' },


  { path: '/predefined-question-category', name: 'Predefined Question Category', element: PredefinedQuestionCategory, module: 'support' },

  { path: '/support-tickets', name: 'Support Ticket List', element: SupportTicketList, module: 'support' },
  { path: '/support-tickets/view/:id', name: 'Support Ticket View', element: ViewSupportTicket, module: 'support' },

  { path: '/withdraw-requests', name: 'Withdraw Request List', element: WithdrawRequestList, module: 'sellerManagement' },
  { path: '/withdrawal-view/:id', name: 'Withdraw Request View', element: ViewWithdrawRequest, module: 'sellerManagement' },

  { path: '/feedback-list', name: 'Feedback List', element: FeedbackList, module: 'userManagement' },
  { path: '/feedback-view/:id', name: 'Feedback View', element: FeedbackView, module: 'userManagement' },
  { path: '/contact-us-list', name: 'Contact Us List', element: ContactUsList, module: 'userManagement' }

]


export default routes
