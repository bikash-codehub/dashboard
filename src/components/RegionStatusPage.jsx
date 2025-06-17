import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ButtonGroup,
  Paper
} from '@mui/material';
import {
  Language as LanguageIcon,
  Dns as DnsIcon,
  Folder as FolderIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowRight as ArrowRightIcon
} from '@mui/icons-material';

const RegionStatusPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedRows, setExpandedRows] = useState(new Set());

  // Sample data
  const regionsData = [
    {
      id: 'us-east',
      name: 'US East',
      status: 'green',
      services: [
        {
          id: 'service-1',
          name: 'Authentication Service',
          status: 'green',
          folderGroups: [
            { name: 'Config Files', status: 'green', count: 12 },
            { name: 'Security Policies', status: 'green', count: 8 },
            { name: 'Backup Scripts', status: 'amber', count: 5 }
          ]
        },
        {
          id: 'service-2',
          name: 'Database Cluster',
          status: 'amber',
          folderGroups: [
            { name: 'Primary DB', status: 'green', count: 3 },
            { name: 'Replica DBs', status: 'amber', count: 7 },
            { name: 'Backup Storage', status: 'green', count: 15 }
          ]
        },
        {
          id: 'service-3',
          name: 'API Gateway',
          status: 'red',
          folderGroups: [
            { name: 'Route Config', status: 'red', count: 4 },
            { name: 'Rate Limiting', status: 'amber', count: 6 },
            { name: 'Load Balancer', status: 'green', count: 2 }
          ]
        }
      ]
    },
    {
      id: 'us-west',
      name: 'US West',
      status: 'amber',
      services: [
        {
          id: 'service-4',
          name: 'CDN Network',
          status: 'green',
          folderGroups: [
            { name: 'Edge Servers', status: 'green', count: 25 },
            { name: 'Cache Rules', status: 'green', count: 18 },
            { name: 'SSL Certificates', status: 'amber', count: 3 }
          ]
        },
        {
          id: 'service-5',
          name: 'Message Queue',
          status: 'amber',
          folderGroups: [
            { name: 'Producer Config', status: 'amber', count: 9 },
            { name: 'Consumer Groups', status: 'green', count: 14 },
            { name: 'Dead Letter Queue', status: 'red', count: 2 }
          ]
        }
      ]
    },
    {
      id: 'eu-central',
      name: 'EU Central',
      status: 'green',
      services: [
        {
          id: 'service-6',
          name: 'Analytics Engine',
          status: 'green',
          folderGroups: [
            { name: 'Data Pipeline', status: 'green', count: 11 },
            { name: 'ML Models', status: 'green', count: 7 },
            { name: 'Report Templates', status: 'green', count: 22 }
          ]
        }
      ]
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      status: 'red',
      services: [
        {
          id: 'service-7',
          name: 'Storage Service',
          status: 'red',
          folderGroups: [
            { name: 'Object Storage', status: 'red', count: 8 },
            { name: 'File System', status: 'amber', count: 12 },
            { name: 'Backup Vault', status: 'green', count: 6 }
          ]
        },
        {
          id: 'service-8',
          name: 'Monitoring Stack',
          status: 'amber',
          folderGroups: [
            { name: 'Metrics Collector', status: 'green', count: 4 },
            { name: 'Alert Rules', status: 'amber', count: 16 },
            { name: 'Dashboard Config', status: 'amber', count: 9 }
          ]
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'green': return '#4caf50';
      case 'amber': return '#ff9800';
      case 'red': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case 'green': return 100;
      case 'amber': return 60;
      case 'red': return 20;
      default: return 0;
    }
  };

  const calculateRegionHealth = (services) => {
    const statusCounts = { green: 0, amber: 0, red: 0 };
    services.forEach(service => {
      statusCounts[service.status]++;
    });
    const total = services.length;
    return {
      healthy: Math.round((statusCounts.green / total) * 100),
      warning: Math.round((statusCounts.amber / total) * 100),
      critical: Math.round((statusCounts.red / total) * 100)
    };
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setExpandedRows(new Set()); // Reset expanded rows when switching tabs
  };

  const toggleRowExpansion = (serviceId) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(serviceId)) {
      newExpandedRows.delete(serviceId);
    } else {
      newExpandedRows.add(serviceId);
    }
    setExpandedRows(newExpandedRows);
  };

  const currentRegion = regionsData[selectedTab];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Global Infrastructure Status
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time monitoring across all regions
        </Typography>
      </Box>

      {/* Region Selector */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Select Region</Typography>
        <ButtonGroup variant="outlined" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {regionsData.map((region, index) => (
            <Button
              key={region.id}
              variant={selectedTab === index ? 'contained' : 'outlined'}
              onClick={() => setSelectedTab(index)}
              startIcon={<LanguageIcon />}
              sx={{ 
                borderColor: getStatusColor(region.status),
                color: selectedTab === index ? 'white' : getStatusColor(region.status),
                backgroundColor: selectedTab === index ? getStatusColor(region.status) : 'transparent',
                '&:hover': {
                  backgroundColor: selectedTab === index ? getStatusColor(region.status) : `${getStatusColor(region.status)}20`
                }
              }}
            >
              {region.name}
            </Button>
          ))}
        </ButtonGroup>
      </Card>

      {/* Region Overview */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {currentRegion.name} Health Overview
            </Typography>
            {(() => {
              const health = calculateRegionHealth(currentRegion.services);
              return (
                <Box>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Healthy Services</Typography>
                      <Typography variant="body2" sx={{ color: '#4caf50' }}>{health.healthy}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={health.healthy} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { backgroundColor: '#4caf50' }
                      }} 
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Warning</Typography>
                      <Typography variant="body2" sx={{ color: '#ff9800' }}>{health.warning}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={health.warning} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { backgroundColor: '#ff9800' }
                      }} 
                    />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Critical</Typography>
                      <Typography variant="body2" sx={{ color: '#f44336' }}>{health.critical}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={health.critical} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': { backgroundColor: '#f44336' }
                      }} 
                    />
                  </Box>
                </Box>
              );
            })()}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Quick Stats</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Total Services</Typography>
                <Chip label={currentRegion.services.length} color="primary" size="small" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Total Folders</Typography>
                <Chip 
                  label={currentRegion.services.reduce((acc, service) => acc + service.folderGroups.length, 0)} 
                  color="default" 
                  size="small" 
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Region Status</Typography>
                <Chip 
                  label={currentRegion.status.toUpperCase()} 
                  sx={{ 
                    backgroundColor: getStatusColor(currentRegion.status),
                    color: 'white',
                    fontWeight: 600
                  }}
                  size="small" 
                />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Services */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Services & Folder Groups</Typography>
        <List>
          {currentRegion.services.map((service) => (
            <React.Fragment key={service.id}>
              <ListItem 
                button 
                onClick={() => toggleRowExpansion(service.id)}
                sx={{ 
                  backgroundColor: 'white',
                  mb: 1,
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                  '&:hover': { backgroundColor: '#f9f9f9' }
                }}
              >
                <ListItemIcon>
                  <DnsIcon sx={{ color: getStatusColor(service.status) }} />
                </ListItemIcon>
                <ListItemText 
                  primary={service.name}
                  secondary={`${service.folderGroups.length} folder groups`}
                />
                <Chip 
                  label={service.status.toUpperCase()} 
                  size="small"
                  sx={{ 
                    backgroundColor: getStatusColor(service.status),
                    color: 'white',
                    mr: 1
                  }}
                />
                {expandedRows.has(service.id) ? <ArrowDownIcon /> : <ArrowRightIcon />}
              </ListItem>
              
              {expandedRows.has(service.id) && (
                <Box sx={{ ml: 4, mb: 2 }}>
                  <Grid container spacing={2}>
                    {service.folderGroups.map((group, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper 
                          elevation={1}
                          sx={{ 
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            borderLeft: `4px solid ${getStatusColor(group.status)}`
                          }}
                        >
                          <FolderIcon sx={{ color: getStatusColor(group.status) }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {group.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {group.count} items
                            </Typography>
                          </Box>
                          <Box 
                            sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: '50%', 
                              backgroundColor: getStatusColor(group.status) 
                            }} 
                          />
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Box>
  );
};

export default RegionStatusPage;