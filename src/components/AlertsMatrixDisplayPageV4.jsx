import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Menu,
  MenuItem,
  Chip,
  InputAdornment,
  Divider,
  Badge,
  Tooltip,
  ButtonGroup,
  Breadcrumbs,
  Link,
  Avatar,
  AvatarGroup,
  LinearProgress,
  IconButton,
  Paper,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  Update as UpdateIcon,
  FiberManualRecord as DotIcon,
  Home as HomeIcon,
  Folder as FolderIcon,
  Settings as SettingsIcon,
  GetApp as ExportIcon,
  History as HistoryIcon,
  Dashboard,
  Notifications,
  Security,
  Speed,
  TrendingUp,
  Warning,
  CheckCircle,
  Error as ErrorIcon,
  FilterList,
  Visibility,
  NotificationsActive
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixDisplayPageV4 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const [alertsData] = useState([
    {
      id: 'ALT-001',
      matrixPath: '/production/api/authentication',
      source: 'API Gateway',
      severity: 'Critical',
      priority: 'P1',
      status: 'Active',
      timestamp: '2024-12-06T10:30:00Z',
      description: 'Authentication service experiencing high latency',
      assignee: 'John Doe'
    },
    {
      id: 'ALT-002',
      matrixPath: '/production/database/connection',
      source: 'Database Monitor',
      severity: 'Warning',
      priority: 'P2',
      status: 'Investigating',
      timestamp: '2024-12-06T10:25:00Z',
      description: 'Database connection pool reaching capacity',
      assignee: 'Jane Smith'
    },
    {
      id: 'ALT-003',
      matrixPath: '/production/web/frontend',
      source: 'Frontend Monitor',
      severity: 'Medium',
      priority: 'P2',
      status: 'Monitoring',
      timestamp: '2024-12-06T10:20:00Z',
      description: 'Frontend load times slightly elevated',
      assignee: 'Mike Johnson'
    },
    {
      id: 'ALT-004',
      matrixPath: '/staging/api/payments',
      source: 'Payment Gateway',
      severity: 'Low',
      priority: 'P3',
      status: 'Resolved',
      timestamp: '2024-12-06T10:15:00Z',
      description: 'Minor payment processing delay resolved',
      assignee: 'Sarah Wilson'
    }
  ]);

  const matrixPath = '/production/alerts/matrix';
  const nextRefresh = new Date(Date.now() + 5 * 60 * 1000);
  const frequency = '30 seconds';

  const handleUserActionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserActionsClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastUpdated(new Date());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'error';
      case 'Warning': return 'warning';
      case 'Medium': return 'info';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'error';
      case 'Investigating': return 'warning';
      case 'Monitoring': return 'info';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  const criticalCount = alertsData.filter(a => a.severity === 'Critical').length;
  const activeCount = alertsData.filter(a => a.status === 'Active').length;
  const resolvedCount = alertsData.filter(a => a.status === 'Resolved').length;

  const columns = [
    {
      id: 'id',
      label: 'Alert ID',
      minWidth: 100,
      render: (value) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          {value}
        </Typography>
      )
    },
    {
      id: 'matrixPath',
      label: 'Matrix Path',
      minWidth: 200,
      render: (value) => (
        <Typography variant="body2" fontFamily="monospace" color="text.secondary">
          {value}
        </Typography>
      )
    },
    {
      id: 'source',
      label: 'Source',
      minWidth: 150
    },
    {
      id: 'severity',
      label: 'Severity',
      minWidth: 100,
      render: (value) => (
        <Chip
          label={value}
          color={getSeverityColor(value)}
          size="small"
          variant="filled"
        />
      )
    },
    {
      id: 'priority',
      label: 'Priority',
      minWidth: 80,
      render: (value) => (
        <Chip
          label={value}
          color={value === 'P1' ? 'error' : value === 'P2' ? 'warning' : 'info'}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: (value) => (
        <Chip
          label={value}
          color={getStatusColor(value)}
          size="small"
          variant="filled"
        />
      )
    },
    {
      id: 'timestamp',
      label: 'Timestamp',
      minWidth: 150,
      type: 'datetime'
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 250
    },
    {
      id: 'assignee',
      label: 'Assignee',
      minWidth: 120,
      render: (value) => (
        <Typography variant="body2" color="text.primary">
          {value}
        </Typography>
      )
    }
  ];

  const filteredData = alertsData.filter(alert =>
    Object.values(alert).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pathSegments = matrixPath.split('/').filter(Boolean);

  return (
    <Box sx={{ p: 3, backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      {/* Hero Header */}
      <Paper 
        elevation={0}
        sx={{ 
          mb: 3, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.1
          }}
        />
        
        <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          {/* Top Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  width: 56, 
                  height: 56, 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Security sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Alert Matrix Control Center
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Real-time monitoring and incident management
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.8rem' } }}>
                <Avatar sx={{ bgcolor: '#ff6b6b' }}>JD</Avatar>
                <Avatar sx={{ bgcolor: '#4ecdc4' }}>JS</Avatar>
                <Avatar sx={{ bgcolor: '#45b7d1' }}>MJ</Avatar>
                <Avatar sx={{ bgcolor: '#f9ca24' }}>SW</Avatar>
              </AvatarGroup>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                4 Engineers Online
              </Typography>
            </Box>
          </Box>

          {/* Breadcrumb Navigation with Enhanced Design */}
          <Box sx={{ mb: 3 }}>
            <Breadcrumbs 
              separator="/"
              sx={{ 
                fontSize: '0.875rem',
                '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.7)' }
              }}
            >
              <Link 
                underline="hover" 
                color="inherit" 
                href="#" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  opacity: 0.8,
                  '&:hover': { opacity: 1 }
                }}
              >
                <HomeIcon sx={{ fontSize: 16 }} />
                Operations
              </Link>
              {pathSegments.map((segment, index) => (
                <Link 
                  key={index}
                  underline="hover" 
                  color="inherit"
                  href="#"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    fontWeight: index === pathSegments.length - 1 ? 600 : 400,
                    opacity: index === pathSegments.length - 1 ? 1 : 0.8,
                    '&:hover': { opacity: 1 }
                  }}
                >
                  <FolderIcon sx={{ fontSize: 16 }} />
                  {segment}
                </Link>
              ))}
            </Breadcrumbs>
          </Box>

          {/* Stats Cards */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: 'rgba(255,255,255,0.15)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                minWidth: 140
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <ErrorIcon sx={{ color: '#ff4757', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Critical
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {criticalCount}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Requires immediate action
              </Typography>
            </Paper>

            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: 'rgba(255,255,255,0.15)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                minWidth: 140
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <NotificationsActive sx={{ color: '#ffa726', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Active
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {activeCount}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Currently being handled
              </Typography>
            </Paper>

            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: 'rgba(255,255,255,0.15)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                minWidth: 140
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CheckCircle sx={{ color: '#2ed573', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Resolved
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {resolvedCount}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Successfully completed
              </Typography>
            </Paper>

            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: 'rgba(255,255,255,0.15)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 3,
                minWidth: 180
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Speed sx={{ color: '#1dd1a1', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Response Time
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                1.2s
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ 
                  mt: 1, 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': { bgcolor: '#2ed573' }
                }}
              />
            </Paper>
          </Box>

          {/* Enhanced Control Bar */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2
          }}>
            {/* System Status with Real-time Updates */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                px: 2,
                py: 1,
                bgcolor: 'rgba(46, 213, 115, 0.2)',
                borderRadius: 2,
                border: '1px solid rgba(46, 213, 115, 0.3)'
              }}>
                <DotIcon sx={{ color: '#2ed573', fontSize: 12, animation: 'pulse 2s infinite' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  All Systems Operational
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.9 }}>
                <UpdateIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  Last sync: {lastUpdated.toLocaleTimeString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.9 }}>
                <ScheduleIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">
                  Auto-refresh: {frequency}
                </Typography>
              </Box>
            </Box>

            {/* Enhanced Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                onClick={handleRefresh}
                disabled={isRefreshing}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  },
                  minWidth: 'auto',
                  px: 2
                }}
                startIcon={<RefreshIcon />}
              >
                {isRefreshing ? 'Syncing...' : 'Refresh'}
              </Button>

              <IconButton
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                <FilterList />
              </IconButton>

              <IconButton
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                <ExportIcon />
              </IconButton>

              <IconButton
                onClick={handleUserActionsClick}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Progress Bar for Auto-refresh */}
        {isRefreshing && (
          <LinearProgress 
            sx={{ 
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              '& .MuiLinearProgress-bar': {
                bgcolor: 'rgba(255,255,255,0.8)'
              },
              bgcolor: 'rgba(255,255,255,0.2)'
            }}
          />
        )}
      </Paper>

      {/* Enhanced Search Bar */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search alerts by ID, path, source, description, or assignee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <Chip 
                    label={`${filteredData.length} results`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'background.paper'
              }
            }}
          />
        </Box>
      </Card>

      {/* Alerts Table */}
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 3
          }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Alert Matrix Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive view of all system alerts and incidents
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {filteredData.length} of {alertsData.length} alerts
              </Typography>
              {searchTerm && (
                <Chip 
                  label={`"${searchTerm}"`}
                  size="small"
                  onDelete={() => setSearchTerm('')}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>
          <Table
            columns={columns}
            data={filteredData}
            pagination
            sortable
            rowsPerPageOptions={[10, 25, 50]}
            defaultRowsPerPage={10}
          />
        </Box>
      </Card>

      {/* Settings Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserActionsClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 220,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }
        }}
      >
        <MenuItem onClick={handleUserActionsClose}>
          <Dashboard sx={{ mr: 2, fontSize: 20 }} />
          Dashboard Settings
        </MenuItem>
        <MenuItem onClick={handleUserActionsClose}>
          <Notifications sx={{ mr: 2, fontSize: 20 }} />
          Alert Preferences
        </MenuItem>
        <MenuItem onClick={handleUserActionsClose}>
          <Visibility sx={{ mr: 2, fontSize: 20 }} />
          View Options
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleUserActionsClose}>
          <SettingsIcon sx={{ mr: 2, fontSize: 20 }} />
          Advanced Configuration
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AlertsMatrixDisplayPageV4;