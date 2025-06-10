import React, { useState, useMemo } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
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
  Autocomplete,
  Card,
  CardContent,
  Badge,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  useTheme
} from '@mui/material';
import {
  FilterList,
  Clear,
  Search,
  Close,
  Tune
} from '@mui/icons-material';
import Table from './Table';

// Separate component for FilterDrawerContent to prevent re-renders
const FilterDrawerContent = React.memo(({ control, clearAllFilters, onClose, sourceIdOptions, statusOptions, departmentOptions, severityOptions }) => (
  <Box sx={{ width: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Tune sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Filters
        </Typography>
        <IconButton color="inherit" onClick={onClose}>
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>

    <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
      <Grid container spacing={3}>
        {/* Path Search */}
        <Grid item xs={12}>
          <Controller
            name="pathSearch"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Search Path"
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            )}
          />
        </Grid>

        {/* Source IDs */}
        <Grid item xs={12}>
          <Controller
            name="sourceIds"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={sourceIdOptions}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => <TextField {...params} label="Source IDs" />}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={option} label={option} size="small" {...getTagProps({ index })} />
                  ))
                }
              />
            )}
          />
        </Grid>

        {/* Count Range */}
        <Grid item xs={12}>
          <Controller
            name="countRange"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography gutterBottom>Count Range</Typography>
                <Slider
                  {...field}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000}
                  step={100}
                />
                <Typography variant="caption" color="text.secondary">
                  {field.value[0]} - {field.value[1]}
                </Typography>
              </Box>
            )}
          />
        </Grid>

        {/* Auto Resolve Range */}
        <Grid item xs={12}>
          <Controller
            name="autoResolveRange"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography gutterBottom>Auto Resolve % Range</Typography>
                <Slider
                  {...field}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Typography variant="caption" color="text.secondary">
                  {field.value[0]}% - {field.value[1]}%
                </Typography>
              </Box>
            )}
          />
        </Grid>

        {/* Manual Resolve Range */}
        <Grid item xs={12}>
          <Controller
            name="manualResolveRange"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography gutterBottom>Manual Resolve % Range</Typography>
                <Slider
                  {...field}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Typography variant="caption" color="text.secondary">
                  {field.value[0]}% - {field.value[1]}%
                </Typography>
              </Box>
            )}
          />
        </Grid>

        {/* Status */}
        <Grid item xs={12}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  {...field}
                  multiple
                  label="Status"
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
            )}
          />
        </Grid>

        {/* Department */}
        <Grid item xs={12}>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  {...field}
                  multiple
                  label="Department"
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
            )}
          />
        </Grid>

        {/* Severity */}
        <Grid item xs={12}>
          <Controller
            name="severity"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Severity</InputLabel>
                <Select
                  {...field}
                  multiple
                  label="Severity"
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
            )}
          />
        </Grid>

        {/* Date Range */}
        <Grid item xs={12}>
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="date"
                label="Last Updated After"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Clear />}
        onClick={clearAllFilters}
      >
        Clear All Filters
      </Button>
    </Box>
  </Box>
));

const FilterableDataPanelDrawer = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // React Hook Form setup
  const { control, reset, watch } = useForm({
    defaultValues: {
      pathSearch: '',
      sourceIds: [],
      countRange: [0, 10000],
      autoResolveRange: [0, 100],
      manualResolveRange: [0, 100],
      status: [],
      dateRange: '',
      department: [],
      severity: []
    }
  });

  // Watch all form values
  const filters = useWatch({ control });

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

  // Apply filters with memoization
  const filteredData = useMemo(() => {
    return allData.filter(item => {
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
  }, [filters]);

  // Clear all filters
  const clearAllFilters = () => {
    reset();
    setSelectedItems([]);
  };

  // Get active filter count
  const getActiveFilterCount = useMemo(() => {
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
  }, [filters]);

  // Get active filters for display
  const getActiveFilters = useMemo(() => {
    const activeFilters = [];
    
    if (filters.pathSearch) {
      activeFilters.push({ type: 'Path Search', value: filters.pathSearch });
    }
    
    if (filters.sourceIds.length > 0) {
      activeFilters.push({ type: 'Source IDs', value: filters.sourceIds.join(', ') });
    }
    
    if (filters.countRange[0] > 0 || filters.countRange[1] < 10000) {
      activeFilters.push({ type: 'Count Range', value: `${filters.countRange[0]} - ${filters.countRange[1]}` });
    }
    
    if (filters.autoResolveRange[0] > 0 || filters.autoResolveRange[1] < 100) {
      activeFilters.push({ type: 'Auto Resolve %', value: `${filters.autoResolveRange[0]}% - ${filters.autoResolveRange[1]}%` });
    }
    
    if (filters.manualResolveRange[0] > 0 || filters.manualResolveRange[1] < 100) {
      activeFilters.push({ type: 'Manual Resolve %', value: `${filters.manualResolveRange[0]}% - ${filters.manualResolveRange[1]}%` });
    }
    
    if (filters.status.length > 0) {
      activeFilters.push({ type: 'Status', value: filters.status.join(', ') });
    }
    
    if (filters.department.length > 0) {
      activeFilters.push({ type: 'Department', value: filters.department.join(', ') });
    }
    
    if (filters.severity.length > 0) {
      activeFilters.push({ type: 'Severity', value: filters.severity.join(', ') });
    }
    
    return activeFilters;
  }, [filters]);

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
          Filter Panel with Drawer
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Use the filter drawer to narrow down data and select specific items.
        </Typography>
      </Box>

      {/* Filter Bar */}
      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={
                <Badge badgeContent={getActiveFilterCount} color="primary">
                  <FilterList />
                </Badge>
              }
              onClick={() => setDrawerOpen(true)}
            >
              Filters
            </Button>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} of {allData.length} items
            </Typography>
          </Box>
          
          {getActiveFilterCount > 0 && (
            <Button startIcon={<Clear />} onClick={clearAllFilters} size="small">
              Clear All
            </Button>
          )}
        </Box>

        {/* Active Filters Display */}
        {getActiveFilters.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
              Active Filters ({getActiveFilters.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {getActiveFilters.map((filter, index) => (
                <Chip
                  key={index}
                  label={`${filter.type}: ${filter.value}`}
                  size="small"
                  variant="outlined"
                  color="primary"
                  sx={{ 
                    maxWidth: 400,
                    '& .MuiChip-label': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

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

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { 
            width: 400,
            boxShadow: theme.shadows[8]
          }
        }}
      >
        <FilterDrawerContent
          control={control}
          clearAllFilters={clearAllFilters}
          onClose={() => setDrawerOpen(false)}
          sourceIdOptions={sourceIdOptions}
          statusOptions={statusOptions}
          departmentOptions={departmentOptions}
          severityOptions={severityOptions}
        />
      </Drawer>
    </Container>
  );
};

export default FilterableDataPanelDrawer;