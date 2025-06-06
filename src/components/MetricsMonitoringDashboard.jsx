import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  Container,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  Warning,
  Error,
  Speed,
  Security
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from 'recharts';

const MetricsMonitoringDashboard = () => {
  const theme = useTheme();
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-12-31' });
  const [timeFilter, setTimeFilter] = useState('Daily');

  // Enhanced sample data for charts
  const metricsData = [
    { name: 'Jan', redAlerts: 42, amberAlerts: 73, redMetrics: 28, amberMetrics: 61 },
    { name: 'Feb', redAlerts: 48, amberAlerts: 67, redMetrics: 32, amberMetrics: 54 },
    { name: 'Mar', redAlerts: 35, amberAlerts: 79, redMetrics: 24, amberMetrics: 68 },
    { name: 'Apr', redAlerts: 63, amberAlerts: 71, redMetrics: 39, amberMetrics: 58 },
    { name: 'May', redAlerts: 41, amberAlerts: 66, redMetrics: 26, amberMetrics: 53 },
    { name: 'Jun', redAlerts: 56, amberAlerts: 74, redMetrics: 35, amberMetrics: 61 },
    { name: 'Jul', redAlerts: 49, amberAlerts: 69, redMetrics: 31, amberMetrics: 56 }
  ];

  const tableData = [
    { groupBy: 'Infrastructure', matricesCount: 245, alertsCount: 34 },
    { groupBy: 'Applications', matricesCount: 189, alertsCount: 27 },
    { groupBy: 'Network', matricesCount: 156, alertsCount: 19 },
    { groupBy: 'Security', matricesCount: 98, alertsCount: 15 },
    { groupBy: 'Database', matricesCount: 134, alertsCount: 21 },
    { groupBy: 'Storage', matricesCount: 87, alertsCount: 12 },
    { groupBy: 'Compute', matricesCount: 203, alertsCount: 28 }
  ];

  const alertCardGroups = [
    {
      title: 'Critical System Alerts',
      subtitle: 'High Priority Incidents',
      data: metricsData,
      color: '#d32f2f',
      gradientColor: ['#ffebee', '#ffcdd2', '#e57373'],
      dataKey: 'redAlerts',
      icon: Error,
      iconColor: '#d32f2f',
      currentValue: 156,
      change: '+12%',
      changeColor: '#f44336'
    },
    {
      title: 'Warning Level Alerts', 
      subtitle: 'Medium Priority Issues',
      data: metricsData,
      color: '#f57c00',
      gradientColor: ['#fff3e0', '#ffe0b2', '#ffb74d'],
      dataKey: 'amberAlerts',
      icon: Warning,
      iconColor: '#f57c00',
      currentValue: 89,
      change: '+8%',
      changeColor: '#ff9800'
    },
    {
      title: 'System Performance',
      subtitle: 'Overall Health Metrics',
      data: metricsData,
      color: '#1976d2',
      gradientColor: ['#e3f2fd', '#bbdefb', '#64b5f6'],
      dataKey: 'redMetrics',
      icon: Speed,
      iconColor: '#1976d2',
      currentValue: 324,
      change: '+5%',
      changeColor: '#2196f3'
    }
  ];

  const summaryStats = [
    {
      title: 'Total Metrics',
      value: '1,248',
      change: '+15.3%',
      changeType: 'positive',
      icon: Assessment,
      color: '#4caf50',
      bgColor: alpha('#4caf50', 0.1)
    },
    {
      title: 'Active Alerts',
      value: '89',
      change: '+12.1%',
      changeType: 'negative',
      icon: Warning,
      color: '#ff9800',
      bgColor: alpha('#ff9800', 0.1)
    },
    {
      title: 'Critical Issues',
      value: '12',
      change: '-8.2%',
      changeType: 'positive',
      icon: Error,
      color: '#f44336',
      bgColor: alpha('#f44336', 0.1)
    },
    {
      title: 'System Health',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: Security,
      color: '#2196f3',
      bgColor: alpha('#2196f3', 0.1)
    }
  ];

  const getAlertSeverityColor = (count) => {
    if (count > 25) return 'error';
    if (count > 15) return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
      p: 0
    }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Enhanced Header Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3,
            p: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            color: 'white',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.25)'
          }}>
            <Avatar sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              mr: 3, 
              width: 56, 
              height: 56,
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              <Assessment sx={{ fontSize: 32 }} />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h3" component="h1" sx={{ 
                fontWeight: 800, 
                mb: 1,
                fontSize: { xs: '1.75rem', md: '2.5rem' }
              }}>
                Metrics Monitoring Dashboard
              </Typography>
              <Typography variant="h6" sx={{ 
                opacity: 0.9, 
                fontWeight: 400,
                fontSize: { xs: '0.95rem', md: '1.1rem' }
              }}>
                Real-time insights • System Performance • Alert Management
              </Typography>
            </Box>
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              gap: 2,
              bgcolor: 'rgba(255,255,255,0.15)',
              borderRadius: 2,
              p: 2
            }}>
              <TrendingUp sx={{ fontSize: 24 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Live Data
              </Typography>
            </Box>
          </Box>

          {/* Summary Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {summaryStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  p: 2,
                  height: '100%',
                  background: `linear-gradient(135deg, ${stat.bgColor} 0%, ${alpha(stat.color, 0.05)} 100%)`,
                  border: `1px solid ${alpha(stat.color, 0.1)}`,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${alpha(stat.color, 0.2)}`
                  }
                }}>
                  <CardContent sx={{ p: '16px !important' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: stat.color, 
                        width: 48, 
                        height: 48, 
                        mr: 2,
                        boxShadow: `0 4px 12px ${alpha(stat.color, 0.3)}`
                      }}>
                        <stat.icon sx={{ fontSize: 24 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={stat.change}
                      size="small"
                      color={stat.changeType === 'positive' ? 'success' : 'error'}
                      sx={{ fontWeight: 600 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Enhanced Controls Section */}
        <Card sx={{ 
          mb: 4,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: 3,
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
              📊 Filter Controls
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 3, 
              alignItems: 'center', 
              flexWrap: 'wrap'
            }}>
              <TextField
                label="Start Date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  minWidth: 180,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white'
                  }
                }}
                size="small"
              />
              <TextField
                label="End Date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={{ 
                  minWidth: 180,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white'
                  }
                }}
                size="small"
              />
              <ButtonGroup variant="contained" size="medium" sx={{ borderRadius: 2 }}>
                {['Daily', 'Weekly', 'Monthly'].map((filter) => (
                  <Button
                    key={filter}
                    variant={timeFilter === filter ? 'contained' : 'outlined'}
                    onClick={() => setTimeFilter(filter)}
                    sx={{ 
                      minWidth: 90,
                      fontWeight: 600,
                      ...(timeFilter === filter && {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      })
                    }}
                  >
                    {filter}
                  </Button>
                ))}
              </ButtonGroup>
              <Chip 
                label={`${timeFilter} View • ${dateRange.start} to ${dateRange.end}`}
                variant="outlined"
                color="primary"
                sx={{ 
                  ml: 'auto',
                  fontWeight: 500,
                  bgcolor: 'white'
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Enhanced Three Alert Trend Card Groups */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {alertCardGroups.map((group, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: 420, 
                background: `linear-gradient(135deg, ${group.gradientColor[0]} 0%, ${group.gradientColor[1]} 50%, ${group.gradientColor[2]} 100%)`,
                border: `2px solid ${alpha(group.color, 0.2)}`,
                borderRadius: 4,
                boxShadow: `0 8px 32px ${alpha(group.color, 0.15)}`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: `0 20px 40px ${alpha(group.color, 0.25)}`,
                  '& .chart-container': {
                    transform: 'scale(1.05)'
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${group.color}, ${alpha(group.color, 0.6)})`
                }
              }}>
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ 
                        bgcolor: group.iconColor, 
                        mr: 2, 
                        width: 56, 
                        height: 56,
                        boxShadow: `0 6px 20px ${alpha(group.iconColor, 0.3)}`
                      }}>
                        <group.icon sx={{ fontSize: 28, color: 'white' }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: 'text.primary' }}>
                          {group.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {group.subtitle}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: group.iconColor }}>
                        {group.currentValue}
                      </Typography>
                      <Chip 
                        label={group.change}
                        size="small"
                        sx={{ 
                          fontWeight: 600,
                          bgcolor: alpha(group.changeColor, 0.1),
                          color: group.changeColor,
                          border: `1px solid ${alpha(group.changeColor, 0.3)}`
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ flexGrow: 1, height: 280 }} className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={group.data}>
                        <defs>
                          <linearGradient id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={group.color} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={group.color} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={alpha(group.color, 0.2)} />
                        <XAxis 
                          dataKey="name" 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: alpha(theme.palette.text.primary, 0.7) }}
                        />
                        <YAxis 
                          fontSize={11}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: alpha(theme.palette.text.primary, 0.7) }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            border: `1px solid ${group.color}`,
                            borderRadius: '12px',
                            fontSize: '12px',
                            boxShadow: `0 8px 32px ${alpha(group.color, 0.2)}`,
                            backdropFilter: 'blur(10px)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey={group.dataKey} 
                          stroke={group.color} 
                          fill={`url(#gradient${index})`}
                          strokeWidth={3}
                          dot={{ fill: group.color, strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: group.color, strokeWidth: 2, fill: 'white' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Enhanced Bottom Section: Table and Comprehensive Trends Graph */}
        <Grid container spacing={4}>
          {/* Premium Table Component */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: 500,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1),
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 48px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    mr: 2, 
                    width: 48, 
                    height: 48,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                  }}>
                    <Assessment sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Metrics Summary by Category
                  </Typography>
                </Box>
                <TableContainer sx={{ 
                  maxHeight: 380,
                  borderRadius: 2,
                  bgcolor: 'white',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ 
                          fontWeight: 800, 
                          bgcolor: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          color: 'white',
                          borderBottom: 'none',
                          fontSize: '0.875rem'
                        }}>
                          Group By
                        </TableCell>
                        <TableCell align="right" sx={{ 
                          fontWeight: 800,
                          bgcolor: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          color: 'white',
                          borderBottom: 'none',
                          fontSize: '0.875rem'
                        }}>
                          Matrices Count
                        </TableCell>
                        <TableCell align="right" sx={{ 
                          fontWeight: 800,
                          bgcolor: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          color: 'white',
                          borderBottom: 'none',
                          fontSize: '0.875rem'
                        }}>
                          Alerts Count
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row, index) => (
                        <TableRow 
                          key={index} 
                          hover
                          sx={{ 
                            '&:nth-of-type(odd)': { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                            '&:hover': { 
                              bgcolor: alpha(theme.palette.primary.main, 0.08),
                              transform: 'scale(1.01)',
                              transition: 'all 0.2s ease'
                            },
                            cursor: 'pointer'
                          }}
                        >
                          <TableCell component="th" scope="row" sx={{ py: 2 }}>
                            <Chip 
                              label={row.groupBy} 
                              variant="outlined" 
                              size="small"
                              color="primary"
                              sx={{ 
                                fontWeight: 600,
                                borderRadius: 3,
                                '&:hover': { 
                                  bgcolor: alpha(theme.palette.primary.main, 0.1) 
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell align="right" sx={{ py: 2 }}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 700,
                                color: 'text.primary',
                                fontSize: '0.95rem'
                              }}
                            >
                              {row.matricesCount.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ py: 2 }}>
                            <Chip 
                              label={row.alertsCount} 
                              size="small"
                              color={getAlertSeverityColor(row.alertsCount)}
                              sx={{ 
                                fontWeight: 700, 
                                minWidth: 55,
                                fontSize: '0.8rem',
                                borderRadius: 3
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Premium Comprehensive Trends Graph */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: 500,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: '1px solid',
              borderColor: alpha(theme.palette.secondary.main, 0.1),
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 48px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.secondary.main, 
                    mr: 2, 
                    width: 48, 
                    height: 48,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.3)}`
                  }}>
                    <TrendingUp sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Multi-Metric Trends Analysis
                  </Typography>
                </Box>
                <Box sx={{ 
                  height: 380,
                  bgcolor: 'white',
                  borderRadius: 2,
                  p: 2,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metricsData}>
                      <defs>
                        <linearGradient id="redMetricsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d32f2f" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#d32f2f" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="amberMetricsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f57c00" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#f57c00" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                      <XAxis 
                        dataKey="name" 
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: theme.palette.text.secondary }}
                      />
                      <YAxis 
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: theme.palette.text.secondary }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(255,255,255,0.98)',
                          border: '1px solid #e0e0e0',
                          borderRadius: '12px',
                          fontSize: '12px',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                          backdropFilter: 'blur(10px)'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{ 
                          fontSize: '11px', 
                          paddingTop: '15px',
                          fontWeight: 600
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="redMetrics" 
                        stroke="#d32f2f" 
                        name="🔴 Red Metrics"
                        strokeWidth={4}
                        dot={{ fill: '#d32f2f', strokeWidth: 3, r: 5, stroke: 'white' }}
                        activeDot={{ r: 7, stroke: '#d32f2f', strokeWidth: 3, fill: 'white' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="amberMetrics" 
                        stroke="#f57c00" 
                        name="🟡 Amber Metrics"
                        strokeWidth={4}
                        dot={{ fill: '#f57c00', strokeWidth: 3, r: 5, stroke: 'white' }}
                        activeDot={{ r: 7, stroke: '#f57c00', strokeWidth: 3, fill: 'white' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="redAlerts" 
                        stroke="#c62828" 
                        name="🚨 Red Alerts"
                        strokeWidth={3}
                        strokeDasharray="8 4"
                        dot={{ fill: '#c62828', strokeWidth: 2, r: 4, stroke: 'white' }}
                        activeDot={{ r: 6, stroke: '#c62828', strokeWidth: 2, fill: 'white' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="amberAlerts" 
                        stroke="#ef6c00" 
                        name="⚠️ Amber Alerts"
                        strokeWidth={3}
                        strokeDasharray="8 4"
                        dot={{ fill: '#ef6c00', strokeWidth: 2, r: 4, stroke: 'white' }}
                        activeDot={{ r: 6, stroke: '#ef6c00', strokeWidth: 2, fill: 'white' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MetricsMonitoringDashboard;