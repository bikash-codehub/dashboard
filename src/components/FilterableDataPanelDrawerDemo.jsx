import React, { useState } from 'react';
import FilterableDataPanelDrawerGeneric from './FilterableDataPanelDrawerGeneric';
import Table from './Table';
import { Chip, Typography } from '@mui/material';

const FilterableDataPanelDrawerDemo = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample data
  const sampleData = [
    {
      id: 1,
      path: '/api/v1/users',
      sourceId: 'SRC-001',
      traceKeyValues: 'user_id=12345, session_id=abc123, method=GET',
      count: 1247,
      autoResolveStats: 85,
      manualResolveStats: 15,
      status: 'Active',
      department: 'Engineering',
      severity: 'Medium',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      path: '/api/v1/orders',
      sourceId: 'SRC-002',
      traceKeyValues: 'order_id=67890, customer_id=xyz789, status=pending',
      count: 892,
      autoResolveStats: 72,
      manualResolveStats: 28,
      status: 'Warning',
      department: 'Sales',
      severity: 'High',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      path: '/api/v1/payments',
      sourceId: 'SRC-003',
      traceKeyValues: 'payment_id=54321, merchant_id=def456, amount=99.99',
      count: 2341,
      autoResolveStats: 58,
      manualResolveStats: 42,
      status: 'Critical',
      department: 'Finance',
      severity: 'Critical',
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      path: '/api/v1/inventory',
      sourceId: 'SRC-004',
      traceKeyValues: 'product_id=98765, warehouse_id=ghi789, stock=250',
      count: 567,
      autoResolveStats: 90,
      manualResolveStats: 10,
      status: 'Active',
      department: 'Operations',
      severity: 'Low',
      lastUpdated: '2024-01-16'
    },
    {
      id: 5,
      path: '/api/v1/auth',
      sourceId: 'SRC-005',
      traceKeyValues: 'user_id=11111, ip_address=192.168.1.1, attempts=3',
      count: 3456,
      autoResolveStats: 95,
      manualResolveStats: 5,
      status: 'Active',
      department: 'Security',
      severity: 'Low',
      lastUpdated: '2024-01-17'
    },
    {
      id: 6,
      path: '/api/v1/notifications',
      sourceId: 'SRC-006',
      traceKeyValues: 'notification_id=22222, user_id=33333, type=push',
      count: 1789,
      autoResolveStats: 80,
      manualResolveStats: 20,
      status: 'Warning',
      department: 'Engineering',
      severity: 'Medium',
      lastUpdated: '2024-01-12'
    },
    {
      id: 7,
      path: '/api/v1/analytics',
      sourceId: 'SRC-007',
      traceKeyValues: 'batch_id=44444, timestamp=2024-01-15T10:30:00Z, size=1GB',
      count: 4321,
      autoResolveStats: 65,
      manualResolveStats: 35,
      status: 'Warning',
      department: 'Analytics',
      severity: 'High',
      lastUpdated: '2024-01-11'
    },
    {
      id: 8,
      path: '/api/v1/reports',
      sourceId: 'SRC-008',
      traceKeyValues: 'report_id=55555, user_id=66666, format=pdf',
      count: 876,
      autoResolveStats: 70,
      manualResolveStats: 30,
      status: 'Active',
      department: 'Finance',
      severity: 'Medium',
      lastUpdated: '2024-01-10'
    },
    {
      id: 9,
      path: '/api/v1/search',
      sourceId: 'SRC-009',
      traceKeyValues: 'query=electronics, user_id=77777, results=150',
      count: 2109,
      autoResolveStats: 88,
      manualResolveStats: 12,
      status: 'Active',
      department: 'Engineering',
      severity: 'Low',
      lastUpdated: '2024-01-18'
    },
    {
      id: 10,
      path: '/api/v1/files',
      sourceId: 'SRC-010',
      traceKeyValues: 'file_id=88888, user_id=99999, size=2.5MB',
      count: 1543,
      autoResolveStats: 45,
      manualResolveStats: 55,
      status: 'Critical',
      department: 'Operations',
      severity: 'Critical',
      lastUpdated: '2024-01-09'
    }
  ];

  // Filter configuration
  const filterConfig = [
    {
      name: 'pathSearch',
      type: 'text',
      label: 'Search Path',
      dataKey: 'path',
      placeholder: 'Search by API path...',
      showSearchIcon: true
    },
    {
      name: 'sourceIds',
      type: 'autocomplete',
      label: 'Source IDs',
      dataKey: 'sourceId',
      options: ['SRC-001', 'SRC-002', 'SRC-003', 'SRC-004', 'SRC-005', 'SRC-006', 'SRC-007', 'SRC-008', 'SRC-009', 'SRC-010'],
      multiple: true
    },
    {
      name: 'countRange',
      type: 'range',
      label: 'Call Count Range',
      dataKey: 'count',
      min: 0,
      max: 5000,
      step: 100,
      formatValue: (value) => value.toLocaleString()
    },
    {
      name: 'autoResolveRange',
      type: 'range',
      label: 'Auto Resolve % Range',
      dataKey: 'autoResolveStats',
      min: 0,
      max: 100,
      step: 5,
      formatValue: (value) => `${value}%`
    },
    {
      name: 'manualResolveRange',
      type: 'range',
      label: 'Manual Resolve % Range',
      dataKey: 'manualResolveStats',
      min: 0,
      max: 100,
      step: 5,
      formatValue: (value) => `${value}%`
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      dataKey: 'status',
      options: ['Active', 'Warning', 'Critical'],
      multiple: true
    },
    {
      name: 'department',
      type: 'select',
      label: 'Department',
      dataKey: 'department',
      options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Sales', value: 'Sales' },
        { label: 'Finance', value: 'Finance' },
        { label: 'Operations', value: 'Operations' },
        { label: 'Security', value: 'Security' },
        { label: 'Analytics', value: 'Analytics' }
      ],
      multiple: true
    },
    {
      name: 'severity',
      type: 'autocomplete',
      label: 'Severity',
      dataKey: 'severity',
      options: ['Low', 'Medium', 'High', 'Critical'],
      multiple: true
    },
    {
      name: 'dateRange',
      type: 'date',
      label: 'Last Updated After',
      dataKey: 'lastUpdated'
    },
    {
      name: 'customFilter',
      type: 'custom',
      label: 'High Performance APIs',
      render: (field, control) => (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input 
            type="checkbox" 
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
          />
          <Typography variant="body2">
            Show only high-performance APIs (Auto resolve ≥ 85%)
          </Typography>
        </label>
      ),
      filterFunction: (item, isEnabled) => {
        return !isEnabled || item.autoResolveStats >= 85;
      }
    }
  ];

  // Table columns
  const columns = [
    {
      id: 'path',
      label: 'Path',
      minWidth: 180,
      render: (value) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 500 }}>
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
        <Chip label={value} size="small" variant="outlined" color="primary" />
      ),
    },
    {
      id: 'traceKeyValues',
      label: 'Tracekey / Values',
      minWidth: 300,
      render: (value) => (
        <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
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
      id: 'autoResolveStats',
      label: 'Auto Resolve',
      minWidth: 130,
      align: 'center',
      render: (value) => (
        <Chip
          label={`${value}%`}
          size="small"
          color={value >= 85 ? 'success' : value >= 70 ? 'warning' : 'error'}
          variant="filled"
        />
      ),
    },
    {
      id: 'manualResolveStats',
      label: 'Manual Resolve',
      minWidth: 140,
      align: 'center',
      render: (value) => (
        <Chip
          label={`${value}%`}
          size="small"
          color={value <= 15 ? 'success' : value <= 30 ? 'warning' : 'error'}
          variant="outlined"
        />
      ),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value === 'Active' ? 'success' : value === 'Warning' ? 'warning' : 'error'}
        />
      ),
    },
    {
      id: 'department',
      label: 'Department',
      minWidth: 120,
      align: 'center',
    },
    {
      id: 'severity',
      label: 'Severity',
      minWidth: 100,
      align: 'center',
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value === 'Low' ? 'success' : value === 'Medium' ? 'info' : value === 'High' ? 'warning' : 'error'}
          variant="outlined"
        />
      ),
    },
  ];

  const handleRowClick = (row) => {
    setSelectedItems(prev => {
      const exists = prev.find(item => item.id === row.id);
      if (exists) {
        return prev.filter(item => item.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  };

  const handleFilteredDataChange = (filteredData) => {
    console.log('Filtered data changed:', filteredData.length, 'items');
  };

  const renderSelectedItem = (item) => (
    `${item.path} (${item.sourceId})`
  );

  return (
    <FilterableDataPanelDrawerGeneric
      data={sampleData}
      filters={filterConfig}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      onFilteredDataChange={handleFilteredDataChange}
      renderSelectedItem={renderSelectedItem}
      title="Reusable Drawer Filter Panel Demo"
      subtitle="This demonstrates the FilterableDataPanelDrawerGeneric component with real-time filtering."
      drawerTitle="API Filters"
      applyMode={false} // Set to true for apply-based filtering
      drawerWidth={450}
      defaultFilterValues={{
        countRange: [500, 3000], // Custom default range
        severity: ['Medium', 'High'] // Pre-select some severities
      }}
    >
      <Table
        columns={columns}
        onRowClick={handleRowClick}
        stickyHeader={true}
        pagination={true}
        defaultRowsPerPage={10}
        rowsPerPageOptions={[5, 10, 25]}
        sortable={true}
        maxHeight={500}
        sx={{
          '& .MuiTableBody-root .MuiTableRow-root': {
            cursor: 'pointer',
            '&:nth-of-type(even)': {
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            },
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04) !important',
            },
          },
        }}
      />
    </FilterableDataPanelDrawerGeneric>
  );
};

export default FilterableDataPanelDrawerDemo;