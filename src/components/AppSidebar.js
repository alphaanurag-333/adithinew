import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CSidebar,
  CNavTitle,
  CNavItem,
  CSidebarBrand,
  CSidebarHeader,
} from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import navigation from '../_nav'
import { IoClose } from 'react-icons/io5'
import { setSidebarShow } from '../features/sidebarSlice.js'

import MEDIA_URL from '../media.js'


const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const { config } = useSelector((state) => state.appConfig)

  const { admin, allowedModules } = useSelector((state) => state.auth)


  // const filteredNav = navigation.filter(item => {

  //   if (admin?.isSuperAdmin) return true;

  //   if (item.component === CNavTitle) {
  //     const groupItems = navigation.filter(i =>
  //       i.moduleGroup === item.moduleGroup &&
  //       i.component === CNavItem
  //     );

  //     return groupItems.some(child => allowedModules.includes(child.moduleName));
  //   }

  //   // Items without moduleName → always show
  //   if (!item.moduleName) return true;

  //   // Normal items → check permission
  //   return allowedModules.includes(item.moduleName);
  // });


  const filteredNav = navigation.filter(item => {

    if (admin?.isSuperAdmin) return true;

    if (item.moduleGroup) {
      return allowedModules.includes(item.moduleGroup);
    }

    return true;
  });



  // const logo = logImage;

  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => dispatch({ type: 'set', sidebarShow: visible })}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <img
            src={config?.admin_logo ? MEDIA_URL + config.admin_logo : null}
            className="mainLogo"
            alt="Business Logo"
           

          />
        </CSidebarBrand>
        <IoClose
          className="d-md-none mobCloseSidebar"
          onClick={() => dispatch(setSidebarShow(!sidebarShow))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={filteredNav} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
