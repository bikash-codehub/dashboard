import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import {
  DateRange,
  TrendingUp,
  TrendingDown,
  Warning,
  Error,
  Analytics,
  Group,
  Assessment,
  NotificationsActive,
  Timeline,
  FilterList,
  CalendarToday,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

const AlertsDashboard = () => {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  });
  const [timeFilter, setTimeFilter] = useState('Daily');
  const [groupBy, setGroupBy] = useState('severity');

  // Mock data for demonstration
  const mockTrendData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const periods = timeFilter === 'Daily' ? days : timeFilter === 'Weekly' ? weeks : months;
    
    return periods.map((period, index) => ({
      period,
      redMetrics: Math.floor(Math.random() * 50) + 20,
      amberMetrics: Math.floor(Math.random() * 30) + 15,
      redAlerts: Math.floor(Math.random() * 25) + 10,
      amberAlerts: Math.floor(Math.random() * 20) + 8,
    }));
  }, [timeFilter]);

  const mockAlertGroups = useMemo(() => {
    const generateMiniTrendData = (baseRed, baseAmber) => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const weeks = ['W1', 'W2', 'W3', 'W4'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      
      const periods = timeFilter === 'Daily' ? days : timeFilter === 'Weekly' ? weeks : months;
      
      return periods.map((period) => ({
        period,
        red: Math.floor(Math.random() * baseRed) + Math.floor(baseRed * 0.5),
        amber: Math.floor(Math.random() * baseAmber) + Math.floor(baseAmber * 0.5),
      }));
    };

    return [
      {
        title: 'Critical Alerts',
        redCount: 42,
        amberCount: 28,
        trend: 'up',
        percentage: 15.2,
        description: 'System-wide critical issues requiring immediate attention',
        chartData: generateMiniTrendData(42, 28),
      },
      {
        title: 'Performance Alerts',
        redCount: 18,
        amberCount: 35,
        trend: 'down',
        percentage: 8.7,
        description: 'Performance degradation and optimization alerts',
        chartData: generateMiniTrendData(18, 35),
      },
      {
        title: 'Security Alerts',
        redCount: 7,
        amberCount: 15,
        trend: 'up',
        percentage: 12.1,
        description: 'Security threats and vulnerability alerts',
        chartData: generateMiniTrendData(7, 15),
      },
    ];
  }, [timeFilter]);

  const mockGroupByData = {
    severity: [
      { name: 'Critical', count: 67, color: '#f44336' },
      { name: 'High', count: 89, color: '#ff9800' },
      { name: 'Medium', count: 156, color: '#2196f3' },
      { name: 'Low', count: 203, color: '#4caf50' },
    ],
    category: [
      { name: 'Infrastructure', count: 134, color: '#9c27b0' },
      { name: 'Application', count: 201, color: '#3f51b5' },
      { name: 'Database', count: 89, color: '#009688' },
      { name: 'Network', count: 91, color: '#607d8b' },
    ],
    source: [
      { name: 'Monitoring Tools', count: 298, color: '#795548' },
      { name: 'User Reports', count: 134, color: '#ff5722' },
      { name: 'Automated Tests', count: 83, color: '#cddc39' },
    ],
  };

  const mockMatrices = [
    { name: 'CPU Usage', value: 85, threshold: 90, status: 'amber' },
    { name: 'Memory Usage', value: 92, threshold: 85, status: 'red' },
    { name: 'Disk Usage', value: 67, threshold: 80, status: 'green' },
    { name: 'Network Latency', value: 245, threshold: 200, status: 'red' },
    { name: 'Error Rate', value: 2.3, threshold: 5, status: 'green' },
    { name: 'Response Time', value: 1450, threshold: 1000, status: 'amber' },
  ];

  const mockAlerts = [
    { id: 1, title: 'High CPU Usage Detected', severity: 'red', time: '2 min ago', source: 'Server-01' },
    { id: 2, title: 'Memory Threshold Exceeded', severity: 'amber', time: '5 min ago', source: 'App-Server' },
    { id: 3, title: 'Database Connection Timeout', severity: 'red', time: '8 min ago', source: 'DB-Primary' },
    { id: 4, title: 'SSL Certificate Expiring', severity: 'amber', time: '15 min ago', source: 'Load Balancer' },
    { id: 5, title: 'Disk Space Warning', severity: 'amber', time: '22 min ago', source: 'Storage-01' },
  ];

  const getSeverityColor = (status) => {
    switch (status) {
      case 'red': return '#f44336';
      case 'amber': return '#ff9800';
      case 'green': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Alerts Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Monitor and analyze system alerts, metrics, and trends in real-time
        </Typography>

        {/* Filters */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ButtonGroup variant="outlined" fullWidth>
              {['Daily', 'Weekly', 'Monthly'].map((filter) => (
                <Button
                  key={filter}
                  variant={timeFilter === filter ? 'contained' : 'outlined'}
                  onClick={() => setTimeFilter(filter)}
                  sx={{ flex: 1 }}
                >
                  {filter}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>

      {/* Alert Trend Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockAlertGroups.map((group, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ 
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              transition: 'transform 0.2s ease-in-out',
              height: 420,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
              }
            }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {group.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {group.trend === 'up' ? (
                      <TrendingUp sx={{ color: '#f44336', fontSize: 20 }} />
                    ) : (
                      <TrendingDown sx={{ color: '#4caf50', fontSize: 20 }} />
                    )}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        ml: 0.5, 
                        color: group.trend === 'up' ? '#f44336' : '#4caf50',
                        fontWeight: 600 
                      }}
                    >
                      {group.percentage}%
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Error sx={{ color: '#f44336', fontSize: 18 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#f44336' }}>
                      {group.redCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Red
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Warning sx={{ color: '#ff9800', fontSize: 18 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#ff9800' }}>
                      {group.amberCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Amber
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {group.description}
                </Typography>

                {/* Mini Trend Chart */}
                <Box sx={{ flex: 1, mt: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    {timeFilter} Trends
                  </Typography>
                  <Box sx={{ height: 180 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={group.chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                        <XAxis 
                          dataKey="period" 
                          stroke={theme.palette.text.secondary}
                          fontSize={10}
                          tickMargin={5}
                        />
                        <YAxis 
                          stroke={theme.palette.text.secondary}
                          fontSize={10}
                          width={25}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 4,
                            fontSize: 12,
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="red" 
                          stroke="#f44336" 
                          strokeWidth={2}
                          name="Red Alerts"
                          dot={{ fill: '#f44336', strokeWidth: 1, r: 3 }}
                          activeDot={{ r: 4, stroke: '#f44336', strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="amber" 
                          stroke="#ff9800" 
                          strokeWidth={2}
                          name="Amber Alerts"
                          dot={{ fill: '#ff9800', strokeWidth: 1, r: 3 }}
                          activeDot={{ r: 4, stroke: '#ff9800', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        {/* List Component */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Analytics & Alerts Summary
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                  >
                    <MenuItem value="severity">Severity</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="source">Source</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              {/* Summary List */}
              <List>
                {/* Group By Summary */}
                <ListItem sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                  mb: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}>
                  <ListItemIcon>
                    <Group sx={{ fontSize: 24, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Group By {groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {mockGroupByData[groupBy].length} categories • Total: {mockGroupByData[groupBy].reduce((sum, item) => sum + item.count, 0)} items
                      </Typography>
                    }
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {mockGroupByData[groupBy].length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Groups
                    </Typography>
                  </Box>
                </ListItem>

                {/* Matrices Count */}
                <ListItem sx={{ 
                  bgcolor: alpha(theme.palette.secondary.main, 0.05),
                  borderRadius: 2,
                  mb: 2,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`
                }}>
                  <ListItemIcon>
                    <Assessment sx={{ fontSize: 24, color: 'secondary.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                        Matrices Count
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        System performance metrics monitoring • {mockMatrices.filter(m => m.status === 'red').length} critical, {mockMatrices.filter(m => m.status === 'amber').length} warning
                      </Typography>
                    }
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                      {mockMatrices.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Metrics
                    </Typography>
                  </Box>
                </ListItem>

                {/* Alerts Count */}
                <ListItem sx={{ 
                  bgcolor: alpha(theme.palette.error.main, 0.05),
                  borderRadius: 2,
                  mb: 2,
                  border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`
                }}>
                  <ListItemIcon>
                    <NotificationsActive sx={{ fontSize: 24, color: 'error.main' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.main' }}>
                        Alerts Count
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        Recent system alerts and notifications • {mockAlerts.filter(a => a.severity === 'red').length} critical, {mockAlerts.filter(a => a.severity === 'amber').length} warning
                      </Typography>
                    }
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>
                      {mockAlerts.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Alerts
                    </Typography>
                  </Box>
                </ListItem>

                {/* Additional Summary Stats */}
                <Box sx={{ 
                  bgcolor: alpha(theme.palette.grey[500], 0.05),
                  borderRadius: 2,
                  p: 2,
                  border: `1px solid ${alpha(theme.palette.grey[500], 0.1)}`
                }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                    Quick Stats
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                          {mockMatrices.filter(m => m.status === 'green').length}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Healthy Metrics
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'info.main' }}>
                          {Math.round((mockMatrices.filter(m => m.status === 'green').length / mockMatrices.length) * 100)}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          System Health
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Trends Graph */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Timeline sx={{ fontSize: 24 }} />
                Trends Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {timeFilter} trends for metrics and alerts
              </Typography>
              
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                    <XAxis 
                      dataKey="period" 
                      stroke={theme.palette.text.secondary}
                      fontSize={12}
                    />
                    <YAxis 
                      stroke={theme.palette.text.secondary}
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 8,
                        boxShadow: theme.shadows[8]
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="redMetrics" 
                      stroke="#f44336" 
                      strokeWidth={3}
                      name="Red Metrics"
                      dot={{ fill: '#f44336', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amberMetrics" 
                      stroke="#ff9800" 
                      strokeWidth={3}
                      name="Amber Metrics"
                      dot={{ fill: '#ff9800', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="redAlerts" 
                      stroke="#d32f2f" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Red Alerts"
                      dot={{ fill: '#d32f2f', strokeWidth: 2, r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amberAlerts" 
                      stroke="#f57c00" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Amber Alerts"
                      dot={{ fill: '#f57c00', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlertsDashboard;