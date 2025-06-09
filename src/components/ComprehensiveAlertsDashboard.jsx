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
  Chip
} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import TrendCard from './TrendCard';

const ComprehensiveAlertsDashboard = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-12-31' });
  const [timeFilter, setTimeFilter] = useState('Daily');

  // Sample data for charts
  const trendsData = [
    { name: 'Jan', redAlerts: 45, amberAlerts: 78, redMetrics: 23, amberMetrics: 56 },
    { name: 'Feb', redAlerts: 52, amberAlerts: 65, redMetrics: 28, amberMetrics: 48 },
    { name: 'Mar', redAlerts: 38, amberAlerts: 82, redMetrics: 19, amberMetrics: 62 },
    { name: 'Apr', redAlerts: 67, amberAlerts: 73, redMetrics: 34, amberMetrics: 55 },
    { name: 'May', redAlerts: 43, amberAlerts: 69, redMetrics: 21, amberMetrics: 51 },
    { name: 'Jun', redAlerts: 59, amberAlerts: 76, redMetrics: 31, amberMetrics: 58 },
    { name: 'Jul', redAlerts: 48, amberAlerts: 71, redMetrics: 25, amberMetrics: 53 },
    { name: 'Aug', redAlerts: 61, amberAlerts: 84, redMetrics: 33, amberMetrics: 61 },
    { name: 'Sep', redAlerts: 44, amberAlerts: 67, redMetrics: 22, amberMetrics: 49 },
    { name: 'Oct', redAlerts: 55, amberAlerts: 79, redMetrics: 29, amberMetrics: 57 },
    { name: 'Nov', redAlerts: 39, amberAlerts: 72, redMetrics: 18, amberMetrics: 52 },
    { name: 'Dec', redAlerts: 63, amberAlerts: 88, redMetrics: 35, amberMetrics: 64 }
  ];

  const groupedData = [
    { groupBy: 'Database Services', metricsCount: 156, alertsCount: 23 },
    { groupBy: 'API Gateway', metricsCount: 89, alertsCount: 12 },
    { groupBy: 'Load Balancer', metricsCount: 234, alertsCount: 45 },
    { groupBy: 'Message Queue', metricsCount: 67, alertsCount: 8 },
    { groupBy: 'Cache Layer', metricsCount: 123, alertsCount: 19 },
    { groupBy: 'Authentication', metricsCount: 78, alertsCount: 6 },
    { groupBy: 'Storage Systems', metricsCount: 145, alertsCount: 31 },
    { groupBy: 'Network Infrastructure', metricsCount: 201, alertsCount: 27 }
  ];

  const cardGroups = [
    {
      title: 'Critical Red Alerts Trend',
      data: trendsData,
      primaryDataKey: 'redAlerts',
      primaryColor: '#f44336',
      secondaryDataKey: 'amberAlerts',
      secondaryColor: '#ff9800',
      primaryName: 'Red Alerts',
      secondaryName: 'Amber Alerts',
      description: 'High priority system alerts requiring immediate attention'
    },
    {
      title: 'Warning Amber Alerts Trend', 
      data: trendsData,
      primaryDataKey: 'amberAlerts',
      primaryColor: '#ff9800',
      secondaryDataKey: 'redAlerts',
      secondaryColor: '#f44336',
      primaryName: 'Amber Alerts',
      secondaryName: 'Red Alerts',
      description: 'Medium priority alerts that need monitoring'
    },
    {
      title: 'System Performance Metrics',
      data: trendsData,
      primaryDataKey: 'redMetrics',
      primaryColor: '#2196f3',
      secondaryDataKey: 'amberMetrics',
      secondaryColor: '#ff9800',
      primaryName: 'Red Metrics',
      secondaryName: 'Amber Metrics',
      description: 'Overall system health and performance indicators'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
        Comprehensive Alerts & Metrics Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor system alerts, metrics trends, and performance indicators across all services
      </Typography>

      {/* Date Range and Filter Controls */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        gap: 3, 
        alignItems: 'center', 
        flexWrap: 'wrap',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
          Filter Controls:
        </Typography>
        <TextField
          label="Start Date"
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
          variant="outlined"
          size="small"
        />
        <TextField
          label="End Date"
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
          variant="outlined"
          size="small"
        />
        <ButtonGroup variant="contained" size="medium">
          {['Daily', 'Weekly', 'Monthly'].map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? 'contained' : 'outlined'}
              onClick={() => setTimeFilter(filter)}
              sx={{ minWidth: 90 }}
            >
              {filter}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Three Groups of Alert Trend Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cardGroups.map((group, index) => (
          <Grid item xs={12} md={4} key={index}>
            <TrendCard
              title={group.title}
              description={group.description}
              data={group.data}
              primaryDataKey={group.primaryDataKey}
              primaryColor={group.primaryColor}
              secondaryDataKey={group.secondaryDataKey}
              secondaryColor={group.secondaryColor}
              primaryName={group.primaryName}
              secondaryName={group.secondaryName}
            />
          </Grid>
        ))}
      </Grid>

      {/* Bottom Section: Table and Trends Graph */}
      <Grid container spacing={3}>
        {/* Table Component */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: 450, 
            border: 1, 
            borderColor: 'divider' 
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Metrics Summary by Group
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Breakdown of metrics and alerts across different system components
              </Typography>
              <TableContainer sx={{ maxHeight: 350 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Group By</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Metrics Count</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>Alerts Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupedData.map((row, index) => (
                      <TableRow key={index} hover sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                        <TableCell component="th" scope="row">
                          <Chip 
                            label={row.groupBy} 
                            variant="outlined" 
                            size="small"
                            color="primary"
                            sx={{ fontWeight: 500 }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {row.metricsCount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={row.alertsCount} 
                            size="small"
                            color={row.alertsCount > 30 ? 'error' : row.alertsCount > 15 ? 'warning' : 'success'}
                            sx={{ fontWeight: 500 }}
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

        {/* Trends Graph Component */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: 450, 
            border: 1, 
            borderColor: 'divider' 
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Metrics & Alerts Trends Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Comparative view of red/amber metrics and alerts over time
              </Typography>
              <Box sx={{ height: 350 }}>
                <ReactECharts
                  option={{
                    tooltip: {
                      trigger: 'axis',
                      backgroundColor: '#fff',
                      borderColor: '#e0e0e0',
                      borderWidth: 1,
                      borderRadius: 8,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      textStyle: {
                        fontSize: 12,
                        color: '#333'
                      }
                    },
                    legend: {
                      data: ['Red Metrics', 'Amber Metrics', 'Red Alerts', 'Amber Alerts'],
                      bottom: 10,
                      textStyle: {
                        fontSize: 12
                      }
                    },
                    grid: {
                      left: 40,
                      right: 30,
                      top: 20,
                      bottom: 50,
                      containLabel: false
                    },
                    xAxis: {
                      type: 'category',
                      data: trendsData.map(item => item.name),
                      axisLine: {
                        lineStyle: {
                          color: '#e0e0e0'
                        }
                      },
                      axisTick: {
                        show: false
                      },
                      axisLabel: {
                        fontSize: 12,
                        color: '#666'
                      }
                    },
                    yAxis: {
                      type: 'value',
                      axisLine: {
                        lineStyle: {
                          color: '#e0e0e0'
                        }
                      },
                      axisTick: {
                        show: false
                      },
                      axisLabel: {
                        fontSize: 12,
                        color: '#666'
                      },
                      splitLine: {
                        lineStyle: {
                          color: '#f0f0f0',
                          type: 'dashed'
                        }
                      }
                    },
                    series: [
                      {
                        name: 'Red Metrics',
                        type: 'line',
                        data: trendsData.map(item => item.redMetrics),
                        smooth: true,
                        lineStyle: {
                          color: '#f44336',
                          width: 3
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                          color: '#f44336'
                        }
                      },
                      {
                        name: 'Amber Metrics',
                        type: 'line',
                        data: trendsData.map(item => item.amberMetrics),
                        smooth: true,
                        lineStyle: {
                          color: '#ff9800',
                          width: 3
                        },
                        symbol: 'circle',
                        symbolSize: 4,
                        itemStyle: {
                          color: '#ff9800'
                        }
                      },
                      {
                        name: 'Red Alerts',
                        type: 'line',
                        data: trendsData.map(item => item.redAlerts),
                        smooth: true,
                        lineStyle: {
                          color: '#d32f2f',
                          width: 2,
                          type: 'dashed'
                        },
                        symbol: 'circle',
                        symbolSize: 3,
                        itemStyle: {
                          color: '#d32f2f'
                        }
                      },
                      {
                        name: 'Amber Alerts',
                        type: 'line',
                        data: trendsData.map(item => item.amberAlerts),
                        smooth: true,
                        lineStyle: {
                          color: '#f57c00',
                          width: 2,
                          type: 'dashed'
                        },
                        symbol: 'circle',
                        symbolSize: 3,
                        itemStyle: {
                          color: '#f57c00'
                        }
                      }
                    ]
                  }}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'canvas' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComprehensiveAlertsDashboard;