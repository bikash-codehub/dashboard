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
  Chip,
  Card,
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
  Dashboard,
  TrendingUp,
  Star,
} from '@mui/icons-material';

const HeaderV2 = ({ onMenuToggle, isDarkMode, onThemeToggle }) => {
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: 'none',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.15)',
        backdropFilter: 'blur(10px)',
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuToggle}
            sx={{ 
              mr: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              borderRadius: 2,
            }}
          >
            <MenuOutlined />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Dashboard sx={{ color: '#fff', fontSize: 28 }} />
            <Box>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.2,
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Analytics Hub
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Real-time insights
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            },
            marginLeft: 0,
            width: '100%',
            maxWidth: 450,
            display: { xs: 'none', md: 'block' },
            transition: 'all 0.3s ease',
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
            <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
          </Box>
          <InputBase
            placeholder="Search dashboards, metrics, users..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{
              color: '#fff',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: theme.spacing(1.5, 1.5, 1.5, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
                fontSize: '0.95rem',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            icon={<TrendingUp sx={{ fontSize: 16 }} />}
            label="Live"
            size="small"
            sx={{
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              color: '#4caf50',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: '#4caf50',
              },
            }}
          />

          <IconButton
            sx={{ 
              display: { xs: 'block', md: 'none' },
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <SearchIcon />
          </IconButton>

          <IconButton
            onClick={onThemeToggle}
            aria-label="toggle theme"
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              borderRadius: 2,
            }}
          >
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          <IconButton
            aria-label="notifications"
            onClick={handleNotificationMenuOpen}
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              borderRadius: 2,
            }}
          >
            <Badge 
              badgeContent={5} 
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff4757',
                  color: '#fff',
                  fontSize: '0.75rem',
                  minWidth: 18,
                  height: 18,
                }
              }}
            >
              <NotificationsOutlined />
            </Badge>
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>
                Sarah Johnson
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Admin
              </Typography>
            </Box>
            <IconButton
              edge="end"
              aria-label="account"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{
                p: 0.5,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
                borderRadius: 2,
              }}
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)',
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                SJ
              </Avatar>
            </IconButton>
          </Box>
        </Box>

        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          PaperProps={{
            elevation: 24,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 8px 32px rgba(0,0,0,0.15))',
              mt: 1.5,
              minWidth: 280,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              '& .MuiAvatar-root': {
                width: 40,
                height: 40,
                ml: -0.5,
                mr: 1.5,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 3, py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  width: 56, 
                  height: 56,
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%)',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                }}
              >
                SJ
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Sarah Johnson
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  sarah.johnson@company.com
                </Typography>
                <Chip
                  icon={<Star sx={{ fontSize: 14 }} />}
                  label="Premium"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: '#f3e5f5',
                    color: '#7b1fa2',
                    fontSize: '0.75rem',
                    height: 24,
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5, px: 3 }}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Profile Settings</Typography>
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5, px: 3 }}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Preferences</Typography>
            </ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5, px: 3, color: '#f44336' }}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: '#f44336' }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Logout</Typography>
            </ListItemText>
          </MenuItem>
        </Menu>

        <Menu
          id="notification-menu"
          anchorEl={notificationAnchor}
          open={isNotificationOpen}
          onClose={handleNotificationMenuClose}
          PaperProps={{
            elevation: 24,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 8px 32px rgba(0,0,0,0.15))',
              mt: 1.5,
              minWidth: 380,
              maxHeight: 480,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Notifications
              </Typography>
              <Chip 
                label="5 new" 
                size="small" 
                color="primary" 
                sx={{ fontSize: '0.75rem' }}
              />
            </Box>
          </Box>
          
          <Box sx={{ maxHeight: 320, overflowY: 'auto' }}>
            <MenuItem onClick={handleNotificationMenuClose} sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#4caf50', fontSize: '0.8rem' }}>
                    A
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      System Alert: High CPU Usage
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Server load exceeded 85% threshold
                    </Typography>
                    <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                      2 minutes ago
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </MenuItem>
            
            <MenuItem onClick={handleNotificationMenuClose} sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#2196f3', fontSize: '0.8rem' }}>
                    U
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      New User Registration
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      john.smith@email.com joined the platform
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      15 minutes ago
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </MenuItem>
            
            <MenuItem onClick={handleNotificationMenuClose} sx={{ px: 3, py: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff9800', fontSize: '0.8rem' }}>
                    R
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Monthly Report Ready
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Analytics report for November is now available
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      1 hour ago
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </MenuItem>
          </Box>
          
          <Box sx={{ px: 3, py: 2, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <MenuItem 
              onClick={handleNotificationMenuClose}
              sx={{ 
                justifyContent: 'center', 
                color: 'primary.main',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                }
              }}
            >
              <Typography variant="body2">View All Notifications</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderV2;