import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  NotificationsOutlined,
  MenuOutlined,
  AccountCircle,
  Settings,
  Logout,
  DarkMode,
  LightMode,
} from '@mui/icons-material';

const Header = ({ onMenuToggle, isDarkMode, onThemeToggle }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchor(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notificationAnchor);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuOutlined />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: '#f8fafc',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Dashboard
          </Typography>
        </Box>

        {/* Center Section - Search */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: '#374151',
            '&:hover': {
              backgroundColor: '#4b5563',
            },
            marginLeft: 0,
            width: '100%',
            maxWidth: 400,
            display: { xs: 'none', md: 'block' },
            border: '1px solid #475569',
          }}
        >
          <Box
            sx={{
              padding: theme.spacing(0, 2),
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon sx={{ color: '#9ca3af' }} />
          </Box>
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{
              color: '#e5e7eb',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
                '&::placeholder': {
                  color: '#9ca3af',
                  opacity: 1,
                },
              },
            }}
          />
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Search Icon for Mobile */}
          <IconButton
            sx={{ 
              display: { xs: 'block', md: 'none' },
              color: '#e5e7eb',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* Theme Toggle */}
          <IconButton
            onClick={onThemeToggle}
            aria-label="toggle theme"
            sx={{
              color: '#e5e7eb',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Notifications */}
          <IconButton
            aria-label="notifications"
            onClick={handleNotificationMenuOpen}
            sx={{
              color: '#e5e7eb',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsOutlined />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <IconButton
            edge="end"
            aria-label="account"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{
              color: '#e5e7eb',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: theme.palette.primary.main 
              }}
            >
              JD
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 200,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              John Doe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              john.doe@company.com
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          id="notification-menu"
          anchorEl={notificationAnchor}
          open={isNotificationOpen}
          onClose={handleNotificationMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 320,
              maxHeight: 400,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleNotificationMenuClose}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                New user registered
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 minutes ago
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleNotificationMenuClose}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Server maintenance scheduled
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 hour ago
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleNotificationMenuClose}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Monthly report generated
              </Typography>
              <Typography variant="caption" color="text.secondary">
                3 hours ago
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={handleNotificationMenuClose}
            sx={{ justifyContent: 'center', color: 'primary.main' }}
          >
            <Typography variant="body2">View all notifications</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;