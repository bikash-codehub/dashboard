import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import AIAnalytics from './components/AIAnalytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'ai-analytics':
        return <AIAnalytics />;
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
