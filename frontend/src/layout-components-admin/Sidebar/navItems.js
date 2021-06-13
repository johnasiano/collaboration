import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import GradeTwoTone from '@material-ui/icons/GradeTwoTone';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PagesIcon from '@material-ui/icons/Pages';
import NoteIcon from '@material-ui/icons/Note';
import NatureIcon from '@material-ui/icons/Nature';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import ContactlessIcon from '@material-ui/icons/Contactless';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';

export default [
  {
    label: 'HOME',
    content: [
      {
        label: 'Dashboard',
        icon: DashboardTwoToneIcon,
        description: 'This page can be used to create a login section for your users.',
        to: '/admin/dashboard'
      }
    ],    
  },  
  {
    label: 'PAGES',
    content: [
      {
        label: 'HOME',
        icon: HomeIcon,
        content: [
          {
            label: 'Pre-Order Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/preorder'
          },
          {
            label: 'Deal of The Week Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/dealweek'
          },
          {
            label: 'Free Pack Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/freepack'
          },
          {
            label: 'Popup Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/popup'
          },
          {
            label: 'Kick Back Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/kickback'
          },
          {
            label: 'Home Page Banner Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/pagebanner'
          },
          {
            label: 'Side Bar Background Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/sidebacback'
          },
          {
            label: 'Latest Release Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/latest-release'
          },
          {
            label: 'Monster Background Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/home/monster-back'
          },
        ]
      },
      {
        label: 'Checkout',
        icon: ShoppingCartIcon,
        content: [
          {
            label: 'Check Out Banner Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/checkout'
          },
        ]
      },
      {
        label: 'Buylist',
        icon: PictureAsPdfIcon,
        content: [
          {
            label: 'Buylist PDF Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/buy-list'
          },
        ]
      },
      {
        label: 'Contact us',
        icon: ContactlessIcon,
        content: [
          {
            label: 'Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/contactus'
          },
        ]
      },
      {
        label: 'Terms of service',
        icon: MultilineChartIcon,
        content: [
          {
            label: 'Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/terms-service'
          },
        ]
      },
      {
        label: 'Privacy policy',
        icon: NatureIcon,
        content: [
          {
            label: 'Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/privacy-policy'
          },
        ]
      },
      {
        label: 'Refund policy',
        icon: NoteIcon,
        content: [
          {
            label: 'Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/refund-policy'
          },
        ]
      },
    ],    
  }, 
  {
    label: 'SALES',
    content: [
      {
        label: 'Orders',
        icon: ListAltIcon,
        description: 'This page can be used to create a login section for your users.',
        to: '/admin/orders'
      },
      {
        label: 'Customers',
        icon: SupervisorAccountIcon,
        description: 'This page can be used to create a login section for your users.',
        to: '/admin/customers'
      },
      {
        label: 'Promo codes',
        icon: PagesIcon,
        content: [
          {
            label: 'Value Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/promovalue'
          },
          {
            label: 'Date Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/promodate'
          },
          {
            label: 'Shipping Setup',
            description: 'This is a dashboard page example built using this template.',
            to: '/admin/promoshipping'
          },
        ]
      },
    ],    
  }, 
  {
    label: 'Admin',
    content: [
      {
        label: 'Users',
        icon: PersonIcon,
        description: 'This page can be used to create a login section for your users.',
        to: '/admin/users'
      }
    ],    
  }, 
];
