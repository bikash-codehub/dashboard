import React, { useState } from 'react';
import { Typography, Chip } from '@mui/material';
import FilterableDataPanelGeneric from './FilterableDataPanelGeneric';
import Table from './Table';

const FilterableDataPanelDemo = () => {
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
    }
  ];

  // Filter configuration
  const filterConfig = [
    {
      name: 'pathSearch',
      type: 'text',
      label: 'Search Path',
      placeholder: 'Enter path to search...',
      searchIcon: true,
      dataKey: 'path'
    },
    {
      name: 'sourceIds',
      type: 'autocomplete',
      label: 'Source IDs',
      multiple: true,
      options: ['SRC-001', 'SRC-002', 'SRC-003', 'SRC-004', 'SRC-005'],
      dataKey: 'sourceId'
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      multiple: true,
      options: ['Active', 'Warning', 'Critical'],
      dataKey: 'status'
    },
    {
      name: 'department',
      type: 'select',
      label: 'Department',
      multiple: true,
      options: ['Engineering', 'Sales', 'Finance', 'Operations', 'Security'],
      dataKey: 'department'
    },
    {
      name: 'severity',
      type: 'select',
      label: 'Severity',
      multiple: true,
      options: ['Low', 'Medium', 'High', 'Critical'],
      dataKey: 'severity'
    },
    {
      name: 'dateRange',
      type: 'date',
      label: 'Last Updated After',
      dataKey: 'lastUpdated'
    }
  ];

  // Default filter values
  const defaultFilters = {
    pathSearch: '',
    sourceIds: [],
    status: [],
    department: [],
    severity: [],
    dateRange: ''
  };

  // Table columns configuration
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
      label: 'Auto Resolve Stats',
      minWidth: 150,
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
      label: 'Manual Resolve Stats',
      minWidth: 160,
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

  // Custom selected item renderer
  const selectedItemRenderer = (item) => (
    <Chip
      key={item.id}
      label={`${item.path} (${item.sourceId})`}
      onDelete={() => setSelectedItems(prev => prev.filter(i => i.id !== item.id))}
      color="primary"
      variant="outlined"
    />
  );

  return (
    <FilterableDataPanelGeneric
      data={sampleData}
      filterConfig={filterConfig}
      defaultFilters={defaultFilters}
      title="Reusable Filterable Data Panel"
      subtitle="This is a demo of the generic, reusable filterable data panel component"
      drawerTitle="Data Filters"
      selectedItems={selectedItems}
      onSelectedItemsChange={setSelectedItems}
      showSelectedItems={true}
      selectedItemsLabel="Selected API Paths"
      selectedItemRenderer={selectedItemRenderer}
      onFilterChange={(filters) => console.log('Filters changed:', filters)}
      onDataFiltered={(data) => console.log('Filtered data:', data)}
    >
      <Table
        columns={columns}
        // data prop will be injected by FilterableDataPanelGeneric with filtered data
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
    </FilterableDataPanelGeneric>
  );
};

export default FilterableDataPanelDemo;