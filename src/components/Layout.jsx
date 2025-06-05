import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 64;

const Layout = ({ children, currentPage, onPageChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would typically update your theme context
    console.log('Theme toggle:', !isDarkMode);
  };

  const drawerWidth = sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <Header
        onMenuToggle={handleDrawerToggle}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />

      {/* Sidebar */}
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        collapsed={sidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.background.default,
          minHeight: '100vh',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(isMobile
            ? {
                width: '100%',
                ml: 0,
              }
            : {
                width: `calc(100% - ${drawerWidth}px)`,
                ml: `${drawerWidth}px`,
              }),
        }}
      >
        {/* Toolbar spacing to account for fixed header */}
        <Box
          sx={{
            height: 64, // Standard AppBar height
            flexShrink: 0,
          }}
        />
        
        {/* Page Content */}
        <Box
          sx={{
            p: 3,
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;