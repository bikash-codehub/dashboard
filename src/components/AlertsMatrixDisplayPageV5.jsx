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
  Stack,
  Grid,
  useTheme,
  alpha
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
  NotificationsActive,
  CloudSync,
  AccountTree,
  MonitorHeart,
  Psychology
} from '@mui/icons-material';
import Table from './Table';

const AlertsMatrixDisplayPageV5 = () => {
  const theme = useTheme();
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
      assignee: 'John Doe',
      impact: 'High',
      duration: '15m'
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
      assignee: 'Jane Smith',
      impact: 'Medium',
      duration: '8m'
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
      assignee: 'Mike Johnson',
      impact: 'Low',
      duration: '3m'
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
      assignee: 'Sarah Wilson',
      impact: 'Minimal',
      duration: '2m'
    },
    {
      id: 'ALT-005',
      matrixPath: '/production/microservices/user-service',
      source: 'Service Mesh',
      severity: 'Critical',
      priority: 'P1',
      status: 'Active',
      timestamp: '2024-12-06T10:35:00Z',
      description: 'User service pods failing health checks',
      assignee: 'David Chen',
      impact: 'High',
      duration: '22m'
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

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return '#ff4757';
      case 'Medium': return '#ffa726';
      case 'Low': return '#42a5f5';
      case 'Minimal': return '#66bb6a';
      default: return '#9e9e9e';
    }
  };

  const criticalCount = alertsData.filter(a => a.severity === 'Critical').length;
  const activeCount = alertsData.filter(a => a.status === 'Active').length;
  const resolvedCount = alertsData.filter(a => a.status === 'Resolved').length;
  const avgResponseTime = '1.2s';

  const columns = [
    {
      id: 'id',
      label: 'Alert ID',
      minWidth: 100,
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" fontWeight="bold" color="primary">
            {value}
          </Typography>
          <Chip size="small" label="NEW" color="info" variant="outlined" sx={{ fontSize: '0.65rem', height: 16 }} />
        </Box>
      )
    },
    {
      id: 'matrixPath',
      label: 'Matrix Path',
      minWidth: 220,
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountTree sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" fontFamily="monospace" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {value}
          </Typography>
        </Box>
      )
    },
    {
      id: 'source',
      label: 'Source',
      minWidth: 150,
      render: (value) => (
        <Chip
          label={value}
          variant="outlined"
          size="small"
          sx={{ fontWeight: 500 }}
        />
      )
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
          sx={{ fontWeight: 600 }}
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
          sx={{ fontWeight: 600 }}
        />
      )
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: (value, row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={value}
            color={getStatusColor(value)}
            size="small"
            variant="filled"
            sx={{ fontWeight: 600 }}
          />
          {value === 'Active' && (
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: 'error.main',
              animation: 'pulse 2s infinite'
            }} />
          )}
        </Box>
      )
    },
    {
      id: 'impact',
      label: 'Impact',
      minWidth: 100,
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            bgcolor: getImpactColor(value)
          }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {value}
          </Typography>
        </Box>
      )
    },
    {
      id: 'duration',
      label: 'Duration',
      minWidth: 80,
      render: (value) => (
        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
          {value}
        </Typography>
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
      minWidth: 280,
      render: (value) => (
        <Tooltip title={value} arrow>
          <Typography 
            variant="body2" 
            sx={{ 
              maxWidth: 280,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {value}
          </Typography>
        </Tooltip>
      )
    },
    {
      id: 'assignee',
      label: 'Assignee',
      minWidth: 140,
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
            {value.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
            {value}
          </Typography>
        </Box>
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
      {/* Enhanced Hero Header */}
      <Card 
        elevation={0}
        sx={{ 
          mb: 3, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          border: 'none'
        }}
      >
        {/* Animated Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3Ccircle cx='27' cy='7' r='2'/%3E%3Ccircle cx='47' cy='7' r='2'/%3E%3Ccircle cx='7' cy='27' r='2'/%3E%3Ccircle cx='27' cy='27' r='2'/%3E%3Ccircle cx='47' cy='27' r='2'/%3E%3Ccircle cx='7' cy='47' r='2'/%3E%3Ccircle cx='27' cy='47' r='2'/%3E%3Ccircle cx='47' cy='47' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        
        <Box sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          {/* Top Section with Enhanced Design */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar 
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}
                >
                  <MonitorHeart sx={{ fontSize: 32 }} />
                </Avatar>
                <Box sx={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: '#2ed573',
                  border: '2px solid white',
                  animation: 'pulse 2s infinite'
                }} />
              </Box>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '-0.02em' }}>
                  Alert Matrix Control Center
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                  Real-time monitoring and intelligent incident management
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                  <Chip 
                    icon={<CloudSync sx={{ fontSize: 16 }} />}
                    label="Live Sync Active" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(46, 213, 115, 0.2)', 
                      color: 'white',
                      border: '1px solid rgba(46, 213, 115, 0.3)'
                    }} 
                  />
                  <Chip 
                    icon={<Psychology sx={{ fontSize: 16 }} />}
                    label="AI Assistant Online" 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(116, 185, 255, 0.2)', 
                      color: 'white',
                      border: '1px solid rgba(116, 185, 255, 0.3)'
                    }} 
                  />
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {activeCount}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Active Alerts
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)', mx: 1 }} />
              <Box>
                <AvatarGroup max={5} sx={{ '& .MuiAvatar-root': { width: 36, height: 36, fontSize: '0.9rem', border: '2px solid rgba(255,255,255,0.3)' } }}>
                  <Avatar sx={{ bgcolor: '#ff6b6b' }}>JD</Avatar>
                  <Avatar sx={{ bgcolor: '#4ecdc4' }}>JS</Avatar>
                  <Avatar sx={{ bgcolor: '#45b7d1' }}>MJ</Avatar>
                  <Avatar sx={{ bgcolor: '#f9ca24' }}>SW</Avatar>
                  <Avatar sx={{ bgcolor: '#a55eea' }}>DC</Avatar>
                </AvatarGroup>
                <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', textAlign: 'center', mt: 0.5 }}>
                  5 Engineers Online
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Enhanced Matrix Path Breadcrumb */}
          <Paper 
            sx={{ 
              p: 2, 
              mb: 3,
              bgcolor: 'rgba(255,255,255,0.15)', 
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.8)', mb: 0.5, display: 'block' }}>
                  Matrix Path
                </Typography>
                <Breadcrumbs 
                  separator="/"
                  sx={{ 
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.7)', mx: 1 }
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
                      opacity: 0.9,
                      '&:hover': { opacity: 1 },
                      fontWeight: 600
                    }}
                  >
                    <HomeIcon sx={{ fontSize: 18 }} />
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
                        fontWeight: index === pathSegments.length - 1 ? 700 : 500,
                        opacity: index === pathSegments.length - 1 ? 1 : 0.9,
                        '&:hover': { opacity: 1 }
                      }}
                    >
                      <FolderIcon sx={{ fontSize: 18 }} />
                      {segment}
                    </Link>
                  ))}
                </Breadcrumbs>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                    Last Updated
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {lastUpdated.toLocaleTimeString()}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                    Next Refresh
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {nextRefresh.toLocaleTimeString()}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>
                    Frequency
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {frequency}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Enhanced Stats Grid */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <ErrorIcon sx={{ color: '#ff4757', fontSize: 28 }} />
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {criticalCount}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Critical Alerts
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Requires immediate attention
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={criticalCount * 20} 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': { bgcolor: '#ff4757' }
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <NotificationsActive sx={{ color: '#ffa726', fontSize: 28 }} />
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {activeCount}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Active Incidents
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Currently being handled
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={activeCount * 25} 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': { bgcolor: '#ffa726' }
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <CheckCircle sx={{ color: '#2ed573', fontSize: 28 }} />
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {resolvedCount}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Resolved Today
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Successfully completed
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={75} 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': { bgcolor: '#2ed573' }
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper 
                sx={{ 
                  p: 3, 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 3
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Speed sx={{ color: '#74b9ff', fontSize: 28 }} />
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {avgResponseTime}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Avg Response
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  System performance metric
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': { bgcolor: '#74b9ff' }
                  }}
                />
              </Paper>
            </Grid>
          </Grid>

          {/* Enhanced Control Bar */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleRefresh}
                disabled={isRefreshing}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  },
                  px: 3,
                  py: 1
                }}
                startIcon={<RefreshIcon />}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
              </Button>

              <ButtonGroup 
                variant="contained" 
                sx={{
                  '& .MuiButton-root': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)',
                    }
                  }
                }}
              >
                <Button startIcon={<FilterList />}>Filter</Button>
                <Button startIcon={<ExportIcon />}>Export</Button>
                <Button onClick={handleUserActionsClick} endIcon={<SettingsIcon />}>
                  Actions
                </Button>
              </ButtonGroup>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                px: 3,
                py: 1,
                bgcolor: 'rgba(46, 213, 115, 0.2)',
                borderRadius: 3,
                border: '1px solid rgba(46, 213, 115, 0.3)'
              }}>
                <DotIcon sx={{ color: '#2ed573', fontSize: 12, animation: 'pulse 2s infinite' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  All Systems Operational
                </Typography>
              </Box>
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
      </Card>

      {/* Enhanced Search Section */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: theme.shadows[2] }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Search & Filter Alerts
            </Typography>
            {searchTerm && (
              <Chip 
                label={`${filteredData.length} results found`}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>
          <TextField
            fullWidth
            placeholder="Search alerts by ID, matrix path, source, description, assignee, or any field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchTerm('')} size="small">
                    <Badge badgeContent={filteredData.length} color="primary" max={999}>
                      <FilterList />
                    </Badge>
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.04),
                }
              }
            }}
          />
        </Box>
      </Card>

      {/* Enhanced Alerts Table */}
      <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: theme.shadows[3] }}>
        <Box sx={{ p: 4 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 3
          }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, color: 'text.primary' }}>
                Alert Matrix Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Comprehensive view of all system alerts and incidents with real-time updates
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Paper sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 2 }}>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                  {filteredData.length} of {alertsData.length} alerts displayed
                </Typography>
              </Paper>
              {searchTerm && (
                <Chip 
                  label={`"${searchTerm}"`}
                  size="medium"
                  onDelete={() => setSearchTerm('')}
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
            </Box>
          </Box>
          <Table
            columns={columns}
            data={filteredData}
            pagination
            sortable
            rowsPerPageOptions={[10, 25, 50, 100]}
            defaultRowsPerPage={10}
            stickyHeader
            maxHeight={600}
          />
        </Box>
      </Card>

      {/* Enhanced User Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserActionsClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 280,
            borderRadius: 3,
            boxShadow: theme.shadows[6],
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }
        }}
      >
        <MenuItem onClick={handleUserActionsClose} sx={{ py: 1.5 }}>
          <Dashboard sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Dashboard Settings</Typography>
            <Typography variant="caption" color="text.secondary">Customize dashboard layout</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleUserActionsClose} sx={{ py: 1.5 }}>
          <Notifications sx={{ mr: 2, fontSize: 20, color: 'warning.main' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Alert Preferences</Typography>
            <Typography variant="caption" color="text.secondary">Configure notification settings</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleUserActionsClose} sx={{ py: 1.5 }}>
          <Visibility sx={{ mr: 2, fontSize: 20, color: 'info.main' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>View Options</Typography>
            <Typography variant="caption" color="text.secondary">Adjust table and display settings</Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleUserActionsClose} sx={{ py: 1.5 }}>
          <HistoryIcon sx={{ mr: 2, fontSize: 20, color: 'success.main' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Export History</Typography>
            <Typography variant="caption" color="text.secondary">Download alert history and reports</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleUserActionsClose} sx={{ py: 1.5 }}>
          <SettingsIcon sx={{ mr: 2, fontSize: 20, color: 'text.secondary' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Advanced Configuration</Typography>
            <Typography variant="caption" color="text.secondary">System-level settings and preferences</Typography>
          </Box>
        </MenuItem>
      </Menu>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </Box>
  );
};

export default AlertsMatrixDisplayPageV5;