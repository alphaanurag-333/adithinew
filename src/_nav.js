import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react'
import { GrCatalog, GrNotes } from 'react-icons/gr'
import { AiOutlineTransaction } from 'react-icons/ai'

import { BsImageAlt, BsList, BsWallet2 } from 'react-icons/bs'
import { BiSolidCategory } from 'react-icons/bi'
import { MdMarkEmailUnread, MdNotificationAdd, MdOutlineLibraryAdd } from 'react-icons/md'
import { FaShuffle } from 'react-icons/fa6'
import { CgExtensionAdd } from 'react-icons/cg'
import { IoTicketSharp } from 'react-icons/io5'
import { TbTruckDelivery } from 'react-icons/tb'

const _nav = [
  // -------- Dashboard --------
  {
    component: CNavTitle,
    name: 'Dashboard',
    moduleGroup: 'dashboard',
  },
  {
    component: CNavItem,
    moduleGroup: 'dashboard',
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <BiSolidCategory size={22} />,
  },

  // -------- Order Management --------
  {
    component: CNavTitle,
    name: 'Order Management',
    moduleGroup: 'orders',
  },
  {
    component: CNavItem,
    moduleGroup: 'orders',
    name: 'Order List',
    to: '/admin/order-list',
    icon: <i className="fa fa-shopping-cart"></i>,
  },

  {
    component: CNavItem,
    moduleGroup: 'orders',
    name: 'Order Transaction List',
    to: '/admin/order-transaction-list',
    icon: <i className="fa fa-exchange-alt"></i>,
  },

  // -------- Product Management --------
  {
    component: CNavTitle,
    name: 'Product Management',
    moduleGroup: 'productManagement',
  },
  {
    component: CNavGroup,
    moduleGroup: 'productManagement',
    name: 'Manage Masters',
    icon: <MdOutlineLibraryAdd size={22} />,
    items: [
      {
        component: CNavGroup,
        moduleGroup: 'productManagement',
        name: 'Grouping',
        icon: <i className="fa-solid fa-object-group me-2"></i>,
        items: [
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Segments',
            to: '/admin/segment-list',
            icon: <i className="fa-solid fa-layer-group me-2"></i>,
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Categories',
            to: '/admin/category-list',
            icon: <i className="fa-solid fa-layer-group me-2"></i>,
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Sub Categories',
            to: '/admin/subCategory-list',
            icon: <i className="fa-solid fa-layer-group me-2"></i>,
          },
        ],
      },
      {
        component: CNavGroup,
        moduleGroup: 'productManagement',
        name: 'Organizer',
        icon: <i className="fa-solid fa-object-group me-2"></i>,
        items: [
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Brands',
            to: '/admin/brand-list',
            icon: <i className="fa-solid fa-layer-group me-2"></i>,
          },

          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Tags',
            to: '/admin/tag-list',
            icon: <i className="fa-solid fa-layer-group me-2"></i>,
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Lines',
            to: '/admin/line-list',
            icon: <i className="fa-solid fa-arrows-left-right-to-line me-2"></i>, // choose an icon you like
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Usages',
            to: '/admin/usage-list',
            icon: <i className="fa-solid fa-list-check me-2"></i>, // choose an icon you like
          },

          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Groups',
            to: '/admin/group-list',
            icon: <i className="fa-solid fa-layer-group me-2"></i>,
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Visibility',
            to: '/admin/visibility-list',
            icon: <i className="fa-solid fa-layer-group me-2"></i>,
          },
        ],
      },

      {
        component: CNavGroup,
        moduleGroup: 'productManagement',
        name: "Add On's",
        icon: <MdOutlineLibraryAdd size={22} />,
        items: [
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'AddOn Title',
            to: '/admin/addon-title-list',
            // icon: <i className="fa fa-box"></i>,
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'AddOn Key',
            to: '/admin/addon-key-list',
            // icon: <i className="fa fa-box"></i>,
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'AddOn Values',
            to: '/admin/addon-attribute-list',
            // icon: <i className="fa fa-box"></i>,
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Add On Price Slots',
            to: '/admin/addon-attribute-prices',
            // icon: <i className="fa fa-box"></i>,
          },
        ],
      },

      {
        component: CNavGroup,
        moduleGroup: 'productManagement',
        name: 'Variants',
        icon: <FaShuffle size={20} />,
        items: [
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Variant Title',
            to: '/admin/variant-title-list',
            // icon: <i className="fa fa-box"></i>,
          },
          {
            component: CNavItem,
            moduleGroup: 'productManagement',
            name: 'Variant values',
            to: '/admin/variant-value-list',
            // icon: <i className="fa fa-box"></i>,
          },
        ],
      },
    ],
  },

  {
    component: CNavGroup,
    moduleGroup: 'productManagement',
    name: ' Common Attribute',
    icon: <i className="fa-solid fa-layer-group me-2"></i>,
    items: [
      {
        component: CNavItem,
        moduleGroup: 'productManagement',
        name: 'Taxes Attributes',
        to: '/admin/tax-list',
        // icon: <i className="fa fa-box"></i>,
      },
      {
        component: CNavItem,
        moduleGroup: 'productManagement',
        name: 'Unit Attributes',
        to: '/admin/unit-list',
        // icon: <i className="fa fa-box"></i>,
      },
    ],
  },
  {
    component: CNavItem,
    moduleGroup: 'productManagement',
    name: 'Products',
    to: '/admin/product-list',
    icon: <i className="fa-solid fa-boxes-stacked"></i>,
  },

  // -------- Role Management --------
  {
    component: CNavTitle,
    name: 'Role Management',
    moduleGroup: 'roleManagement',
  },
  {
    component: CNavItem,
    moduleGroup: 'roleManagement',
    name: 'Roles',
    to: '/admin/role-list',
    icon: <i className="fa fa-user-shield"></i>,
  },

  // -------- User Management --------
  {
    component: CNavTitle,
    name: 'User Management',
    moduleGroup: 'userManagement',
  },
  {
    component: CNavItem,
    moduleGroup: 'userManagement',
    name: 'Consumers',
    to: '/admin/user-list',
    icon: <i className="fa fa-users"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'userManagement',
    name: 'Feedback Ratings',
    to: '/admin/feedback-list',
    icon: <i className="fa fa-users"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'userManagement',
    name: 'Constact Us Messages',
    to: '/admin/contact-us-list',
    icon: <i className="fa fa-users"></i>,
  },

  // -------- Seller Management --------
  {
    component: CNavTitle,
    name: 'Seller Management',
    moduleGroup: 'sellerManagement',
  },
  {
    component: CNavItem,
    moduleGroup: 'sellerManagement',
    name: 'Sellers',
    to: '/admin/seller-list',
    icon: <i className="fa fa-store"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'sellerManagement',
    name: 'Seller Staff',
    to: '/admin/seller-staff',
    icon: <i className="fa fa-store"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'sellerManagement',
    name: 'Withdrawal Requests',
    to: '/admin/withdraw-requests',
    icon: <i className="fa fa-money-bill-wave"></i>,
  },

  // -------- Staff Management --------
  {
    component: CNavTitle,
    name: 'Staff Management',
    moduleGroup: 'staffManagement',
  },
  {
    component: CNavItem,
    moduleGroup: 'staffManagement',
    name: 'Sub Admin Users',
    to: '/admin/subadmin-list',
    icon: <i className="fa fa-users"></i>,
  },

  // -------- Subscriptions --------
  {
    component: CNavTitle,
    name: 'Subscription Management',
    moduleGroup: 'subscriptions',
  },

  {
    component: CNavItem,
    moduleGroup: 'subscriptions',
    name: 'Subscription List',
    to: '/admin/subscription-list',
    icon: <i className="fa fa-tags"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'subscriptions',
    name: 'Subscription Transactions',
    to: '/admin/subscription-transactions',
    icon: <i className="fa fa-credit-card"></i>,
  },

  {
    component: CNavTitle,
    name: 'Reports',
    moduleGroup: 'reports',
  },

  {
    component: CNavItem,
    moduleGroup: 'reports',
    name: 'Cancelled Orders',
    to: '/admin/cancelled-order/report',
    icon: <i className="fa fa-times-circle"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'reports',
    name: 'Order Report',
    to: '/admin/orders/report',
    icon: <i className="fa fa-rupee-sign"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'reports',
    name: 'Transaction Report',
    to: '/admin/transaction/report',
    icon: <i className="fa fa-rupee-sign"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'reports',
    name: 'Commission Report',
    to: '/admin/commission/report',
    icon: <i className="fa fa-rupee-sign"></i>,
  },
  // -------- Promotion & Notifications --------
  {
    component: CNavTitle,
    name: 'Notifications & Promotions Management',
    moduleGroup: 'promotions',
  },

  {
    component: CNavItem,
    moduleGroup: 'promotions',
    name: 'FAQs',
    to: '/admin/faq-list',
    icon: <i className="fa fa-question-circle"></i>,
  },

  {
    component: CNavItem,
    moduleGroup: 'promotions',
    name: 'Coupons',
    to: '/admin/coupon-list',
    icon: <i className="fa fa-ticket-alt"></i>,
  },
  {
    component: CNavItem,
    moduleGroup: 'promotions',
    name: 'Banner',
    to: '/admin/banner-list',
    icon: <BsImageAlt />,
  },

  {
    component: CNavItem,
    moduleGroup: 'promotions',
    name: 'Push Notifications',
    to: '/admin/push-notifications',
    icon: <MdNotificationAdd size={22} />,
  },
  {
    component: CNavItem,
    moduleGroup: 'promotions',
    name: 'SMS/Email Campaigns',
    to: '/admin/campaign-list',
    icon: <MdMarkEmailUnread size={22} />,
  },
  {
    component: CNavItem,
    moduleGroup: 'promotions',
    name: 'Manage Platform Ads',
    to: '/admin/platform-ads',
    icon: <CgExtensionAdd size={22} />,
  },

  // -------- Pages --------
  {
    component: CNavTitle,
    name: 'Page Management',
    moduleGroup: 'pageManagement',
  },
  {
    component: CNavItem,
    moduleGroup: 'pageManagement',
    name: 'Static Pages',
    to: '/admin/page-list',
    icon: <GrNotes className="fs-5" />,
  },
  {
    component: CNavTitle,
    name: 'Bussiness Settings',
    moduleGroup: 'bussinessSettings',
  },
  {
    component: CNavItem,
    moduleGroup: 'bussinessSettings',
    name: 'Delivery Charges',
    to: '/admin/delivery-charges',
    icon: <TbTruckDelivery size={22} />,
  },

  // {
  //   component: CNavItem,
  //   moduleGroup: 'bussinessSettings',
  //   name: 'Support Tickets',
  //   to: '/admin/support-tickets',
  //   icon: <IoTicketSharp size={22} />,
  // },

  {
    component: CNavItem,
    moduleGroup: 'bussinessSettings',
    name: 'App Config',
    to: '/admin/app-config',
    icon: <i className="fa fa-cogs"></i>,
  },

  {
    component: CNavTitle,
    name: 'Support Management',
    moduleGroup: 'supportTickets',
  },

  {
    component: CNavItem,
    moduleGroup: 'supportTickets',
    name: 'Support Tickets',
    to: '/admin/support-tickets',
    icon: <IoTicketSharp size={22} />,
  },

  {
    component: CNavItem,
    moduleGroup: 'supportTickets',
    name: 'Category',
    to: '/admin/predefined-question-category',
    icon: <IoTicketSharp size={22} />,
  },
  {
    component: CNavItem,
    moduleGroup: 'supportTickets',
    name: 'Predefined Questions',
    to: '/admin/support-chat-predefined-question',
    icon: <IoTicketSharp size={22} />,
  },
]

export default _nav
