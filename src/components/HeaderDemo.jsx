import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid,
  Divider,
  Chip,
  Switch,
  FormControlLabel
} from '@mui/material';
import Header from './Header';
import HeaderV2 from './HeaderV2';

const HeaderDemo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleMenuToggle = () => {
    console.log('Menu toggle clicked');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Controls */}
      <Box 
        sx={{ 
          position: 'fixed', 
          top: 80, 
          right: 20, 
          zIndex: 1300,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <Card sx={{ p: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={showOriginal}
                onChange={(e) => setShowOriginal(e.target.checked)}
                color="primary"
              />
            }
            label={showOriginal ? "Original Header" : "HeaderV2"}
          />
        </Card>
      </Box>

      {/* Header Display */}
      {showOriginal ? (
        <Header 
          onMenuToggle={handleMenuToggle}
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
        />
      ) : (
        <HeaderV2 
          onMenuToggle={handleMenuToggle}
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
        />
      )}

      {/* Content Area */}
      <Box sx={{ pt: 12, px: 3 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 4 }}>
            Header Component Showcase
          </Typography>

          <Grid container spacing={4}>
            {/* Original Header Info */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Original Header
                    </Typography>
                    <Chip 
                      label="Current" 
                      color="primary" 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Classic dashboard header with essential navigation features:
                  </Typography>
                  
                  <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                    <li>Standard Material-UI AppBar design</li>
                    <li>Dark slate background (#1e293b)</li>
                    <li>Basic search functionality</li>
                    <li>User profile menu</li>
                    <li>Notification system</li>
                    <li>Theme toggle capability</li>
                    <li>Responsive layout</li>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Key Features:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Menu Toggle" variant="outlined" size="small" />
                    <Chip label="Search Bar" variant="outlined" size="small" />
                    <Chip label="Notifications" variant="outlined" size="small" />
                    <Chip label="Profile Menu" variant="outlined" size="small" />
                    <Chip label="Theme Toggle" variant="outlined" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* HeaderV2 Info */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', border: '2px solid #667eea' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      HeaderV2 (Modern)
                    </Typography>
                    <Chip 
                      label="New" 
                      color="success" 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    Modern glassmorphism header with enhanced user experience:
                  </Typography>
                  
                  <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                    <li>Gradient background with glass effect</li>
                    <li>Enhanced branding with Analytics Hub</li>
                    <li>Improved search with better placeholder</li>
                    <li>Live status indicator chip</li>
                    <li>Rich notification cards with avatars</li>
                    <li>Premium user profile with status</li>
                    <li>Modern backdrop blur effects</li>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Enhanced Features:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip label="Glassmorphism" color="primary" size="small" />
                    <Chip label="Live Status" color="success" size="small" />
                    <Chip label="Rich Notifications" color="info" size="small" />
                    <Chip label="Premium Profile" color="warning" size="small" />
                    <Chip label="Backdrop Blur" color="secondary" size="small" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Comparison Table */}
          <Card sx={{ mt: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontweight: 600, mb: 3 }}>
                Feature Comparison
              </Typography>
              
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Feature</th>
                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>Original</th>
                      <th style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>HeaderV2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Background Style', 'Solid Color', 'Gradient + Blur'],
                      ['Branding', 'Simple Title', 'Logo + Subtitle'],
                      ['Search Design', 'Basic Input', 'Glass Effect'],
                      ['Status Indicator', '❌', '✅ Live Chip'],
                      ['Notifications', 'Basic List', 'Rich Cards'],
                      ['Profile Menu', 'Standard', 'Premium Design'],
                      ['Visual Effects', 'None', 'Glassmorphism'],
                      ['User Experience', 'Functional', 'Premium'],
                    ].map(([feature, original, v2], index) => (
                      <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px', fontWeight: 500 }}>{feature}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{original}</td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#1976d2' }}>{v2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>

          {/* Usage Instructions */}
          <Card sx={{ mt: 4, mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                How to Use
              </Typography>
              
              <Typography variant="body1" color="text.secondary" paragraph>
                Toggle between the two header variants using the switch in the top-right corner. 
                Both headers are fully functional with:
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Interactive Elements:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <li>Click the menu button to trigger navigation</li>
                    <li>Use the search bar to test input functionality</li>
                    <li>Click notifications to see the dropdown</li>
                    <li>Access user profile menu</li>
                    <li>Toggle between light/dark theme modes</li>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Implementation:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <li>Import HeaderV2 component</li>
                    <li>Pass same props as original Header</li>
                    <li>Replace in Layout component</li>
                    <li>Fully backward compatible</li>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderDemo;