import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
  Button,
  Card,
  CardContent,
  Grid,
  Fade,
  Slide
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  Update as UpdateIcon,
  Timeline as TimelineIcon,
  Circle as CircleIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const AlertsDisplayPage = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [nextRefresh, setNextRefresh] = useState(300);

  // Sample alerts data
  const [alerts] = useState([
    {
      id: 1,
      alertId: 'ALT-2024-001',
      severity: 'Critical',
      status: 'Active',
      message: 'Database connection timeout detected',
      source: 'api.payment.service',
      timestamp: '2024-11-06 10:45:23',
      assignee: 'John Doe',
      priority: 'P1',
      duration: '15m 32s',
      count: 47
    },
    {
      id: 2,
      alertId: 'ALT-2024-002',
      severity: 'Warning',
      status: 'Investigating',
      message: 'High memory usage on web server',
      source: 'web.frontend.cluster',
      timestamp: '2024-11-06 10:42:15',
      assignee: 'Jane Smith',
      priority: 'P2',
      duration: '18m 40s',
      count: 23
    },
    {
      id: 3,
      alertId: 'ALT-2024-003',
      severity: 'Medium',
      status: 'Monitoring',
      message: 'Unusual API response times',
      source: 'api.user.service',
      timestamp: '2024-11-06 10:38:12',
      assignee: 'Mike Johnson',
      priority: 'P3',
      duration: '22m 53s',
      count: 12
    },
    {
      id: 4,
      alertId: 'ALT-2024-004',
      severity: 'Low',
      status: 'Resolved',
      message: 'Disk space cleanup completed',
      source: 'storage.backup.service',
      timestamp: '2024-11-06 10:35:47',
      assignee: 'Sarah Wilson',
      priority: 'P4',
      duration: '25m 18s',
      count: 5
    }
  ]);

  const matrixPath = '/alerts/production/comprehensive';
  const frequency = '5 minutes';

  // Countdown timer for next refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setNextRefresh(prev => {
        if (prev <= 1) {
          setLastUpdated(new Date());
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return theme.palette.error.main;
      case 'Warning': return theme.palette.warning.main;
      case 'Medium': return theme.palette.info.main;
      case 'Low': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return theme.palette.error.main;
      case 'Investigating': return theme.palette.warning.main;
      case 'Monitoring': return theme.palette.info.main;
      case 'Resolved': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  const filteredAlerts = alerts.filter(alert =>
    alert.alertId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.assignee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    setLastUpdated(new Date());
    setNextRefresh(300);
  };

  const handleUserActionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserActionsClose = () => {
    setAnchorEl(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const alertStats = {
    total: alerts.length,
    critical: alerts.filter(a => a.severity === 'Critical').length,
    active: alerts.filter(a => a.status === 'Active').length,
    resolved: alerts.filter(a => a.status === 'Resolved').length
  };

  return (
    <Fade in timeout={300}>
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Enhanced Header with Analytics */}
        <Paper 
          elevation={8}
          sx={{ 
            borderRadius: 0,
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Main Header Bar */}
          <Stack 
            direction="row" 
            alignItems="center" 
            justifyContent="space-between"
            sx={{ 
              px: 3, 
              py: 2,
              minHeight: 64
            }}
          >
            {/* Left Section - Matrix Path & System Info */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.2)'
              }}>
                <TimelineIcon sx={{ color: '#38bdf8', fontSize: 20 }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace', 
                    fontWeight: 600,
                    color: '#38bdf8',
                    fontSize: '0.9rem'
                  }}
                >
                  {matrixPath}
                </Typography>
              </Box>
              
              <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <UpdateIcon sx={{ fontSize: 14, color: '#10b981' }} />
                  <Typography variant="caption" sx={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 500 }}>
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid rgba(249, 115, 22, 0.2)'
                }}>
                  <ScheduleIcon sx={{ fontSize: 14, color: '#f97316' }} />
                  <Typography variant="caption" sx={{ color: '#f97316', fontSize: '0.75rem', fontWeight: 500 }}>
                    Next: {formatTime(nextRefresh)}
                  </Typography>
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                  <CircleIcon sx={{ fontSize: 8, color: '#8b5cf6' }} />
                  <Typography variant="caption" sx={{ color: '#8b5cf6', fontSize: '0.75rem', fontWeight: 500 }}>
                    Every {frequency}
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            {/* Center Section - Enhanced Search */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                size="small"
                placeholder="Search alerts, sources, assignees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: '#64748b' }} />
                    </InputAdornment>
                  ),
                  sx: { 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    height: 40,
                    fontSize: '0.9rem',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
                sx={{ width: 350 }}
              />
            </Box>

            {/* Right Section - Actions & Quick Stats */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack direction="row" spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    icon={<AssessmentIcon sx={{ fontSize: 16 }} />}
                    label={`${filteredAlerts.length} Total`} 
                    size="small" 
                    sx={{ 
                      background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 28,
                      '& .MuiChip-icon': { color: 'white' }
                    }} 
                  />
                  <Chip 
                    icon={<NotificationsIcon sx={{ fontSize: 16 }} />}
                    label={`${alertStats.critical} Critical`} 
                    size="small" 
                    sx={{ 
                      background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 28,
                      '& .MuiChip-icon': { color: 'white' }
                    }} 
                  />
                </Box>
              </Stack>
              
              <Stack direction="row" spacing={1}>
                <Tooltip title="Advanced Filters">
                  <IconButton 
                    size="small"
                    sx={{ 
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: '#6366f1',
                      width: 36,
                      height: 36,
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      '&:hover': {
                        background: 'rgba(99, 102, 241, 0.2)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)'
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <FilterListIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Refresh Data">
                  <IconButton 
                    onClick={handleRefresh} 
                    size="small"
                    sx={{ 
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38bdf8',
                      width: 36,
                      height: 36,
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      '&:hover': {
                        background: 'rgba(56, 189, 248, 0.2)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(56, 189, 248, 0.25)'
                      },
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    <RefreshIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>

                <Button
                  size="small"
                  onClick={handleUserActionsClick}
                  endIcon={<MoreVertIcon sx={{ fontSize: 16 }} />}
                  sx={{ 
                    background: 'rgba(156, 163, 175, 0.1)',
                    color: '#9ca3af',
                    fontSize: '0.8rem',
                    height: 36,
                    minWidth: 100,
                    textTransform: 'none',
                    fontWeight: 600,
                    border: '1px solid rgba(156, 163, 175, 0.2)',
                    borderRadius: '8px',
                    '&:hover': {
                      background: 'rgba(156, 163, 175, 0.2)',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(156, 163, 175, 0.25)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  Actions
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleUserActionsClose}
                  slotProps={{
                    paper: {
                      sx: { 
                        mt: 1,
                        minWidth: 200,
                        borderRadius: '12px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)'
                      }
                    }
                  }}
                >
                  <MenuItem onClick={handleUserActionsClose} sx={{ fontSize: '0.85rem', py: 1.5, borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <TrendingUpIcon sx={{ mr: 1, fontSize: 18 }} />
                    Export to CSV
                  </MenuItem>
                  <MenuItem onClick={handleUserActionsClose} sx={{ fontSize: '0.85rem', py: 1.5, borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <AssessmentIcon sx={{ mr: 1, fontSize: 18 }} />
                    Export to PDF
                  </MenuItem>
                  <MenuItem onClick={handleUserActionsClose} sx={{ fontSize: '0.85rem', py: 1.5, borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <ScheduleIcon sx={{ mr: 1, fontSize: 18 }} />
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleUserActionsClose} sx={{ fontSize: '0.85rem', py: 1.5, borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <FilterListIcon sx={{ mr: 1, fontSize: 18 }} />
                    Filters
                  </MenuItem>
                </Menu>
              </Stack>
            </Stack>
          </Stack>

          {/* Quick Stats Bar */}
          <Box sx={{ 
            px: 3, 
            py: 1.5, 
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '12px'
                }}>
                  <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6" sx={{ color: '#3b82f6', fontWeight: 700, fontSize: '1.1rem' }}>
                          {alertStats.total}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '0.7rem' }}>
                          Total Alerts
                        </Typography>
                      </Box>
                      <AssessmentIcon sx={{ color: '#3b82f6', fontSize: 24 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '12px'
                }}>
                  <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6" sx={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem' }}>
                          {alertStats.critical}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '0.7rem' }}>
                          Critical
                        </Typography>
                      </Box>
                      <NotificationsIcon sx={{ color: '#ef4444', fontSize: 24 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '12px'
                }}>
                  <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6" sx={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem' }}>
                          {alertStats.active}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '0.7rem' }}>
                          Active
                        </Typography>
                      </Box>
                      <TrendingUpIcon sx={{ color: '#f59e0b', fontSize: 24 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '12px'
                }}>
                  <CardContent sx={{ py: 1, px: 2, '&:last-child': { pb: 1 } }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h6" sx={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem' }}>
                          {alertStats.resolved}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#cbd5e1', fontSize: '0.7rem' }}>
                          Resolved
                        </Typography>
                      </Box>
                      <CircleIcon sx={{ color: '#10b981', fontSize: 24 }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Enhanced Table Section */}
        <Box sx={{ flex: 1, overflow: 'hidden', px: 3, py: 2 }}>
          <Paper 
            elevation={8}
            sx={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          >
            <TableContainer sx={{ height: 'calc(100vh - 280px)' }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Alert ID
                    </TableCell>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Severity
                    </TableCell>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      width: '35%'
                    }}>
                      Message
                    </TableCell>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Source
                    </TableCell>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Time
                    </TableCell>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Assignee
                    </TableCell>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Priority
                    </TableCell>
                    <TableCell sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Duration
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      background: 'linear-gradient(135deg, #1e293b, #475569)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      py: 1.5,
                      borderBottom: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Count
                    </TableCell>
              </TableRow>
            </TableHead>
                <TableBody>
                  {filteredAlerts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((alert, index) => (
                    <Slide key={alert.id} direction="up" in timeout={300 + index * 50}>
                      <TableRow
                        hover
                        sx={{
                          height: 48,
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
                            borderLeft: '4px solid #3b82f6',
                            transform: 'translateX(4px)',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
                          },
                          backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(248, 250, 252, 0.8)',
                          borderLeft: alert.severity === 'Critical' ? '4px solid #ef4444' : '4px solid transparent',
                          cursor: 'pointer',
                          backdropFilter: 'blur(5px)',
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <TableCell sx={{ 
                          fontFamily: 'monospace', 
                          fontWeight: 700,
                          color: '#3b82f6',
                          fontSize: '0.8rem',
                          py: 1,
                          background: 'rgba(59, 130, 246, 0.05)'
                        }}>
                          {alert.alertId}
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Chip
                            label={alert.severity}
                            size="small"
                            sx={{
                              backgroundColor: getSeverityColor(alert.severity),
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              height: 24,
                              minWidth: 70,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Chip
                            label={alert.status}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: getStatusColor(alert.status),
                              color: getStatusColor(alert.status),
                              fontSize: '0.7rem',
                              height: 24,
                              minWidth: 80,
                              fontWeight: 600,
                              borderWidth: '2px'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: '0.8rem',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 350,
                              fontWeight: 500,
                              color: '#1f2937'
                            }}
                          >
                            {alert.message}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ 
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          color: '#64748b',
                          py: 1,
                          fontWeight: 500
                        }}>
                          {alert.source}
                        </TableCell>
                        <TableCell sx={{ 
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          color: '#475569',
                          py: 1,
                          fontWeight: 500
                        }}>
                          {alert.timestamp.split(' ')[1]}
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <CircleIcon sx={{ fontSize: 8, color: '#10b981' }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                              {alert.assignee}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Chip
                            label={alert.priority}
                            size="small"
                            color={alert.priority === 'P1' ? 'error' : alert.priority === 'P2' ? 'warning' : 'default'}
                            sx={{ 
                              fontWeight: 700, 
                              fontSize: '0.7rem',
                              height: 24,
                              minWidth: 40
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ 
                          fontFamily: 'monospace',
                          fontSize: '0.75rem',
                          color: '#64748b',
                          py: 1,
                          fontWeight: 500
                        }}>
                          {alert.duration}
                        </TableCell>
                        <TableCell align="center" sx={{ py: 1 }}>
                          <Chip
                            label={alert.count}
                            size="small"
                            color="secondary"
                            sx={{ 
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              height: 24,
                              minWidth: 45
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </Slide>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Enhanced Pagination */}
            <Paper 
              elevation={0}
              sx={{ 
                borderTop: '1px solid rgba(255,255,255,0.2)',
                background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.8))',
                backdropFilter: 'blur(10px)',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px'
              }}
            >
              <TablePagination
                component="div"
                count={filteredAlerts.length}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[25, 50, 100]}
                sx={{ 
                  '& .MuiTablePagination-toolbar': {
                    minHeight: 56,
                    paddingLeft: 3,
                    paddingRight: 3
                  },
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#475569'
                  },
                  '& .MuiTablePagination-select': {
                    fontWeight: 600
                  }
                }}
              />
            </Paper>
          </Paper>
        </Box>
      </Box>
    </Fade>
  );
};

export default AlertsDisplayPage;