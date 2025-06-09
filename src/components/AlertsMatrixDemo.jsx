import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import DualTableComponent from './DualTableComponent';

const AlertsMatrixDemo = () => {
  const matrixData = [
    {
      id: 1,
      matrixPath: '/api/v1/users',
      count: 1247,
      topTriggeredAlert: 'High Response Time',
      traceKeyValues: 'user_id=12345, session_id=abc123',
      alertCount: 89
    },
    {
      id: 2,
      matrixPath: '/api/v1/orders',
      count: 892,
      topTriggeredAlert: 'Database Connection Timeout',
      traceKeyValues: 'order_id=67890, customer_id=xyz789',
      alertCount: 156
    },
    {
      id: 3,
      matrixPath: '/api/v1/payments',
      count: 2341,
      topTriggeredAlert: 'Payment Gateway Error',
      traceKeyValues: 'payment_id=54321, merchant_id=def456',
      alertCount: 203
    },
    {
      id: 4,
      matrixPath: '/api/v1/inventory',
      count: 567,
      topTriggeredAlert: 'Stock Level Critical',
      traceKeyValues: 'product_id=98765, warehouse_id=ghi789',
      alertCount: 78
    },
    {
      id: 5,
      matrixPath: '/api/v1/auth',
      count: 3456,
      topTriggeredAlert: 'Authentication Failure',
      traceKeyValues: 'user_id=11111, ip_address=192.168.1.1',
      alertCount: 267
    },
    {
      id: 6,
      matrixPath: '/api/v1/notifications',
      count: 1789,
      topTriggeredAlert: 'Message Queue Full',
      traceKeyValues: 'notification_id=22222, user_id=33333',
      alertCount: 134
    },
    {
      id: 7,
      matrixPath: '/api/v1/analytics',
      count: 4321,
      topTriggeredAlert: 'Data Processing Delay',
      traceKeyValues: 'batch_id=44444, timestamp=2024-01-15T10:30:00Z',
      alertCount: 98
    },
    {
      id: 8,
      matrixPath: '/api/v1/reports',
      count: 876,
      topTriggeredAlert: 'Report Generation Timeout',
      traceKeyValues: 'report_id=55555, user_id=66666',
      alertCount: 187
    },
    {
      id: 9,
      matrixPath: '/api/v1/search',
      count: 2109,
      topTriggeredAlert: 'Search Index Unavailable',
      traceKeyValues: 'query=electronics, user_id=77777',
      alertCount: 145
    },
    {
      id: 10,
      matrixPath: '/api/v1/files',
      count: 1543,
      topTriggeredAlert: 'File Upload Failed',
      traceKeyValues: 'file_id=88888, user_id=99999',
      alertCount: 112
    },
    {
      id: 11,
      matrixPath: '/api/v1/cache',
      count: 987,
      topTriggeredAlert: 'Cache Miss Rate High',
      traceKeyValues: 'cache_key=product_123, region=us-east-1',
      alertCount: 67
    },
    {
      id: 12,
      matrixPath: '/api/v1/config',
      count: 234,
      topTriggeredAlert: 'Configuration Sync Error',
      traceKeyValues: 'config_id=config_456, service=payment',
      alertCount: 45
    }
  ];

  const alertDetailsData = {
    1: [
      {
        id: 1,
        mostTriggeredAlerts: 'Response Time > 5s',
        traceKeyValues: 'endpoint=/api/v1/users, method=GET',
        count: 45,
        autoResolvedStats: '78%',
        manualResolvedStats: '22%'
      },
      {
        id: 2,
        mostTriggeredAlerts: 'Memory Usage > 90%',
        traceKeyValues: 'service=user-service, pod=user-pod-123',
        count: 32,
        autoResolvedStats: '85%',
        manualResolvedStats: '15%'
      },
      {
        id: 3,
        mostTriggeredAlerts: 'Request Rate Spike',
        traceKeyValues: 'endpoint=/api/v1/users, rate=1000/min',
        count: 12,
        autoResolvedStats: '92%',
        manualResolvedStats: '8%'
      }
    ],
    2: [
      {
        id: 4,
        mostTriggeredAlerts: 'Database Connection Pool Exhausted',
        traceKeyValues: 'database=orders_db, pool_size=50',
        count: 89,
        autoResolvedStats: '65%',
        manualResolvedStats: '35%'
      },
      {
        id: 5,
        mostTriggeredAlerts: 'Query Timeout',
        traceKeyValues: 'query=SELECT * FROM orders, timeout=30s',
        count: 67,
        autoResolvedStats: '72%',
        manualResolvedStats: '28%'
      }
    ],
    3: [
      {
        id: 6,
        mostTriggeredAlerts: 'Payment Gateway Timeout',
        traceKeyValues: 'gateway=stripe, timeout=15s',
        count: 123,
        autoResolvedStats: '58%',
        manualResolvedStats: '42%'
      },
      {
        id: 7,
        mostTriggeredAlerts: 'Invalid Payment Method',
        traceKeyValues: 'method=credit_card, error=invalid_cvv',
        count: 80,
        autoResolvedStats: '45%',
        manualResolvedStats: '55%'
      }
    ],
    4: [
      {
        id: 8,
        mostTriggeredAlerts: 'Stock Level Below Threshold',
        traceKeyValues: 'product=electronics, threshold=10',
        count: 45,
        autoResolvedStats: '90%',
        manualResolvedStats: '10%'
      },
      {
        id: 9,
        mostTriggeredAlerts: 'Inventory Sync Failed',
        traceKeyValues: 'warehouse=main, sync_time=2024-01-15T10:00:00Z',
        count: 33,
        autoResolvedStats: '75%',
        manualResolvedStats: '25%'
      }
    ],
    5: [
      {
        id: 10,
        mostTriggeredAlerts: 'Failed Login Attempts',
        traceKeyValues: 'attempts=5, lockout_time=15min',
        count: 156,
        autoResolvedStats: '95%',
        manualResolvedStats: '5%'
      },
      {
        id: 11,
        mostTriggeredAlerts: 'JWT Token Expired',
        traceKeyValues: 'token_age=24h, refresh_required=true',
        count: 111,
        autoResolvedStats: '98%',
        manualResolvedStats: '2%'
      }
    ],
    6: [
      {
        id: 12,
        mostTriggeredAlerts: 'Message Queue Capacity',
        traceKeyValues: 'queue=notifications, capacity=90%',
        count: 78,
        autoResolvedStats: '80%',
        manualResolvedStats: '20%'
      },
      {
        id: 13,
        mostTriggeredAlerts: 'Push Notification Failed',
        traceKeyValues: 'service=fcm, error=invalid_token',
        count: 56,
        autoResolvedStats: '70%',
        manualResolvedStats: '30%'
      }
    ],
    7: [
      {
        id: 14,
        mostTriggeredAlerts: 'ETL Job Failure',
        traceKeyValues: 'job=daily_analytics, stage=transform',
        count: 65,
        autoResolvedStats: '60%',
        manualResolvedStats: '40%'
      },
      {
        id: 15,
        mostTriggeredAlerts: 'Data Pipeline Lag',
        traceKeyValues: 'pipeline=events, lag=10min',
        count: 33,
        autoResolvedStats: '85%',
        manualResolvedStats: '15%'
      }
    ],
    8: [
      {
        id: 16,
        mostTriggeredAlerts: 'Report Generation Memory Spike',
        traceKeyValues: 'report_type=financial, memory=8GB',
        count: 98,
        autoResolvedStats: '70%',
        manualResolvedStats: '30%'
      },
      {
        id: 17,
        mostTriggeredAlerts: 'Large Dataset Processing',
        traceKeyValues: 'dataset_size=100GB, processing_time=2h',
        count: 89,
        autoResolvedStats: '55%',
        manualResolvedStats: '45%'
      }
    ],
    9: [
      {
        id: 18,
        mostTriggeredAlerts: 'Elasticsearch Cluster Down',
        traceKeyValues: 'cluster=search_cluster, nodes=3',
        count: 87,
        autoResolvedStats: '40%',
        manualResolvedStats: '60%'
      },
      {
        id: 19,
        mostTriggeredAlerts: 'Search Query Timeout',
        traceKeyValues: 'query_time=30s, index=products',
        count: 58,
        autoResolvedStats: '75%',
        manualResolvedStats: '25%'
      }
    ],
    10: [
      {
        id: 20,
        mostTriggeredAlerts: 'File Storage Quota Exceeded',
        traceKeyValues: 'storage=s3, quota=1TB',
        count: 67,
        autoResolvedStats: '20%',
        manualResolvedStats: '80%'
      },
      {
        id: 21,
        mostTriggeredAlerts: 'File Corruption Detected',
        traceKeyValues: 'file_type=image, checksum_failed=true',
        count: 45,
        autoResolvedStats: '30%',
        manualResolvedStats: '70%'
      }
    ],
    11: [
      {
        id: 22,
        mostTriggeredAlerts: 'Redis Cache Eviction',
        traceKeyValues: 'cache_type=redis, eviction_policy=lru',
        count: 43,
        autoResolvedStats: '90%',
        manualResolvedStats: '10%'
      },
      {
        id: 23,
        mostTriggeredAlerts: 'Cache Warming Failed',
        traceKeyValues: 'cache_key=popular_products, warm_time=5min',
        count: 24,
        autoResolvedStats: '85%',
        manualResolvedStats: '15%'
      }
    ],
    12: [
      {
        id: 24,
        mostTriggeredAlerts: 'Config Drift Detected',
        traceKeyValues: 'service=api_gateway, drift_percentage=15%',
        count: 28,
        autoResolvedStats: '50%',
        manualResolvedStats: '50%'
      },
      {
        id: 25,
        mostTriggeredAlerts: 'Environment Mismatch',
        traceKeyValues: 'expected=prod, actual=staging',
        count: 17,
        autoResolvedStats: '25%',
        manualResolvedStats: '75%'
      }
    ]
  };

  const leftTableColumns = [
    {
      id: 'matrixPath',
      label: 'Matrix Path',
      minWidth: 180,
      render: (value) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
          {value}
        </Typography>
      ),
    },
    {
      id: 'count',
      label: 'Count',
      minWidth: 100,
      align: 'center',
      render: (value) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {value.toLocaleString()}
        </Typography>
      ),
    },
    {
      id: 'topTriggeredAlert',
      label: 'Top Triggered Alert',
      minWidth: 200,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color="warning"
          variant="outlined"
          sx={{ maxWidth: '100%' }}
        />
      ),
    },
    {
      id: 'traceKeyValues',
      label: 'Trace Key / Values',
      minWidth: 250,
      render: (value) => (
        <Typography 
          variant="caption" 
          sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.75rem',
            color: 'text.secondary',
            wordBreak: 'break-all'
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      id: 'alertCount',
      label: 'Alert Count',
      minWidth: 120,
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value > 150 ? 'error' : value > 100 ? 'warning' : 'success'}
          variant="filled"
        />
      ),
    },
  ];

  const rightTableColumns = [
    {
      id: 'mostTriggeredAlerts',
      label: 'Most Triggered Alerts',
      minWidth: 220,
      render: (value) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      ),
    },
    {
      id: 'traceKeyValues',
      label: 'Trace Key Values',
      minWidth: 250,
      render: (value) => (
        <Typography 
          variant="caption" 
          sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.75rem',
            color: 'text.secondary',
            wordBreak: 'break-all'
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      id: 'count',
      label: 'Count',
      minWidth: 100,
      align: 'center',
      render: (value) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      ),
    },
    {
      id: 'autoResolvedStats',
      label: 'Auto Resolved Stats',
      minWidth: 150,
      align: 'center',
      render: (value) => {
        const percentage = parseInt(value);
        return (
          <Chip
            label={value}
            size="small"
            color={percentage > 80 ? 'success' : percentage > 60 ? 'warning' : 'error'}
            variant="filled"
          />
        );
      },
    },
    {
      id: 'manualResolvedStats',
      label: 'Manual Resolved Stats',
      minWidth: 160,
      align: 'center',
      render: (value) => {
        const percentage = parseInt(value);
        return (
          <Chip
            label={value}
            size="small"
            color={percentage < 20 ? 'success' : percentage < 40 ? 'warning' : 'error'}
            variant="outlined"
          />
        );
      },
    },
  ];

  const getDetailData = (selectedMatrix) => {
    return alertDetailsData[selectedMatrix.id] || [];
  };

  const handleRowSelect = (matrix, rowIndex) => {
    console.log('Selected matrix path:', matrix.matrixPath, 'at index:', rowIndex);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Alerts Matrix Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Monitor API endpoints and their alert patterns. Click any matrix path in the left table
          to view detailed alert information including resolution statistics.
        </Typography>
      </Box>

      <Box sx={{ height: 700 }}>
        <DualTableComponent
          leftTableTitle="Matrix Paths & Alert Overview"
          rightTableTitle="Detailed Alert Analysis"
          leftTableData={matrixData}
          leftTableColumns={leftTableColumns}
          rightTableColumns={rightTableColumns}
          getDetailData={getDetailData}
          onLeftRowSelect={handleRowSelect}
          maxHeight={700}
        />
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Dashboard Features:
        </Typography>
        <Typography variant="body2" component="div">
          • <strong>Matrix Path Monitoring:</strong> Track API endpoints and their performance metrics
          <br />
          • <strong>Alert Correlation:</strong> View top triggered alerts for each endpoint
          <br />
          • <strong>Trace Analysis:</strong> Examine key-value pairs for debugging and monitoring
          <br />
          • <strong>Resolution Statistics:</strong> Monitor auto vs manual alert resolution rates
          <br />
          • <strong>Real-time Updates:</strong> Click any matrix path to drill down into specific alerts
          <br />
          • <strong>Color-coded Severity:</strong> Visual indicators for alert counts and resolution rates
        </Typography>
      </Box>
    </Container>
  );
};

export default AlertsMatrixDemo;