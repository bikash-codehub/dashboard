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
  Link
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
  History as HistoryIcon
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixDisplayPageV3 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Sample alerts data
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
  const frequency = '5 minutes';

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
    }, 1000);
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
    <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Compact Header */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <Box sx={{ p: 2 }}>
          {/* Breadcrumb Navigation */}
          <Box sx={{ mb: 2 }}>
            <Breadcrumbs separator="/" sx={{ fontSize: '0.875rem' }}>
              <Link 
                underline="hover" 
                color="inherit" 
                href="#" 
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <HomeIcon sx={{ fontSize: 16 }} />
                Root
              </Link>
              {pathSegments.map((segment, index) => (
                <Link 
                  key={index}
                  underline="hover" 
                  color={index === pathSegments.length - 1 ? "primary" : "inherit"}
                  href="#"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    fontWeight: index === pathSegments.length - 1 ? 600 : 400
                  }}
                >
                  <FolderIcon sx={{ fontSize: 16 }} />
                  {segment}
                </Link>
              ))}
            </Breadcrumbs>
          </Box>

          {/* Main Control Bar */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2
          }}>
            {/* Left Side - Status Indicators */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Tooltip title="System Status">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <DotIcon sx={{ color: 'success.main', fontSize: 12 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Online
                  </Typography>
                </Box>
              </Tooltip>

              <Tooltip title={`Last updated: ${lastUpdated.toLocaleString()}`}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <UpdateIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {lastUpdated.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Tooltip>

              <Tooltip title={`Next refresh: ${nextRefresh.toLocaleString()}`}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {frequency}
                  </Typography>
                </Box>
              </Tooltip>

              <Badge badgeContent={filteredData.length} color="primary" max={999}>
                <Chip 
                  label="Active Alerts" 
                  size="small" 
                  variant="outlined"
                  color="primary"
                />
              </Badge>
            </Box>

            {/* Center - Search */}
            <Box sx={{ flex: 1, maxWidth: 400, mx: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Quick search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    backgroundColor: 'background.paper'
                  }
                }}
              />
            </Box>

            {/* Right Side - Actions */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <ButtonGroup variant="outlined" size="small">
                <Tooltip title="Refresh Data">
                  <Button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    sx={{ minWidth: 'auto', px: 1.5 }}
                  >
                    <RefreshIcon sx={{ fontSize: 18 }} />
                  </Button>
                </Tooltip>
                
                <Tooltip title="Export Data">
                  <Button sx={{ minWidth: 'auto', px: 1.5 }}>
                    <ExportIcon sx={{ fontSize: 18 }} />
                  </Button>
                </Tooltip>
                
                <Tooltip title="View History">
                  <Button sx={{ minWidth: 'auto', px: 1.5 }}>
                    <HistoryIcon sx={{ fontSize: 18 }} />
                  </Button>
                </Tooltip>
                
                <Button
                  onClick={handleUserActionsClick}
                  sx={{ minWidth: 'auto', px: 1.5 }}
                >
                  <SettingsIcon sx={{ fontSize: 18 }} />
                </Button>
              </ButtonGroup>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserActionsClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleUserActionsClose}>Configure Alerts</MenuItem>
                <MenuItem onClick={handleUserActionsClose}>Notification Settings</MenuItem>
                <MenuItem onClick={handleUserActionsClose}>User Preferences</MenuItem>
                <Divider />
                <MenuItem onClick={handleUserActionsClose}>Advanced Settings</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Alerts Table */}
      <Card variant="outlined">
        <Box sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 2 
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Alert Matrix
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredData.length} of {alertsData.length} alerts
              </Typography>
              {searchTerm && (
                <Chip 
                  label={`Filtered: "${searchTerm}"`}
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
    </Box>
  );
};

export default AlertsMatrixDisplayPageV3;