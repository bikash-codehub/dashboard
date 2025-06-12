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
  Grid,
  Divider,
  IconButton,
  Avatar,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  Update as UpdateIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixDisplayPageV2 = () => {
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
  const nextRefresh = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
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

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Minimalist Header */}
      <Box sx={{ mb: 3 }}>
        {/* Matrix Path Bar */}
        <Card sx={{ mb: 2, borderLeft: 4, borderColor: 'primary.main' }}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="primary" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                MATRIX PATH
              </Typography>
              <Typography 
                variant="h6" 
                fontFamily="monospace" 
                sx={{ 
                  fontSize: '1rem',
                  mt: 0.5,
                  wordBreak: 'break-all'
                }}
              >
                {matrixPath}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
              <Button
                variant="contained"
                size="medium"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={isRefreshing}
                sx={{ minWidth: 110 }}
              >
                {isRefreshing ? 'Syncing...' : 'Refresh'}
              </Button>
              
              <IconButton
                onClick={handleUserActionsClick}
                sx={{ 
                  border: 1, 
                  borderColor: 'divider',
                  '&:hover': { borderColor: 'primary.main' }
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserActionsClose}
              >
                <MenuItem onClick={handleUserActionsClose}>Export Data</MenuItem>
                <MenuItem onClick={handleUserActionsClose}>Configure Alerts</MenuItem>
                <MenuItem onClick={handleUserActionsClose}>View History</MenuItem>
                <Divider />
                <MenuItem onClick={handleUserActionsClose}>Settings</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Card>

        {/* Stats Cards Row */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <UpdateIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {lastUpdated.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <ScheduleIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Next Refresh
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {nextRefresh.toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card>
              <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <TimelineIcon />
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Frequency
                  </Typography>
                  <Chip 
                    label={frequency} 
                    color="success" 
                    size="small"
                    sx={{ mt: 0.5, fontWeight: 600 }}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Search Bar */}
        <Card>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search alerts across all fields..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
          </Box>
        </Card>
      </Box>

      {/* Alerts Table */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Alert Matrix
            </Typography>
            <Chip 
              label={`${filteredData.length} alerts`} 
              color="primary" 
              variant="outlined"
            />
          </Stack>
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

export default AlertsMatrixDisplayPageV2;