import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  AlertTitle,
  Chip,
  Stack,
  IconButton,
  Button,
  Collapse,
  Divider,
  Badge,
  useTheme,
  alpha,
  Grid,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  CheckCircle,
  Close,
  ExpandMore,
  ExpandLess,
  Notifications,
  NotificationsActive,
  Security,
  Speed,
  TrendingDown,
  TrendingUp,
  Schedule,
  BugReport,
  Update,
} from '@mui/icons-material';

// Mock alerts data
const alertsData = [
  {
    id: 1,
    type: 'error',
    title: 'Database Connection Failed',
    message: 'Primary database connection lost. Failover to backup server initiated.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    category: 'System',
    severity: 'critical',
    isRead: false,
    details: 'Connection timeout after 30 seconds. Last successful connection at 14:25:30.',
    actionRequired: true,
    affectedUsers: 1250,
    icon: <Error />,
  },
  {
    id: 2,
    type: 'warning',
    title: 'High CPU Usage Detected',
    message: 'Server CPU usage has exceeded 85% for the past 10 minutes.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    category: 'Performance',
    severity: 'high',
    isRead: false,
    details: 'Current usage: 87%. Recommended action: Scale up or optimize running processes.',
    actionRequired: true,
    affectedUsers: 0,
    icon: <Speed />,
  },
  {
    id: 3,
    type: 'info',
    title: 'Scheduled Maintenance Window',
    message: 'System maintenance scheduled for tonight at 2:00 AM EST.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    category: 'Maintenance',
    severity: 'low',
    isRead: true,
    details: 'Expected downtime: 30 minutes. All services will be temporarily unavailable.',
    actionRequired: false,
    affectedUsers: 'all',
    icon: <Schedule />,
  },
  {
    id: 4,
    type: 'success',
    title: 'Security Patch Applied',
    message: 'Critical security update successfully deployed across all servers.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    category: 'Security',
    severity: 'medium',
    isRead: true,
    details: 'Patch KB2024-001 addresses CVE-2024-1234. All systems are now secure.',
    actionRequired: false,
    affectedUsers: 0,
    icon: <Security />,
  },
  {
    id: 5,
    type: 'warning',
    title: 'Unusual Traffic Pattern',
    message: 'Traffic spike detected: 300% above normal levels.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    category: 'Traffic',
    severity: 'medium',
    isRead: false,
    details: 'Possible DDoS attempt or viral content. Monitor closely.',
    actionRequired: true,
    affectedUsers: 0,
    icon: <TrendingUp />,
  },
  {
    id: 6,
    type: 'error',
    title: 'Payment Gateway Error',
    message: 'Payment processing service experiencing intermittent failures.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    category: 'Payment',
    severity: 'critical',
    isRead: true,
    details: 'Failure rate: 12%. Contact payment provider immediately.',
    actionRequired: true,
    affectedUsers: 450,
    icon: <BugReport />,
  },
];

// Alert type configurations
const alertTypeConfig = {
  error: {
    color: 'error',
    icon: <Error />,
    bgColor: 'error.light',
  },
  warning: {
    color: 'warning',
    icon: <Warning />,
    bgColor: 'warning.light',
  },
  info: {
    color: 'info',
    icon: <Info />,
    bgColor: 'info.light',
  },
  success: {
    color: 'success',
    icon: <CheckCircle />,
    bgColor: 'success.light',
  },
};

// Severity configurations
const severityConfig = {
  critical: { color: 'error.main', label: 'Critical' },
  high: { color: 'warning.main', label: 'High' },
  medium: { color: 'info.main', label: 'Medium' },
  low: { color: 'success.main', label: 'Low' },
};

// Format timestamp
const formatTimestamp = (timestamp) => {
  const now = new Date();
  const diffMs = now - timestamp;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

// Individual Alert Component
const AlertCard = ({ alert, onDismiss, onToggleRead }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const config = alertTypeConfig[alert.type];

  return (
    <Card
      sx={{
        mb: 2,
        border: `1px solid ${alpha(theme.palette[config.color].main, 0.3)}`,
        borderLeft: `4px solid ${theme.palette[config.color].main}`,
        backgroundColor: alert.isRead 
          ? 'background.paper' 
          : alpha(theme.palette[config.color].main, 0.02),
        '&:hover': {
          boxShadow: `0 4px 12px ${alpha(theme.palette[config.color].main, 0.15)}`,
        },
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Avatar
            sx={{
              backgroundColor: theme.palette[config.color].main,
              color: 'white',
              width: 40,
              height: 40,
              mr: 2,
            }}
          >
            {alert.icon}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: alert.isRead ? 500 : 700,
                  flex: 1,
                  fontSize: '1rem',
                }}
              >
                {alert.title}
              </Typography>
              
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={alert.category}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette[config.color].main, 0.1),
                    color: theme.palette[config.color].main,
                    fontSize: '0.75rem',
                  }}
                />
                
                <Chip
                  label={severityConfig[alert.severity].label}
                  size="small"
                  sx={{
                    backgroundColor: alpha(severityConfig[alert.severity].color.split('.')[0] === 'error' ? theme.palette.error.main : 
                                           severityConfig[alert.severity].color.split('.')[0] === 'warning' ? theme.palette.warning.main :
                                           severityConfig[alert.severity].color.split('.')[0] === 'info' ? theme.palette.info.main :
                                           theme.palette.success.main, 0.1),
                    color: severityConfig[alert.severity].color.split('.')[0] === 'error' ? theme.palette.error.main : 
                           severityConfig[alert.severity].color.split('.')[0] === 'warning' ? theme.palette.warning.main :
                           severityConfig[alert.severity].color.split('.')[0] === 'info' ? theme.palette.info.main :
                           theme.palette.success.main,
                    fontSize: '0.75rem',
                  }}
                />
                
                <IconButton
                  size="small"
                  onClick={() => onDismiss(alert.id)}
                  sx={{ ml: 1 }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
            
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {alert.message}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {formatTimestamp(alert.timestamp)}
              </Typography>
              
              {alert.affectedUsers > 0 && (
                <Typography variant="caption" color="text.secondary">
                  Affected users: {alert.affectedUsers.toLocaleString()}
                </Typography>
              )}
            </Box>
            
            {alert.actionRequired && (
              <Box sx={{ mb: 1 }}>
                <Chip
                  label="Action Required"
                  size="small"
                  color="error"
                  variant="outlined"
                />
              </Box>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                size="small"
                onClick={() => setExpanded(!expanded)}
                endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                sx={{ textTransform: 'none' }}
              >
                {expanded ? 'Less' : 'More'} Details
              </Button>
              
              <Button
                size="small"
                variant="outlined"
                onClick={() => onToggleRead(alert.id)}
                sx={{ textTransform: 'none' }}
              >
                Mark as {alert.isRead ? 'Unread' : 'Read'}
              </Button>
              
              {alert.actionRequired && (
                <Button
                  size="small"
                  variant="contained"
                  color={config.color}
                  sx={{ textTransform: 'none' }}
                >
                  Take Action
                </Button>
              )}
            </Box>
            
            <Collapse in={expanded}>
              <Box sx={{ mt: 2, p: 2, backgroundColor: alpha(theme.palette.background.default, 0.5), borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Details:</strong> {alert.details}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Main Alerts Panel Component
const AlertsPanel = () => {
  const theme = useTheme();
  const [alerts, setAlerts] = useState(alertsData);
  const [filter, setFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const handleDismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleToggleRead = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: !alert.isRead } : alert
    ));
  };

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (showUnreadOnly && alert.isRead) return false;
    if (filter === 'all') return true;
    return alert.type === filter;
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical' && !alert.isRead).length;

  // Alert statistics
  const alertStats = {
    total: alerts.length,
    unread: unreadCount,
    critical: criticalCount,
    byType: {
      error: alerts.filter(a => a.type === 'error').length,
      warning: alerts.filter(a => a.type === 'warning').length,
      info: alerts.filter(a => a.type === 'info').length,
      success: alerts.filter(a => a.type === 'success').length,
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Badge badgeContent={unreadCount} color="error">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                backgroundColor: alpha(theme.palette.warning.main, 0.1),
                color: theme.palette.warning.main,
                mr: 2,
              }}
            >
              <NotificationsActive sx={{ fontSize: '2rem' }} />
            </Avatar>
          </Badge>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              System Alerts
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Monitor and manage system notifications and alerts
            </Typography>
          </Box>
        </Box>
        <Divider />
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {alertStats.total}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Alerts
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main' }}>
              {alertStats.unread}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Unread
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main' }}>
              {alertStats.critical}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Critical
            </Typography>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main' }}>
              {alertStats.byType.error + alertStats.byType.warning}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Action Required
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Stack direction="row" spacing={1}>
              <Button
                variant={filter === 'all' ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setFilter('all')}
              >
                All ({alerts.length})
              </Button>
              <Button
                variant={filter === 'error' ? 'contained' : 'outlined'}
                size="small"
                color="error"
                onClick={() => setFilter('error')}
              >
                Errors ({alertStats.byType.error})
              </Button>
              <Button
                variant={filter === 'warning' ? 'contained' : 'outlined'}
                size="small"
                color="warning"
                onClick={() => setFilter('warning')}
              >
                Warnings ({alertStats.byType.warning})
              </Button>
              <Button
                variant={filter === 'info' ? 'contained' : 'outlined'}
                size="small"
                color="info"
                onClick={() => setFilter('info')}
              >
                Info ({alertStats.byType.info})
              </Button>
              <Button
                variant={filter === 'success' ? 'contained' : 'outlined'}
                size="small"
                color="success"
                onClick={() => setFilter('success')}
              >
                Success ({alertStats.byType.success})
              </Button>
            </Stack>
            
            <Stack direction="row" spacing={1}>
              <Button
                variant={showUnreadOnly ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              >
                Unread Only
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
              >
                Mark All Read
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Box>
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <Notifications sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No alerts found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {showUnreadOnly ? 'All alerts have been read' : 'No alerts match the current filter'}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map(alert => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onDismiss={handleDismissAlert}
              onToggleRead={handleToggleRead}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default AlertsPanel;