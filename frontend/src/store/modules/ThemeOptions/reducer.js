import { 
  SET_SIDEBAR_SHADOW,
  SET_SIDEBAR_TOGGLE_MOBILE,
  SET_SIDEBAR_FIXED,
  SET_SIDEBAR_FOOTER,
  SET_SIDEBAR_TOGGLE,
  SET_SIDEBAR_USERBOX,
  SET_SIDEBAR_HOVER,

  SET_HEADER_FIXED,
  SET_HEADER_SEARCH_HOVER,
  SET_HEADER_SHADOW,

  SET_CONTENT_BACKGROUND,
  SET_THEME_CONFIGURATOR_TOGGLE,

  SET_FOOTER_FIXED,
  SET_FOOTER_SHADOW,

  SET_PAGE_TITLE_BACKGROUND,
  SET_PAGE_TITLE_BREADCRUMB,
  SET_PAGE_TITLE_DESCRIPTION,
  SET_PAGE_TITLE_ICON_BOX,
  SET_PAGE_TITLE_SHADOW,
  SET_PAGE_TITLE_STYLE,
} from './types'

const initialState = {
  // Sidebar

  sidebarShadow: false,
  sidebarFixed: true,
  sidebarToggleMobile: false,
  sidebarFooter: true,
  sidebarUserbox: true,
  sidebarToggle: false,
  sidebarHover: false,
  // Header

  headerFixed: true,
  headerShadow: true,
  headerSearchHover: false,

  // Main content

  contentBackground: '',
  themeConfiguratorToggle: false,
  // Footer

  footerFixed: false,
  footerShadow: false,
  // Page title

  pageTitleStyle: '',
  pageTitleBackground: '',
  pageTitleShadow: false,
  pageTitleBreadcrumb: false,
  pageTitleIconBox: true,
  pageTitleDescription: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    // Sidebar

    case SET_SIDEBAR_SHADOW:
      return {
        ...state,
        sidebarShadow: action.sidebarShadow
      };
    case SET_SIDEBAR_FIXED:
      return {
        ...state,
        sidebarFixed: action.sidebarFixed
      };
    case SET_SIDEBAR_TOGGLE_MOBILE:
      return {
        ...state,
        sidebarToggleMobile: action.sidebarToggleMobile
      };
    case SET_SIDEBAR_FOOTER:
      return {
        ...state,
        sidebarFooter: action.sidebarFooter
      };
    case SET_SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebarToggle: action.sidebarToggle
      };
    case SET_SIDEBAR_HOVER:
      return {
        ...state,
        sidebarHover: action.sidebarHover
      };
    case SET_SIDEBAR_USERBOX:
      return {
        ...state,
        sidebarUserbox: action.sidebarUserbox
      };
    // Header

    case SET_HEADER_FIXED:
      return {
        ...state,
        headerFixed: action.headerFixed
      };
    case SET_HEADER_SHADOW:
      return {
        ...state,
        headerShadow: action.headerShadow
      };
    case SET_HEADER_SEARCH_HOVER:
      return {
        ...state,
        headerSearchHover: action.headerSearchHover
      };

    // Main content

    case SET_CONTENT_BACKGROUND:
      return {
        ...state,
        contentBackground: action.contentBackground
      };
    case SET_THEME_CONFIGURATOR_TOGGLE:
      return {
        ...state,
        themeConfiguratorToggle: action.themeConfiguratorToggle
      };
    // Footer

    case SET_FOOTER_FIXED:
      return {
        ...state,
        footerFixed: action.footerFixed
      };
    case SET_FOOTER_SHADOW:
      return {
        ...state,
        footerShadow: action.footerShadow
      };

    // Page title

    case SET_PAGE_TITLE_STYLE:
      return {
        ...state,
        pageTitleStyle: action.pageTitleStyle
      };
    case SET_PAGE_TITLE_BACKGROUND:
      return {
        ...state,
        pageTitleBackground: action.pageTitleBackground
      };
    case SET_PAGE_TITLE_SHADOW:
      return {
        ...state,
        pageTitleShadow: action.pageTitleShadow
      };
    case SET_PAGE_TITLE_BREADCRUMB:
      return {
        ...state,
        pageTitleBreadcrumb: action.pageTitleBreadcrumb
      };
    case SET_PAGE_TITLE_ICON_BOX:
      return {
        ...state,
        pageTitleIconBox: action.pageTitleIconBox
      };
    case SET_PAGE_TITLE_DESCRIPTION:
      return {
        ...state,
        pageTitleDescription: action.pageTitleDescription
      };
    default:
      break;
  }
  return state;
}
