import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Tooltip,
  Alert,
  Divider,
  useTheme,
  Stack
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
  NotificationsActive
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixV3 = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [userActionsAnchor, setUserActionsAnchor] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [nextRefresh, setNextRefresh] = useState(new Date(Date.now() + 5 * 60 * 1000));
  const [frequency, setFrequency] = useState('5 minutes');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Enhanced alerts data
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
    },
    {
      id: 7,
      alertId: 'ALT-007',
      severity: 'Warning',
      status: 'Active',
      message: 'SSL certificate expiring in 7 days - renewal required',
      source: 'Load-Balancer',
      timestamp: '2024-01-20 09:30:15',
      acknowledged: false,
      assignee: 'Security Team',
      category: 'Security',
      priority: 'P2',
      duration: '7d',
      occurrences: 1,
      matrixPath: '/api/v1/*',
      traceKey: 'cert=wildcard.domain.com, expires=2024-01-27'
    }
  ];

  // Filter alerts based on search query
  const filteredAlerts = alertsData.filter(alert =>
    Object.values(alert).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Table columns configuration
  const columns = [
    {
      id: 'alertId',
      label: 'Alert ID',
      minWidth: 100,
      render: (value) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
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
          fontSize: '0.75rem',
          color: 'primary.main',
          fontWeight: 500
        }}>
          {value}
        </Typography>
      )
    },
    {
      id: 'message',
      label: 'Alert Message',
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
        <Chip label={value} size="small" variant="outlined" color="primary" />
      )
    },
    {
      id: 'timestamp',
      label: 'Timestamp',
      minWidth: 150,
      render: (value) => (
        <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
          {value}
        </Typography>
      )
    },
    {
      id: 'assignee',
      label: 'Assignee',
      minWidth: 140,
      render: (value) => (
        <Typography variant="body2">{value}</Typography>
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
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
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
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      )
    }
  ];

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setNextRefresh(new Date(Date.now() + 5 * 60 * 1000));
      setIsRefreshing(false);
    }, 1500);
  };

  // Auto refresh effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRefreshing) {
        handleRefresh();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isRefreshing]);

  // User actions menu items
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

  // Calculate alert statistics
  const criticalAlerts = alertsData.filter(alert => alert.severity === 'Critical' && alert.status === 'Active');
  const activeAlerts = alertsData.filter(alert => alert.status === 'Active');

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
        {/* Matrix Path Bar */}
        <Box sx={{ 
          px: 4, 
          py: 2.5, 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Route sx={{ fontSize: 28 }} />
              <Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Matrix Path: /alerts/production/comprehensive
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.9rem' }}>
                  Real-time system monitoring and alerting dashboard
                </Typography>
              </Box>
            </Box>
            
            {/* System Status Indicator */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <NotificationsActive sx={{ 
                fontSize: 24,
                animation: criticalAlerts.length > 0 ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.6 },
                  '100%': { opacity: 1 }
                }
              }} />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {criticalAlerts.length > 0 ? 'CRITICAL ALERTS' : 'OPERATIONAL'}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  {activeAlerts.length} Active Alerts
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Control Bar with Last Updated, Next Refresh, Frequency, Refresh, User Actions */}
        <Box sx={{ px: 4, py: 2, backgroundColor: 'grey.50' }}>
          <Grid container spacing={3} alignItems="center">
            {/* Last Updated */}
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Update sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Last Updated
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {lastUpdated.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Next Refresh */}
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Next Refresh
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {nextRefresh.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Frequency */}
            <Grid item xs={12} sm={6} md={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Frequency
                  </Typography>
                  <Chip label={frequency} size="small" color="info" variant="outlined" />
                </Box>
              </Stack>
            </Grid>

            {/* Refresh and User Actions */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                <Tooltip title="Refresh Data">
                  <IconButton 
                    onClick={handleRefresh} 
                    disabled={isRefreshing}
                    color="primary"
                    sx={{ 
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

                <Tooltip title="User Actions Menu">
                  <IconButton onClick={handleUserActionsClick} color="primary">
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Search Box Bar */}
        <Box sx={{ px: 4, py: 2, borderTop: 1, borderColor: 'divider' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search alerts by ID, Matrix Path, Message, Source, Assignee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
                sx={{ maxWidth: 600 }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center', mr: 1 }}>
                  {filteredAlerts.length} of {alertsData.length} alerts
                </Typography>
                
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
                    variant="outlined"
                    sx={{ minWidth: 30 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Alerts Table Body */}
      <Paper elevation={2} sx={{ overflow: 'hidden' }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', backgroundColor: 'grey.50' }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
            System Alerts Matrix
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comprehensive monitoring dashboard with real-time alert status and matrix path correlation
          </Typography>
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
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                cursor: 'pointer'
              },
              // Highlight critical alerts with left border
              '&:has([data-severity="Critical"])': {
                borderLeft: `4px solid ${theme.palette.error.main}`,
              }
            },
            '& .MuiTableHead-root': {
              backgroundColor: 'grey.100'
            },
            '& .MuiTableCell-head': {
              fontWeight: 600,
              fontSize: '0.875rem'
            }
          }}
        />
      </Paper>

      {/* User Actions Menu */}
      <Menu
        anchorEl={userActionsAnchor}
        open={Boolean(userActionsAnchor)}
        onClose={handleUserActionsClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: { minWidth: 220 }
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
                color: action.danger ? 'error.main' : 'inherit',
                '&:hover': {
                  backgroundColor: action.danger ? 'error.light' : 'action.hover'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {action.icon}
                <Typography variant="body2">{action.label}</Typography>
              </Box>
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
            bottom: 20, 
            right: 20, 
            minWidth: 280,
            zIndex: 1000 
          }}
        >
          Refreshing alerts matrix data...
        </Alert>
      )}
    </Container>
  );
};

export default AlertsMatrixV3;