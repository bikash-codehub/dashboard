import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
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
  Card,
  CardContent
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
  Delete,
  PlayArrow,
  Pause,
  Stop,
  Timeline,
  Assessment,
  Security
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixVariant = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [userActionsAnchor, setUserActionsAnchor] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [nextRefresh, setNextRefresh] = useState(new Date(Date.now() + 5 * 60 * 1000));
  const [frequency, setFrequency] = useState('5 minutes');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample alerts data with enhanced information
  const alertsData = [
    {
      id: 1,
      alertId: 'ALT-001',
      severity: 'Critical',
      status: 'Active',
      message: 'Payment service circuit breaker triggered - 95% failure rate detected',
      source: 'Payment-Gateway',
      timestamp: '2024-01-20 14:30:15',
      acknowledged: false,
      assignee: 'DevOps Team',
      category: 'Business Critical',
      priority: 'P1',
      duration: '2h 15m',
      occurrences: 156,
      matrixPath: '/api/v1/payments/process',
      traceKey: 'payment_id=12345, merchant_id=stripe_001',
      resolution: 'Pending',
      escalated: true
    },
    {
      id: 2,
      alertId: 'ALT-002',
      severity: 'Critical',
      status: 'Active',
      message: 'Database connection pool exhausted - all connections in use',
      source: 'DB-Primary',
      timestamp: '2024-01-20 14:25:42',
      acknowledged: true,
      assignee: 'Database Team',
      category: 'Infrastructure',
      priority: 'P1',
      duration: '1h 45m',
      occurrences: 89,
      matrixPath: '/api/v1/orders/create',
      traceKey: 'db_pool=primary, connections=50/50',
      resolution: 'In Progress',
      escalated: true
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
      traceKey: 'endpoint=/profile, method=GET',
      resolution: 'Investigating',
      escalated: false
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
      traceKey: 'provider=oauth2, timeout=30s',
      resolution: 'Pending',
      escalated: false
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
      traceKey: 'server=app-03, memory=85%',
      resolution: 'Monitoring',
      escalated: false
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
      traceKey: 'cache=redis, hit_ratio=75%',
      resolution: 'Auto-Resolved',
      escalated: false
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
      traceKey: 'cert=wildcard.domain.com, expires=2024-01-27',
      resolution: 'Pending',
      escalated: false
    },
    {
      id: 8,
      alertId: 'ALT-008',
      severity: 'Low',
      status: 'Monitoring',
      message: 'Backup process completed with warnings - non-critical files skipped',
      source: 'Backup-Service',
      timestamp: '2024-01-20 02:00:00',
      acknowledged: true,
      assignee: 'Operations Team',
      category: 'Operations',
      priority: 'P4',
      duration: '10h',
      occurrences: 3,
      matrixPath: '/internal/backup/nightly',
      traceKey: 'backup_id=nightly_20240120, warnings=5',
      resolution: 'Acknowledged',
      escalated: false
    }
  ];

  // Filter alerts based on search query
  const filteredAlerts = alertsData.filter(alert =>
    Object.values(alert).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Enhanced table columns configuration
  const columns = [
    {
      id: 'alertId',
      label: 'Alert ID',
      minWidth: 100,
      render: (value, row) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
            {value}
          </Typography>
          {row.escalated && (
            <Chip label="ESCALATED" size="small" color="error" variant="filled" sx={{ fontSize: '0.6rem', height: 16 }} />
          )}
        </Box>
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
      minWidth: 350,
      render: (value) => (
        <Typography variant="body2" sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 350
        }}>
          {value}
        </Typography>
      )
    },
    {
      id: 'traceKey',
      label: 'Trace Key/Values',
      minWidth: 250,
      render: (value) => (
        <Typography variant="caption" sx={{ 
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: 'text.secondary',
          wordBreak: 'break-all'
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
    },
    {
      id: 'resolution',
      label: 'Resolution',
      minWidth: 120,
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={
            value === 'Auto-Resolved' ? 'success' :
            value === 'In Progress' ? 'warning' :
            value === 'Pending' ? 'error' : 'default'
          }
          variant="outlined"
        />
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
  const warningAlerts = alertsData.filter(alert => alert.severity === 'Warning' && alert.status === 'Active');
  const escalatedAlerts = alertsData.filter(alert => alert.escalated);
  const unacknowledgedAlerts = alertsData.filter(alert => !alert.acknowledged);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section with All Controls */}
      <Paper elevation={3} sx={{ mb: 3, overflow: 'hidden' }}>
        {/* Matrix Path and System Status */}
        <Box sx={{ 
          px: 3, 
          py: 2.5, 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white'
        }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Route sx={{ fontSize: 24 }} />
                <Box>
                  <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Matrix Path: /alerts/production/comprehensive
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Real-time monitoring dashboard for critical system alerts
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            {/* Real-time Alert Status Indicators */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1, mt: { xs: 2, md: 0 } }}>
                <Chip
                  label={`${criticalAlerts.length} Critical`}
                  size="small"
                  sx={{ 
                    backgroundColor: criticalAlerts.length > 0 ? 'error.main' : 'success.main',
                    color: 'white',
                    fontWeight: 600,
                    animation: criticalAlerts.length > 0 ? 'pulse 2s infinite' : 'none',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                      '100%': { opacity: 1 }
                    }
                  }}
                />
                <Chip
                  label={`${escalatedAlerts.length} Escalated`}
                  size="small"
                  sx={{ 
                    backgroundColor: escalatedAlerts.length > 0 ? 'warning.main' : 'grey.500',
                    color: 'white',
                    fontWeight: 600
                  }}
                />
                <Chip
                  label={`${unacknowledgedAlerts.length} Unack`}
                  size="small"
                  sx={{ 
                    backgroundColor: unacknowledgedAlerts.length > 0 ? 'info.main' : 'grey.500',
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Timestamps, Frequency, and Controls */}
        <Box sx={{ px: 3, py: 2, backgroundColor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
          <Grid container spacing={2} alignItems="center">
            {/* Last Updated, Next Refresh, Frequency */}
            <Grid item xs={12} lg={8}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Update sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">Last Updated:</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {lastUpdated.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">Next Refresh:</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {nextRefresh.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">Frequency:</Typography>
                  <Chip label={frequency} size="small" color="info" variant="outlined" />
                </Box>
              </Box>
            </Grid>

            {/* Refresh and User Actions */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', lg: 'flex-end' }, gap: 1 }}>
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

                <Tooltip title="User Actions">
                  <IconButton onClick={handleUserActionsClick} color="primary">
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Search Box and Quick Stats */}
        <Box sx={{ px: 3, py: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by Alert ID, Matrix Path, Message, Source, Assignee, or Trace Keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
                sx={{ maxWidth: 500 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center', mr: 1 }}>
                  {filteredAlerts.length} of {alertsData.length} alerts
                </Typography>
                
                {[
                  { label: 'Critical', count: alertsData.filter(a => a.severity === 'Critical').length, color: 'error' },
                  { label: 'Warning', count: alertsData.filter(a => a.severity === 'Warning').length, color: 'warning' },
                  { label: 'Active', count: alertsData.filter(a => a.status === 'Active').length, color: 'info' },
                  { label: 'Resolved', count: alertsData.filter(a => a.status === 'Resolved').length, color: 'success' }
                ].map(({ label, count, color }) => (
                  <Chip
                    key={label}
                    label={`${label}: ${count}`}
                    size="small"
                    color={color}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Alerts Table Body */}
      <Paper elevation={2}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                System Alerts Matrix
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive view of all system alerts with matrix path correlation and trace analysis
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button startIcon={<Assessment />} variant="outlined" size="small">
                  Analytics
                </Button>
                <Button startIcon={<Timeline />} variant="outlined" size="small">
                  Timeline
                </Button>
                <Button startIcon={<Security />} variant="contained" size="small" color="primary">
                  Security View
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Table
          columns={columns}
          data={filteredAlerts}
          stickyHeader={true}
          pagination={true}
          defaultRowsPerPage={15}
          rowsPerPageOptions={[10, 15, 25, 50, 100]}
          sortable={true}
          maxHeight={700}
          sx={{
            '& .MuiTableBody-root .MuiTableRow-root': {
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
              // Highlight critical alerts
              '&:has([data-severity="Critical"])': {
                borderLeft: `4px solid ${theme.palette.error.main}`,
              },
              // Highlight escalated alerts
              '&:has(.escalated)': {
                backgroundColor: 'rgba(244, 67, 54, 0.02)',
              }
            },
            '& .MuiTableHead-root': {
              backgroundColor: 'grey.50'
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
            minWidth: 300,
            zIndex: 1000 
          }}
        >
          Refreshing alerts matrix data...
        </Alert>
      )}
    </Container>
  );
};

export default AlertsMatrixVariant;