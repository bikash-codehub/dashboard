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
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  Update as UpdateIcon
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixDisplayPage = () => {
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
      <Card elevation={2} sx={{ mb: 3 }}>
        <Box sx={{ p: 3 }}>
          {/* Matrix Path and Actions Row */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 3
          }}>
            {/* Matrix Path */}
            <Box sx={{ flex: 1, mr: 4 }}>
              <Typography 
                variant="overline" 
                color="primary" 
                sx={{ 
                  fontWeight: 700,
                  letterSpacing: 1,
                  display: 'block',
                  mb: 1
                }}
              >
                Matrix Path
              </Typography>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 1.5,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  wordBreak: 'break-all',
                  backgroundColor: 'grey.50'
                }}
              >
                {matrixPath}
              </Paper>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={isRefreshing}
                sx={{ 
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>

              <Button
                variant="outlined"
                endIcon={<MoreVertIcon />}
                onClick={handleUserActionsClick}
                sx={{ 
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  }
                }}
              >
                Actions
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserActionsClose}
                elevation={8}
              >
                <MenuItem onClick={handleUserActionsClose}>Export Data</MenuItem>
                <MenuItem onClick={handleUserActionsClose}>Configure Alerts</MenuItem>
                <MenuItem onClick={handleUserActionsClose}>View History</MenuItem>
                <Divider />
                <MenuItem onClick={handleUserActionsClose}>Settings</MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Status and Search Row */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2.5,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              gap: 4
            }}
          >
            {/* Status Information */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <UpdateIcon color="primary" sx={{ fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                    LAST UPDATED
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {lastUpdated.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Divider orientation="vertical" flexItem />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ScheduleIcon color="secondary" sx={{ fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                    NEXT REFRESH
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                    {nextRefresh.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Divider orientation="vertical" flexItem />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                    FREQUENCY
                  </Typography>
                  <Chip 
                    label={frequency} 
                    color="success" 
                    size="medium"
                    sx={{ 
                      fontWeight: 700,
                      mt: 0.5,
                      fontSize: '0.875rem'
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Search */}
            <Box sx={{ minWidth: 350 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search alerts by ID, path, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" sx={{ fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontWeight: 500,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2,
                    }
                  }
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Card>

      <Divider sx={{ mb: 3 }} />

      {/* Alerts Table */}
      <Card>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Alerts Matrix ({filteredData.length} alerts)
          </Typography>
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

export default AlertsMatrixDisplayPage;