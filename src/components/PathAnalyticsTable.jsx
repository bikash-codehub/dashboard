import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import Table from './Table';

const PathAnalyticsTable = () => {
  const pathData = [
    {
      id: 1,
      path: '/api/v1/users',
      sourceId: 'SRC-001',
      traceKeyValues: 'user_id=12345, session_id=abc123, method=GET',
      count: 1247,
      autoResolveStats: 85,
      manualResolveStats: 15
    },
    {
      id: 2,
      path: '/api/v1/orders',
      sourceId: 'SRC-002',
      traceKeyValues: 'order_id=67890, customer_id=xyz789, status=pending',
      count: 892,
      autoResolveStats: 72,
      manualResolveStats: 28
    },
    {
      id: 3,
      path: '/api/v1/payments',
      sourceId: 'SRC-003',
      traceKeyValues: 'payment_id=54321, merchant_id=def456, amount=99.99',
      count: 2341,
      autoResolveStats: 58,
      manualResolveStats: 42
    },
    {
      id: 4,
      path: '/api/v1/inventory',
      sourceId: 'SRC-004',
      traceKeyValues: 'product_id=98765, warehouse_id=ghi789, stock=250',
      count: 567,
      autoResolveStats: 90,
      manualResolveStats: 10
    },
    {
      id: 5,
      path: '/api/v1/auth',
      sourceId: 'SRC-005',
      traceKeyValues: 'user_id=11111, ip_address=192.168.1.1, attempts=3',
      count: 3456,
      autoResolveStats: 95,
      manualResolveStats: 5
    },
    {
      id: 6,
      path: '/api/v1/notifications',
      sourceId: 'SRC-006',
      traceKeyValues: 'notification_id=22222, user_id=33333, type=push',
      count: 1789,
      autoResolveStats: 80,
      manualResolveStats: 20
    },
    {
      id: 7,
      path: '/api/v1/analytics',
      sourceId: 'SRC-007',
      traceKeyValues: 'batch_id=44444, timestamp=2024-01-15T10:30:00Z, size=1GB',
      count: 4321,
      autoResolveStats: 65,
      manualResolveStats: 35
    },
    {
      id: 8,
      path: '/api/v1/reports',
      sourceId: 'SRC-008',
      traceKeyValues: 'report_id=55555, user_id=66666, format=pdf',
      count: 876,
      autoResolveStats: 70,
      manualResolveStats: 30
    },
    {
      id: 9,
      path: '/api/v1/search',
      sourceId: 'SRC-009',
      traceKeyValues: 'query=electronics, user_id=77777, results=150',
      count: 2109,
      autoResolveStats: 88,
      manualResolveStats: 12
    },
    {
      id: 10,
      path: '/api/v1/files',
      sourceId: 'SRC-010',
      traceKeyValues: 'file_id=88888, user_id=99999, size=2.5MB',
      count: 1543,
      autoResolveStats: 45,
      manualResolveStats: 55
    },
    {
      id: 11,
      path: '/api/v1/cache',
      sourceId: 'SRC-011',
      traceKeyValues: 'cache_key=product_123, region=us-east-1, ttl=3600',
      count: 987,
      autoResolveStats: 92,
      manualResolveStats: 8
    },
    {
      id: 12,
      path: '/api/v1/config',
      sourceId: 'SRC-012',
      traceKeyValues: 'config_id=config_456, service=payment, version=1.2.3',
      count: 234,
      autoResolveStats: 75,
      manualResolveStats: 25
    },
    {
      id: 13,
      path: '/api/v1/webhooks',
      sourceId: 'SRC-013',
      traceKeyValues: 'webhook_id=webhook_789, url=https://api.example.com, event=payment',
      count: 1876,
      autoResolveStats: 83,
      manualResolveStats: 17
    },
    {
      id: 14,
      path: '/api/v1/logs',
      sourceId: 'SRC-014',
      traceKeyValues: 'log_level=error, service=auth, timestamp=2024-01-15T11:00:00Z',
      count: 3245,
      autoResolveStats: 78,
      manualResolveStats: 22
    },
    {
      id: 15,
      path: '/api/v1/metrics',
      sourceId: 'SRC-015',
      traceKeyValues: 'metric_name=response_time, value=250ms, endpoint=/users',
      count: 5432,
      autoResolveStats: 89,
      manualResolveStats: 11
    },
    {
      id: 16,
      path: '/api/v1/health',
      sourceId: 'SRC-016',
      traceKeyValues: 'status=healthy, service=api-gateway, uptime=99.9%',
      count: 1098,
      autoResolveStats: 98,
      manualResolveStats: 2
    },
    {
      id: 17,
      path: '/api/v1/backup',
      sourceId: 'SRC-017',
      traceKeyValues: 'backup_id=backup_321, size=10GB, status=completed',
      count: 156,
      autoResolveStats: 55,
      manualResolveStats: 45
    },
    {
      id: 18,
      path: '/api/v1/sync',
      sourceId: 'SRC-018',
      traceKeyValues: 'sync_id=sync_654, source=database, target=warehouse',
      count: 789,
      autoResolveStats: 67,
      manualResolveStats: 33
    }
  ];

  const columns = [
    {
      id: 'path',
      label: 'Path',
      minWidth: 180,
      render: (value) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'primary.main'
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      id: 'sourceId',
      label: 'Source ID',
      minWidth: 120,
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          variant="outlined"
          color="primary"
          sx={{ 
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        />
      ),
    },
    {
      id: 'traceKeyValues',
      label: 'Trace Key / Values',
      minWidth: 300,
      render: (value) => (
        <Typography 
          variant="caption" 
          sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.75rem',
            color: 'text.secondary',
            wordBreak: 'break-all',
            lineHeight: 1.4
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
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600,
            color: value > 3000 ? 'error.main' : value > 1500 ? 'warning.main' : 'success.main'
          }}
        >
          {value.toLocaleString()}
        </Typography>
      ),
    },
    {
      id: 'autoResolveStats',
      label: 'Auto Resolve Stats',
      minWidth: 150,
      align: 'center',
      render: (value) => (
        <Chip
          label={`${value}%`}
          size="small"
          color={value >= 85 ? 'success' : value >= 70 ? 'warning' : 'error'}
          variant="filled"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      id: 'manualResolveStats',
      label: 'Manual Resolve Stats',
      minWidth: 160,
      align: 'center',
      render: (value) => (
        <Chip
          label={`${value}%`}
          size="small"
          color={value <= 15 ? 'success' : value <= 30 ? 'warning' : 'error'}
          variant="outlined"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
  ];

  const handleRowClick = (row, rowIndex) => {
    console.log('Clicked path:', row.path, 'at index:', rowIndex);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Path Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Monitor API endpoints with detailed trace information and resolution statistics.
          Click any row to view more details.
        </Typography>
      </Box>

      <Table
        columns={columns}
        data={pathData}
        onRowClick={handleRowClick}
        stickyHeader={true}
        pagination={true}
        defaultRowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sortable={true}
        maxHeight={600}
        sx={{
          '& .MuiTableBody-root .MuiTableRow-root': {
            '&:nth-of-type(even)': {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            },
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04) !important',
              cursor: 'pointer',
            },
          },
        }}
      />

      <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Table Features:
        </Typography>
        <Typography variant="body2" component="div">
          • <strong>Sticky Headers:</strong> Headers remain visible when scrolling
          <br />
          • <strong>Pagination:</strong> Navigate through large datasets efficiently
          <br />
          • <strong>Sorting:</strong> Click column headers to sort data
          <br />
          • <strong>Color-coded Stats:</strong> Visual indicators for resolution rates and counts
          <br />
          • <strong>Monospace Formatting:</strong> Technical data displayed in monospace font
          <br />
          • <strong>Interactive Rows:</strong> Click any row for detailed information
          <br />
          • <strong>Alternating Row Colors:</strong> Improved readability with zebra striping
        </Typography>
      </Box>
    </Container>
  );
};

export default PathAnalyticsTable;