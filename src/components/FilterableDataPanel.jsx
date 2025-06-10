import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Slider,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Divider,
  Card,
  CardContent,
  Badge,
  IconButton,
  Collapse
} from '@mui/material';
import {
  FilterList,
  Clear,
  ExpandMore,
  ExpandLess,
  Search
} from '@mui/icons-material';
import Table from './Table';

const FilterableDataPanel = () => {
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const [filters, setFilters] = useState({
    pathSearch: '',
    sourceIds: [],
    countRange: [0, 10000],
    autoResolveRange: [0, 100],
    manualResolveRange: [0, 100],
    status: [],
    dateRange: '',
    department: [],
    severity: []
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Sample data
  const allData = [
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

  // Filter options
  const sourceIdOptions = ['SRC-001', 'SRC-002', 'SRC-003', 'SRC-004', 'SRC-005', 'SRC-006', 'SRC-007', 'SRC-008', 'SRC-009', 'SRC-010'];
  const statusOptions = ['Active', 'Warning', 'Critical'];
  const departmentOptions = ['Engineering', 'Sales', 'Finance', 'Operations', 'Security', 'Analytics'];
  const severityOptions = ['Low', 'Medium', 'High', 'Critical'];

  // Apply filters
  useEffect(() => {
    let filtered = allData.filter(item => {
      // Path search
      if (filters.pathSearch && !item.path.toLowerCase().includes(filters.pathSearch.toLowerCase())) {
        return false;
      }

      // Source IDs
      if (filters.sourceIds.length > 0 && !filters.sourceIds.includes(item.sourceId)) {
        return false;
      }

      // Count range
      if (item.count < filters.countRange[0] || item.count > filters.countRange[1]) {
        return false;
      }

      // Auto resolve range
      if (item.autoResolveStats < filters.autoResolveRange[0] || item.autoResolveStats > filters.autoResolveRange[1]) {
        return false;
      }

      // Manual resolve range
      if (item.manualResolveStats < filters.manualResolveRange[0] || item.manualResolveStats > filters.manualResolveRange[1]) {
        return false;
      }

      // Status
      if (filters.status.length > 0 && !filters.status.includes(item.status)) {
        return false;
      }

      // Department
      if (filters.department.length > 0 && !filters.department.includes(item.department)) {
        return false;
      }

      // Severity
      if (filters.severity.length > 0 && !filters.severity.includes(item.severity)) {
        return false;
      }

      return true;
    });

    setFilteredData(filtered);
  }, [filters]);

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      pathSearch: '',
      sourceIds: [],
      countRange: [0, 10000],
      autoResolveRange: [0, 100],
      manualResolveRange: [0, 100],
      status: [],
      dateRange: '',
      department: [],
      severity: []
    });
    setSelectedItems([]);
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.pathSearch) count++;
    if (filters.sourceIds.length > 0) count++;
    if (filters.countRange[0] > 0 || filters.countRange[1] < 10000) count++;
    if (filters.autoResolveRange[0] > 0 || filters.autoResolveRange[1] < 100) count++;
    if (filters.manualResolveRange[0] > 0 || filters.manualResolveRange[1] < 100) count++;
    if (filters.status.length > 0) count++;
    if (filters.department.length > 0) count++;
    if (filters.severity.length > 0) count++;
    return count;
  };

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
      label: 'Trace Key / Values',
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Advanced Filter Panel
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Use the comprehensive filter panel below to narrow down data and select specific items.
        </Typography>
      </Box>

      {/* Filter Panel */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'grey.50', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Badge badgeContent={getActiveFilterCount()} color="primary">
              <FilterList />
            </Badge>
            <Typography variant="h6">Filters</Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} of {allData.length} items
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button startIcon={<Clear />} onClick={clearAllFilters} size="small">
              Clear All
            </Button>
            <IconButton onClick={() => setFiltersExpanded(!filtersExpanded)}>
              {filtersExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={filtersExpanded}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Path Search */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Search Path"
                  value={filters.pathSearch}
                  onChange={(e) => setFilters(prev => ({ ...prev, pathSearch: e.target.value }))}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              {/* Source IDs */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  options={sourceIdOptions}
                  value={filters.sourceIds}
                  onChange={(e, newValue) => setFilters(prev => ({ ...prev, sourceIds: newValue }))}
                  renderInput={(params) => <TextField {...params} label="Source IDs" />}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip key={option} label={option} size="small" {...getTagProps({ index })} />
                    ))
                  }
                />
              </Grid>

              {/* Count Range */}
              <Grid item xs={12} md={4}>
                <Typography gutterBottom>Count Range</Typography>
                <Slider
                  value={filters.countRange}
                  onChange={(e, newValue) => setFilters(prev => ({ ...prev, countRange: newValue }))}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000}
                  step={100}
                />
                <Typography variant="caption" color="text.secondary">
                  {filters.countRange[0]} - {filters.countRange[1]}
                </Typography>
              </Grid>

              {/* Auto Resolve Range */}
              <Grid item xs={12} md={4}>
                <Typography gutterBottom>Auto Resolve % Range</Typography>
                <Slider
                  value={filters.autoResolveRange}
                  onChange={(e, newValue) => setFilters(prev => ({ ...prev, autoResolveRange: newValue }))}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Typography variant="caption" color="text.secondary">
                  {filters.autoResolveRange[0]}% - {filters.autoResolveRange[1]}%
                </Typography>
              </Grid>

              {/* Manual Resolve Range */}
              <Grid item xs={12} md={4}>
                <Typography gutterBottom>Manual Resolve % Range</Typography>
                <Slider
                  value={filters.manualResolveRange}
                  onChange={(e, newValue) => setFilters(prev => ({ ...prev, manualResolveRange: newValue }))}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Typography variant="caption" color="text.secondary">
                  {filters.manualResolveRange[0]}% - {filters.manualResolveRange[1]}%
                </Typography>
              </Grid>

              {/* Status */}
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    multiple
                    value={filters.status}
                    label="Status"
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Department */}
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    multiple
                    value={filters.department}
                    label="Department"
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {departmentOptions.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Severity */}
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Severity</InputLabel>
                  <Select
                    multiple
                    value={filters.severity}
                    label="Severity"
                    onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {severityOptions.map((severity) => (
                      <MenuItem key={severity} value={severity}>
                        {severity}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Date Range */}
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  label="Last Updated After"
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Paper>

      {/* Selected Items Display */}
      {selectedItems.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Selected Items ({selectedItems.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedItems.map((item) => (
                <Chip
                  key={item.id}
                  label={`${item.path} (${item.sourceId})`}
                  onDelete={() => setSelectedItems(prev => prev.filter(i => i.id !== item.id))}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Filtered Results Table */}
      <Paper>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">
            Filtered Results ({filteredData.length} items)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click rows to select/deselect items
          </Typography>
        </Box>
        <Table
          columns={columns}
          data={filteredData}
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
      </Paper>
    </Container>
  );
};

export default FilterableDataPanel;