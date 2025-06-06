import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
  Divider,
  useTheme,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import {
  Home,
  Analytics,
  People,
  Settings,
  ShoppingBag,
  Description,
  BarChart,
  Group,
  Inventory,
  Payment,
  KeyboardArrowDown,
  KeyboardArrowRight,
  Menu,
  Close,
  Circle,
  Psychology,
  TableView,
  Assignment,
  NotificationsActive,
  DynamicForm,
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 64;

const navigationItems = [
  {
    id: 'home',
    title: 'Home',
    icon: <Home />,
    path: '/home',
  },
  {
    id: 'ai-analytics',
    title: 'AI Analytics',
    icon: <Psychology />,
    children: [
      { id: 'ai-analytics', title: 'Analytics Dashboard', path: '/ai-analytics' },
      { id: 'ai-analytics-v2', title: 'Analytics Hub', path: '/ai-analytics-v2' },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    icon: <Assignment />,
    children: [
      { id: 'table-demo', title: 'Table Demo', path: '/components/table' },
      { id: 'form-demo', title: 'Form Demo', path: '/components/form' },
      { id: 'form-generator', title: 'Form Generator', path: '/components/form-generator' },
      { id: 'engage-team', title: 'Engage Team', path: '/components/engage-team' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: <Analytics />,
    children: [
      { id: 'overview', title: 'Overview', path: '/analytics/overview' },
      { id: 'reports', title: 'Reports', path: '/analytics/reports' },
      { id: 'charts', title: 'Charts', path: '/analytics/charts' },
    ],
  },
  {
    id: 'users',
    title: 'Users',
    icon: <People />,
    children: [
      { id: 'all-users', title: 'All Users', path: '/users/all' },
      { id: 'roles', title: 'Roles', path: '/users/roles' },
      { id: 'permissions', title: 'Permissions', path: '/users/permissions' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    icon: <ShoppingBag />,
    children: [
      { id: 'products', title: 'Products', path: '/ecommerce/products' },
      { id: 'orders', title: 'Orders', path: '/ecommerce/orders' },
      { id: 'inventory', title: 'Inventory', path: '/ecommerce/inventory' },
      { id: 'payments', title: 'Payments', path: '/ecommerce/payments' },
    ],
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: <Description />,
    path: '/reports',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings />,
    path: '/settings',
  },
];

const Sidebar = ({ open, onClose, collapsed, onToggleCollapse, currentPage, onPageChange }) => {
  const theme = useTheme();
  const [expandedItems, setExpandedItems] = useState([]);
  const selectedItem = currentPage || 'home';

  const handleExpandClick = (itemId) => {
    if (collapsed) return;
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (itemId, path) => {
    if (onPageChange) {
      onPageChange(itemId);
    }
    console.log(`Navigate to: ${path}`);
  };

  const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  const renderNavItem = (item, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const isSelected = selectedItem === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isChild = level > 0;

    return (
      <Box key={item.id} sx={{ mb: 0.5 }}>
        <ListItemButton
          onClick={() => {
            if (hasChildren) {
              handleExpandClick(item.id);
            } else {
              handleItemClick(item.id, item.path);
            }
          }}
          sx={{
            minHeight: 44,
            px: collapsed ? 1 : 2,
            mx: collapsed ? 0.5 : 1,
            borderRadius: 2,
            mb: 0.5,
            backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
            color: isSelected ? 'white' : '#e4e7eb',
            '&:hover': {
              backgroundColor: isSelected 
                ? theme.palette.primary.dark 
                : 'rgba(255, 255, 255, 0.08)',
            },
            transition: 'all 0.2s ease-in-out',
            ...(isChild && {
              ml: collapsed ? 0.5 : 3,
              backgroundColor: isSelected ? theme.palette.primary.light : 'transparent',
              color: isSelected ? 'white' : '#cbd5e1',
            }),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 'auto' : 40,
              justifyContent: 'center',
              color: isSelected ? 'white' : '#9ca3af',
            }}
          >
            {isChild ? (
              <Circle sx={{ fontSize: 6 }} />
            ) : (
              item.icon
            )}
          </ListItemIcon>
          
          {!collapsed && (
            <>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: isChild ? '0.875rem' : '0.9rem',
                  fontWeight: isSelected ? 600 : 500,
                  color: 'inherit',
                }}
              />
              {hasChildren && (
                <KeyboardArrowDown
                  sx={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                    fontSize: '1.2rem',
                    color: '#9ca3af',
                  }}
                />
              )}
            </>
          )}
        </ListItemButton>

        {hasChildren && !collapsed && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => renderNavItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const drawerContent = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#1e293b',
    }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid #334155',
          minHeight: 64,
          backgroundColor: '#1e293b',
        }}
      >
        {!collapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                D
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              fontSize: '1.1rem',
              color: '#f8fafc',
            }}>
              Dashboard
            </Typography>
          </Box>
        )}
        
        <IconButton
          onClick={onToggleCollapse}
          size="small"
          sx={{
            backgroundColor: '#374151',
            color: '#e5e7eb',
            '&:hover': {
              backgroundColor: '#4b5563',
            },
          }}
        >
          {collapsed ? <KeyboardArrowRight /> : <Menu />}
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        py: 2,
        backgroundColor: '#1e293b',
      }}>
        <List>
          {navigationItems.map(item => renderNavItem(item))}
        </List>
      </Box>

      {/* Footer */}
      {!collapsed && (
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid #334155',
          backgroundColor: '#1e293b',
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1.5,
              backgroundColor: '#334155',
              borderRadius: 2,
              border: '1px solid #475569',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.palette.primary.main,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                JD
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ 
                fontWeight: 600,
                color: '#f8fafc',
              }}>
                John Doe
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Administrator
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
            backgroundColor: '#1e293b',
            borderRight: '1px solid #334155',
            overflowX: 'hidden',
            boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            backgroundColor: '#1e293b',
            borderRight: '1px solid #334155',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;