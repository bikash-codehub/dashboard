import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import AIAnalytics from './components/AIAnalytics';
import AIAnalyticsV2 from './components/AIAnalyticsV2';
import TableDemo from './components/TableDemo';
import DualTableDemo from './components/DualTableDemo';
import AlertsMatrixDemo from './components/AlertsMatrixDemo';
import PathAnalyticsTable from './components/PathAnalyticsTable';
import FilterableDataPanel from './components/FilterableDataPanel';
import FilterableDataPanelDrawer from './components/FilterableDataPanelDrawer';
import FilterableDataPanelDemo from './components/FilterableDataPanelDemo';
import FormVariants from './components/FormVariants';
import EngageTeamForm from './components/EngageTeamForm';
import FormGenerator from './components/FormGenerator';
import AlertsDashboard from './components/AlertsDashboard';
import AlertsAnalyticsDashboard from './components/AlertsAnalyticsDashboard';
import MetricsMonitoringDashboard from './components/MetricsMonitoringDashboard';
import ComprehensiveAlertsDashboard from './components/ComprehensiveAlertsDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'ai-analytics':
        return <AIAnalytics />;
      case 'ai-analytics-v2':
        return <AIAnalyticsV2 />;
      case 'table-demo':
        return <TableDemo />;
      case 'dual-table-demo':
        return <DualTableDemo />;
      case 'alerts-matrix-demo':
        return <AlertsMatrixDemo />;
      case 'path-analytics':
        return <PathAnalyticsTable />;
      case 'filterable-panel':
        return <FilterableDataPanel />;
      case 'filterable-panel-drawer':
        return <FilterableDataPanelDrawer />;
      case 'filterable-panel-demo':
        return <FilterableDataPanelDemo />;
      case 'form-demo':
        return <FormVariants />;
      case 'engage-team':
        return <EngageTeamForm />;
      case 'form-generator':
        return <FormGenerator />;
      case 'alerts-dashboard':
        return <AlertsDashboard />;
      case 'alerts-analytics':
        return <AlertsAnalyticsDashboard />;
      case 'metrics-monitoring':
        return <MetricsMonitoringDashboard />;
      case 'comprehensive-alerts':
        return <ComprehensiveAlertsDashboard />;
      default:
        return (
          <>
            {/* Dashboard Content */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Welcome to Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Manage your business with our comprehensive dashboard solution.
              </Typography>
            </Box>

            {/* Sample Dashboard Cards */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Total Users
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                      24.5k
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +12% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Revenue
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                      $48.2k
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +8% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Orders
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                      1,248
                    </Typography>
                    <Typography variant="body2" color="warning.main">
                      -3% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Conversion Rate
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                      3.4%
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      +2% from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Quick Actions */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" size="large">
                    Add New User
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => setCurrentPage('ai-analytics')}
                  >
                    View AI Analytics
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => setCurrentPage('ai-analytics-v2')}
                  >
                    AI Analytics Hub
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={() => setCurrentPage('table-demo')}
                  >
                    Table Demo
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="info"
                    onClick={() => setCurrentPage('dual-table-demo')}
                  >
                    Dual Table Demo
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="error"
                    onClick={() => setCurrentPage('alerts-matrix-demo')}
                  >
                    Alerts Matrix Demo
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="secondary"
                    onClick={() => setCurrentPage('path-analytics')}
                  >
                    Path Analytics Table
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="success"
                    onClick={() => setCurrentPage('filterable-panel')}
                  >
                    Filterable Data Panel
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="outlined" 
                    size="large"
                    color="success"
                    onClick={() => setCurrentPage('filterable-panel-drawer')}
                  >
                    Filterable Panel (Drawer)
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="info"
                    onClick={() => setCurrentPage('filterable-panel-demo')}
                  >
                    Reusable Filter Panel
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => setCurrentPage('form-demo')}
                  >
                    Form Demo
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="warning"
                    onClick={() => setCurrentPage('engage-team')}
                  >
                    Engage Team
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="secondary"
                    onClick={() => setCurrentPage('form-generator')}
                  >
                    Form Generator
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="error"
                    onClick={() => setCurrentPage('alerts-dashboard')}
                  >
                    Alerts Dashboard
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="info"
                    onClick={() => setCurrentPage('alerts-analytics')}
                  >
                    Alerts Analytics
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="success"
                    onClick={() => setCurrentPage('metrics-monitoring')}
                  >
                    Metrics Monitoring
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="primary"
                    onClick={() => setCurrentPage('comprehensive-alerts')}
                  >
                    Comprehensive Dashboard
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="large">
                    Generate Report
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </ThemeProvider>
  );
}
