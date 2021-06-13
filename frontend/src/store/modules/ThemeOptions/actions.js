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

// Sidebar

export const setSidebarShadow = sidebarShadow => ({
  type: SET_SIDEBAR_SHADOW,
  sidebarShadow
});
export const setSidebarFixed = sidebarFixed => ({
  type: SET_SIDEBAR_FIXED,
  sidebarFixed
});
export const setSidebarToggleMobile = sidebarToggleMobile => ({
  type: SET_SIDEBAR_TOGGLE_MOBILE,
  sidebarToggleMobile
});
export const setSidebarFooter = sidebarFooter => ({
  type: SET_SIDEBAR_FOOTER,
  sidebarFooter
});
export const setSidebarToggle = sidebarToggle => ({
  type: SET_SIDEBAR_TOGGLE,
  sidebarToggle
});
export const setSidebarHover = sidebarHover => ({
  type: SET_SIDEBAR_HOVER,
  sidebarHover
});
export const setSidebarUserbox = sidebarUserbox => ({
  type: SET_SIDEBAR_USERBOX,
  sidebarUserbox
});

// Header

export const setHeaderFixed = headerFixed => ({
  type: SET_HEADER_FIXED,
  headerFixed
});
export const setHeaderShadow = headerShadow => ({
  type: SET_HEADER_SHADOW,
  headerShadow
});
export const setHeaderSearchHover = headerSearchHover => ({
  type: SET_HEADER_SEARCH_HOVER,
  headerSearchHover
});

// Main content

export const setContentBackground = contentBackground => ({
  type: SET_CONTENT_BACKGROUND,
  contentBackground
});
export const setThemeConfiguratorToggle = themeConfiguratorToggle => ({
  type: SET_THEME_CONFIGURATOR_TOGGLE,
  themeConfiguratorToggle
});

// Footer

export const setFooterFixed = footerFixed => ({
  type: SET_FOOTER_FIXED,
  footerFixed
});
export const setFooterShadow = footerShadow => ({
  type: SET_FOOTER_SHADOW,
  footerShadow
});

// Page title

export const setPageTitleStyle = pageTitleStyle => ({
  type: SET_PAGE_TITLE_STYLE,
  pageTitleStyle
});
export const setPageTitleBackground = pageTitleBackground => ({
  type: SET_PAGE_TITLE_BACKGROUND,
  pageTitleBackground
});
export const setPageTitleShadow = pageTitleShadow => ({
  type: SET_PAGE_TITLE_SHADOW,
  pageTitleShadow
});
export const setPageTitleBreadcrumb = pageTitleBreadcrumb => ({
  type: SET_PAGE_TITLE_BREADCRUMB,
  pageTitleBreadcrumb
});
export const setPageTitleIconBox = pageTitleIconBox => ({
  type: SET_PAGE_TITLE_ICON_BOX,
  pageTitleIconBox
});
export const setPageTitleDescription = pageTitleDescription => ({
  type: SET_PAGE_TITLE_DESCRIPTION,
  pageTitleDescription
});
