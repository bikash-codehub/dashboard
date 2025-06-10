import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Tooltip,
  Alert,
  Divider,
  useTheme
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
  Stop
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [userActionsAnchor, setUserActionsAnchor] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [nextRefresh, setNextRefresh] = useState(new Date(Date.now() + 5 * 60 * 1000)); // 5 minutes from now
  const [frequency, setFrequency] = useState('5 minutes');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample alerts data
  const alertsData = [
    {
      id: 1,
      alertId: 'ALT-001',
      severity: 'Critical',
      status: 'Active',
      message: 'Database connection timeout exceeded',
      source: 'DB-Primary',
      timestamp: '2024-01-20 14:30:15',
      acknowledged: false,
      assignee: 'John Doe',
      category: 'Infrastructure',
      priority: 'P1',
      duration: '2h 15m',
      occurrences: 15
    },
    {
      id: 2,
      alertId: 'ALT-002',
      severity: 'Warning',
      status: 'Investigating',
      message: 'High memory usage detected on server-03',
      source: 'SRV-03',
      timestamp: '2024-01-20 14:25:42',
      acknowledged: true,
      assignee: 'Jane Smith',
      category: 'Performance',
      priority: 'P2',
      duration: '1h 45m',
      occurrences: 8
    },
    {
      id: 3,
      alertId: 'ALT-003',
      severity: 'Medium',
      status: 'Resolved',
      message: 'API endpoint response time degraded',
      source: 'API-Gateway',
      timestamp: '2024-01-20 13:15:30',
      acknowledged: true,
      assignee: 'Mike Johnson',
      category: 'Application',
      priority: 'P3',
      duration: '3h 20m',
      occurrences: 23
    },
    {
      id: 4,
      alertId: 'ALT-004',
      severity: 'Critical',
      status: 'Active',
      message: 'Payment processing service unavailable',
      source: 'Payment-SVC',
      timestamp: '2024-01-20 14:45:10',
      acknowledged: false,
      assignee: 'Sarah Wilson',
      category: 'Business Critical',
      priority: 'P1',
      duration: '30m',
      occurrences: 5
    },
    {
      id: 5,
      alertId: 'ALT-005',
      severity: 'Low',
      status: 'Monitoring',
      message: 'Disk space usage approaching threshold',
      source: 'Storage-01',
      timestamp: '2024-01-20 12:00:00',
      acknowledged: true,
      assignee: 'Tom Brown',
      category: 'Infrastructure',
      priority: 'P4',
      duration: '6h 45m',
      occurrences: 3
    },
    {
      id: 6,
      alertId: 'ALT-006',
      severity: 'Warning',
      status: 'Active',
      message: 'SSL certificate expiring in 7 days',
      source: 'Web-Server',
      timestamp: '2024-01-20 09:30:15',
      acknowledged: false,
      assignee: 'Lisa Davis',
      category: 'Security',
      priority: 'P2',
      duration: '7d',
      occurrences: 1
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
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
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
      minWidth: 120,
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
      minWidth: 120,
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
    // Simulate refresh delay
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
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isRefreshing]);

  // User actions menu items
  const userActions = [
    { label: 'Export Data', icon: <Download />, action: () => console.log('Export') },
    { label: 'Filter Settings', icon: <FilterList />, action: () => console.log('Filter') },
    { label: 'View Settings', icon: <Visibility />, action: () => console.log('View') },
    { label: 'Edit Matrix', icon: <Edit />, action: () => console.log('Edit') },
    { label: 'Configuration', icon: <Settings />, action: () => console.log('Settings') },
    { divider: true },
    { label: 'Pause Monitoring', icon: <Pause />, action: () => console.log('Pause') },
    { label: 'Stop Monitoring', icon: <Stop />, action: () => console.log('Stop'), danger: true }
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

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header Section */}
      <Paper elevation={2} sx={{ mb: 3, overflow: 'hidden' }}>
        {/* Matrix Path */}
        <Box sx={{ 
          px: 3, 
          py: 2, 
          backgroundColor: theme.palette.primary.main, 
          color: 'white' 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Route sx={{ fontSize: 20 }} />
            <Typography variant="h6" component="h1" sx={{ fontWeight: 500 }}>
              Matrix Path: /alerts/production/infrastructure
            </Typography>
          </Box>
        </Box>

        {/* Status Bar */}
        <Box sx={{ px: 3, py: 2, backgroundColor: 'grey.50' }}>
          <Grid container spacing={2} alignItems="center">
            {/* Timestamps and Frequency */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Update sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Last Updated:
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {lastUpdated.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Next Refresh:
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                    {nextRefresh.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Frequency:
                  </Typography>
                  <Chip label={frequency} size="small" color="info" variant="outlined" />
                </Box>
              </Box>
            </Grid>

            {/* Controls */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
                <Tooltip title="Refresh Now">
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

        {/* Search and Controls Bar */}
        <Box sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search alerts by ID, message, source, assignee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
                sx={{ maxWidth: 400 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                  {filteredAlerts.length} of {alertsData.length} alerts
                </Typography>
                
                {/* Active Alerts Summary */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[
                    { label: 'Critical', count: alertsData.filter(a => a.severity === 'Critical').length, color: 'error' },
                    { label: 'Warning', count: alertsData.filter(a => a.severity === 'Warning').length, color: 'warning' },
                    { label: 'Active', count: alertsData.filter(a => a.status === 'Active').length, color: 'info' }
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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Alerts Table */}
      <Paper elevation={1}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h2">
            Alerts Matrix - Production Infrastructure
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time monitoring dashboard for system alerts and incidents
          </Typography>
        </Box>

        <Table
          columns={columns}
          data={filteredAlerts}
          stickyHeader={true}
          pagination={true}
          defaultRowsPerPage={10}
          rowsPerPageOptions={[10, 25, 50, 100]}
          sortable={true}
          maxHeight={600}
          sx={{
            '& .MuiTableBody-root .MuiTableRow-root': {
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
              // Highlight critical alerts
              '&:has([data-severity="Critical"])': {
                borderLeft: `4px solid ${theme.palette.error.main}`,
              }
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
        PaperProps={{
          sx: { minWidth: 200 }
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

      {/* Status Indicator */}
      {isRefreshing && (
        <Alert 
          severity="info" 
          sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20, 
            minWidth: 250,
            zIndex: 1000 
          }}
        >
          Refreshing alerts data...
        </Alert>
      )}
    </Container>
  );
};

export default AlertsMatrixPage;