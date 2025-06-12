import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Tooltip,
  Alert,
  Divider,
  useTheme,
  Stack,
  Card,
  CardContent,
  Avatar,
  Badge
} from '@mui/material';
import {
  Search,
  Refresh,
  MoreVert,
  Schedule,
  Update,
  AccessTime,
  Route,
  FilterList,
  Download,
  Settings,
  Visibility,
  Edit,
  Pause,
  Stop,
  Timeline,
  Assessment,
  Security,
  NotificationsActive,
  Dashboard,
  TrendingUp
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixV5 = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [userActionsAnchor, setUserActionsAnchor] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [nextRefresh, setNextRefresh] = useState(new Date(Date.now() + 5 * 60 * 1000));
  const [frequency, setFrequency] = useState('5 minutes');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const alertsData = [
    {
      id: 1,
      alertId: 'ALT-001',
      severity: 'Critical',
      status: 'Active',
      message: 'Payment gateway circuit breaker activated - transaction failures at 98%',
      source: 'Payment-Gateway',
      timestamp: '2024-01-20 14:30:15',
      acknowledged: false,
      assignee: 'DevOps Team',
      category: 'Business Critical',
      priority: 'P1',
      duration: '2h 15m',
      occurrences: 156,
      matrixPath: '/api/v1/payments/process',
      traceKey: 'payment_id=12345, merchant_id=stripe_001'
    },
    {
      id: 2,
      alertId: 'ALT-002',
      severity: 'Critical',
      status: 'Active',
      message: 'Database connection pool exhausted - all 50 connections in use',
      source: 'DB-Primary',
      timestamp: '2024-01-20 14:25:42',
      acknowledged: true,
      assignee: 'Database Team',
      category: 'Infrastructure',
      priority: 'P1',
      duration: '1h 45m',
      occurrences: 89,
      matrixPath: '/api/v1/orders/create',
      traceKey: 'db_pool=primary, connections=50/50'
    },
    {
      id: 3,
      alertId: 'ALT-003',
      severity: 'Warning',
      status: 'Investigating',
      message: 'API response time degraded - 95th percentile exceeds 2s threshold',
      source: 'API-Gateway',
      timestamp: '2024-01-20 14:20:30',
      acknowledged: true,
      assignee: 'Performance Team',
      category: 'Performance',
      priority: 'P2',
      duration: '3h 20m',
      occurrences: 234,
      matrixPath: '/api/v1/users/profile',
      traceKey: 'endpoint=/profile, method=GET'
    },
    {
      id: 4,
      alertId: 'ALT-004',
      severity: 'Critical',
      status: 'Active',
      message: 'Authentication service unavailable - OAuth provider timeout',
      source: 'Auth-Service',
      timestamp: '2024-01-20 14:45:10',
      acknowledged: false,
      assignee: 'Security Team',
      category: 'Security',
      priority: 'P1',
      duration: '30m',
      occurrences: 78,
      matrixPath: '/api/v1/auth/login',
      traceKey: 'provider=oauth2, timeout=30s'
    },
    {
      id: 5,
      alertId: 'ALT-005',
      severity: 'Warning',
      status: 'Monitoring',
      message: 'Memory usage approaching critical threshold - 85% utilization',
      source: 'App-Server-03',
      timestamp: '2024-01-20 13:15:00',
      acknowledged: true,
      assignee: 'Infrastructure Team',
      category: 'Infrastructure',
      priority: 'P3',
      duration: '4h 45m',
      occurrences: 45,
      matrixPath: '/api/v1/analytics/reports',
      traceKey: 'server=app-03, memory=85%'
    },
    {
      id: 6,
      alertId: 'ALT-006',
      severity: 'Medium',
      status: 'Resolved',
      message: 'Cache hit ratio below optimal threshold - performance impact minimal',
      source: 'Redis-Cluster',
      timestamp: '2024-01-20 12:30:15',
      acknowledged: true,
      assignee: 'Cache Team',
      category: 'Performance',
      priority: 'P3',
      duration: '2h 15m',
      occurrences: 23,
      matrixPath: '/api/v1/products/search',
      traceKey: 'cache=redis, hit_ratio=75%'
    }
  ];

  const filteredAlerts = alertsData.filter(alert =>
    Object.values(alert).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns = [
    {
      id: 'alertId',
      label: 'Alert ID',
      minWidth: 100,
      render: (value) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'primary.main' }}>
          {value}
        </Typography>
      )
    },
    {
      id: 'severity',
      label: 'Severity',
      minWidth: 100,
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={
            value === 'Critical' ? 'error' :
            value === 'Warning' ? 'warning' :
            value === 'Medium' ? 'info' : 'success'
          }
          variant="filled"
        />
      )
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={
            value === 'Active' ? 'error' :
            value === 'Investigating' ? 'warning' :
            value === 'Resolved' ? 'success' : 'default'
          }
          variant="outlined"
        />
      )
    },
    {
      id: 'matrixPath',
      label: 'Matrix Path',
      minWidth: 200,
      render: (value) => (
        <Typography variant="body2" sx={{ 
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          color: 'text.primary',
          fontWeight: 500,
          backgroundColor: 'grey.50',
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid',
          borderColor: 'grey.200'
        }}>
          {value}
        </Typography>
      )
    },
    {
      id: 'message',
      label: 'Message',
      minWidth: 300,
      render: (value) => (
        <Typography variant="body2" sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 300
        }}>
          {value}
        </Typography>
      )
    },
    {
      id: 'source',
      label: 'Source',
      minWidth: 130,
      render: (value) => (
        <Chip label={value} size="small" variant="outlined" color="secondary" />
      )
    },
    {
      id: 'timestamp',
      label: 'Timestamp',
      minWidth: 150,
      render: (value) => (
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
          {value}
        </Typography>
      )
    },
    {
      id: 'assignee',
      label: 'Assignee',
      minWidth: 140,
      render: (value) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>{value}</Typography>
      )
    },
    {
      id: 'priority',
      label: 'Priority',
      minWidth: 80,
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={
            value === 'P1' ? 'error' :
            value === 'P2' ? 'warning' :
            value === 'P3' ? 'info' : 'default'
          }
        />
      )
    },
    {
      id: 'duration',
      label: 'Duration',
      minWidth: 100,
      align: 'center',
      render: (value) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
          {value}
        </Typography>
      )
    },
    {
      id: 'occurrences',
      label: 'Count',
      minWidth: 80,
      align: 'center',
      render: (value) => (
        <Badge badgeContent={value > 100 ? '100+' : null} color="error">
          <Typography variant="body2" sx={{ fontWeight: 600, color: value > 100 ? 'error.main' : 'text.primary' }}>
            {value}
          </Typography>
        </Badge>
      )
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setNextRefresh(new Date(Date.now() + 5 * 60 * 1000));
      setIsRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRefreshing) {
        handleRefresh();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isRefreshing]);

  const userActions = [
    { label: 'Export Alerts', icon: <Download />, action: () => console.log('Export') },
    { label: 'Advanced Filters', icon: <FilterList />, action: () => console.log('Filter') },
    { label: 'Dashboard Settings', icon: <Settings />, action: () => console.log('Settings') },
    { label: 'Alert Rules', icon: <Edit />, action: () => console.log('Rules') },
    { label: 'Analytics View', icon: <Assessment />, action: () => console.log('Analytics') },
    { divider: true },
    { label: 'Bulk Acknowledge', icon: <Visibility />, action: () => console.log('Acknowledge') },
    { label: 'Escalate Selected', icon: <Timeline />, action: () => console.log('Escalate') },
    { divider: true },
    { label: 'Maintenance Mode', icon: <Pause />, action: () => console.log('Maintenance') },
    { label: 'Emergency Stop', icon: <Stop />, action: () => console.log('Stop'), danger: true }
  ];

  const handleUserActionsClick = (event) => {
    setUserActionsAnchor(event.currentTarget);
  };

  const handleUserActionsClose = () => {
    setUserActionsAnchor(null);
  };

  const handleMenuAction = (action) => {
    action();
    handleUserActionsClose();
  };

  const criticalAlerts = alertsData.filter(alert => alert.severity === 'Critical' && alert.status === 'Active');
  const activeAlerts = alertsData.filter(alert => alert.status === 'Active');

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.50' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Modern Header Design */}
        <Card elevation={4} sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
          {/* Top Header Bar */}
          <Box sx={{
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 3
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              {/* Left Section - Matrix Path */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 48, height: 48 }}>
                  <Dashboard />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Alert Matrix Dashboard
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Route sx={{ fontSize: 16 }} />
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', opacity: 0.9 }}>
                      /alerts/production/comprehensive
                    </Typography>
                  </Stack>
                </Box>
              </Stack>

              {/* Right Section - Status & Actions */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1 }}>
                    {criticalAlerts.length}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Critical
                  </Typography>
                </Box>
                
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                
                <Stack spacing={1}>
                  <Tooltip title="Refresh Data">
                    <IconButton 
                      onClick={handleRefresh} 
                      disabled={isRefreshing}
                      sx={{ 
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                        animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' }
                        }
                      }}
                    >
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="User Actions">
                    <IconButton 
                      onClick={handleUserActionsClick} 
                      sx={{ 
                        color: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          {/* Control Cards Row */}
          <Box sx={{ p: 3, backgroundColor: 'white' }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              {/* Time Info Cards */}
              <Stack direction="row" spacing={2} flex={1}>
                <Card variant="outlined" sx={{ flex: 1, borderRadius: 2 }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Update sx={{ fontSize: 18, color: 'primary.main' }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        LAST UPDATED
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                      {lastUpdated.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ flex: 1, borderRadius: 2 }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Schedule sx={{ fontSize: 18, color: 'warning.main' }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        NEXT REFRESH
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                      {nextRefresh.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>

                <Card variant="outlined" sx={{ flex: 1, borderRadius: 2 }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <AccessTime sx={{ fontSize: 18, color: 'info.main' }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        FREQUENCY
                      </Typography>
                    </Stack>
                    <Chip 
                      label={frequency} 
                      size="small" 
                      color="info" 
                      variant="outlined"
                      sx={{ fontWeight: 600 }}
                    />
                  </CardContent>
                </Card>
              </Stack>

              {/* Search Card */}
              <Card variant="outlined" sx={{ flex: 2, borderRadius: 2 }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search alerts by ID, Matrix Path, Message, Source..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'grey.50'
                      }
                    }}
                  />
                  
                  <Stack direction="row" spacing={1} mt={1} justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {filteredAlerts.length} of {alertsData.length} alerts
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {[
                        { label: 'Critical', count: alertsData.filter(a => a.severity === 'Critical').length, color: 'error' },
                        { label: 'Active', count: alertsData.filter(a => a.status === 'Active').length, color: 'warning' },
                        { label: 'Resolved', count: alertsData.filter(a => a.status === 'Resolved').length, color: 'success' }
                      ].map(({ label, count, color }) => (
                        <Chip
                          key={label}
                          label={`${count}`}
                          size="small"
                          color={color}
                          variant="filled"
                          sx={{ minWidth: 24, height: 20, fontSize: '0.7rem' }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Card>

        {/* Alert Table */}
        <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ 
            p: 3, 
            borderBottom: 1, 
            borderColor: 'divider',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Alert Table
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Real-time system alerts monitoring
                </Typography>
              </Box>
              <TrendingUp sx={{ fontSize: 32, color: 'primary.main' }} />
            </Stack>
          </Box>

          <Table
            columns={columns}
            data={filteredAlerts}
            stickyHeader={true}
            pagination={true}
            defaultRowsPerPage={15}
            rowsPerPageOptions={[10, 15, 25, 50]}
            sortable={true}
            maxHeight={650}
            sx={{
              '& .MuiTableBody-root .MuiTableRow-root': {
                '&:hover': {
                  backgroundColor: 'rgba(103, 126, 234, 0.04)',
                  cursor: 'pointer',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease-in-out'
                },
                '&:has([data-severity="Critical"])': {
                  borderLeft: `4px solid ${theme.palette.error.main}`,
                  backgroundColor: 'rgba(244, 67, 54, 0.02)'
                }
              },
              '& .MuiTableHead-root': {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              },
              '& .MuiTableCell-head': {
                fontWeight: 700,
                fontSize: '0.875rem',
                color: 'white',
                borderBottom: 'none'
              },
              '& .MuiTableContainer-root': {
                borderRadius: 0
              }
            }}
          />
        </Card>

        {/* User Actions Menu */}
        <Menu
          anchorEl={userActionsAnchor}
          open={Boolean(userActionsAnchor)}
          onClose={handleUserActionsClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          slotProps={{
            paper: {
              sx: { 
                minWidth: 240,
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
              }
            }
          }}
        >
          {userActions.map((action, index) => 
            action.divider ? (
              <Divider key={index} />
            ) : (
              <MenuItem
                key={index}
                onClick={() => handleMenuAction(action.action)}
                sx={{
                  py: 1.5,
                  color: action.danger ? 'error.main' : 'inherit',
                  '&:hover': {
                    backgroundColor: action.danger ? 'error.light' : 'action.hover'
                  }
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {action.icon}
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {action.label}
                  </Typography>
                </Stack>
              </MenuItem>
            )
          )}
        </Menu>

        {/* Loading Indicator */}
        {isRefreshing && (
          <Alert 
            severity="info" 
            sx={{ 
              position: 'fixed', 
              bottom: 24, 
              right: 24, 
              minWidth: 320,
              zIndex: 1000,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Refreshing alerts matrix data...
            </Typography>
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default AlertsMatrixV5;