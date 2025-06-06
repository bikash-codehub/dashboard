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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const AlertsAnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-12-31' });
  const [timeFilter, setTimeFilter] = useState('Daily');

  // Sample data for charts
  const trendsData = [
    { name: 'Jan', redAlerts: 45, amberAlerts: 78, redMetrics: 23, amberMetrics: 56 },
    { name: 'Feb', redAlerts: 52, amberAlerts: 65, redMetrics: 28, amberMetrics: 48 },
    { name: 'Mar', redAlerts: 38, amberAlerts: 82, redMetrics: 19, amberMetrics: 62 },
    { name: 'Apr', redAlerts: 67, amberAlerts: 73, redMetrics: 34, amberMetrics: 55 },
    { name: 'May', redAlerts: 43, amberAlerts: 69, redMetrics: 21, amberMetrics: 51 },
    { name: 'Jun', redAlerts: 59, amberAlerts: 76, redMetrics: 31, amberMetrics: 58 }
  ];

  const groupedData = [
    { groupBy: 'Region', metricsCount: 156, alertsCount: 23 },
    { groupBy: 'Department', metricsCount: 89, alertsCount: 12 },
    { groupBy: 'Service', metricsCount: 234, alertsCount: 45 },
    { groupBy: 'Environment', metricsCount: 67, alertsCount: 8 },
    { groupBy: 'Application', metricsCount: 123, alertsCount: 19 }
  ];

  const cardGroups = [
    {
      title: 'Critical Alerts Trend',
      data: trendsData,
      color: '#f44336',
      dataKey: 'redAlerts'
    },
    {
      title: 'Warning Alerts Trend', 
      data: trendsData,
      color: '#ff9800',
      dataKey: 'amberAlerts'
    },
    {
      title: 'Overall System Health',
      data: trendsData,
      color: '#4caf50',
      dataKey: 'redAlerts'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Alerts Analytics Dashboard
      </Typography>

      {/* Date Range and Filter Controls */}
      <Box sx={{ mb: 4, display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          label="Start Date"
          type="date"
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />
        <ButtonGroup variant="contained" size="medium">
          {['Daily', 'Weekly', 'Monthly'].map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? 'contained' : 'outlined'}
              onClick={() => setTimeFilter(filter)}
              sx={{ minWidth: 80 }}
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
            <Card sx={{ height: 350 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {group.title}
                </Typography>
                <Box sx={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={group.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey={group.dataKey} 
                        stroke={group.color} 
                        fill={group.color}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Section: Table and Trends Graph */}
      <Grid container spacing={3}>
        {/* Table Component */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Metrics Summary by Group
              </Typography>
              <TableContainer sx={{ maxHeight: 320 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Group By</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Metrics Count</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Alerts Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupedData.map((row, index) => (
                      <TableRow key={index} hover>
                        <TableCell component="th" scope="row">
                          <Chip 
                            label={row.groupBy} 
                            variant="outlined" 
                            size="small"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {row.metricsCount}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={row.alertsCount} 
                            size="small"
                            color={row.alertsCount > 20 ? 'error' : row.alertsCount > 10 ? 'warning' : 'success'}
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
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Metrics & Alerts Trends
              </Typography>
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="redMetrics" 
                      stroke="#f44336" 
                      name="Red Metrics"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amberMetrics" 
                      stroke="#ff9800" 
                      name="Amber Metrics"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="redAlerts" 
                      stroke="#d32f2f" 
                      name="Red Alerts"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amberAlerts" 
                      stroke="#f57c00" 
                      name="Amber Alerts"
                      strokeWidth={2}
                      strokeDasharray="5 5"
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

export default AlertsAnalyticsDashboard;