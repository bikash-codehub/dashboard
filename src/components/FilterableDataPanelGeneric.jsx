import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

// Separate component for FilterDrawerContent to prevent re-renders
const FilterDrawerContent = React.memo(({ 
  control, 
  clearAllFilters, 
  onClose, 
  filterConfig,
  title = "Filters",
  applyFilters,
  hasUnappliedChanges
}) => (
  <Box sx={{ width: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Tune sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton color="inherit" onClick={onClose}>
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>

    <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
      <Grid container spacing={3}>
        {filterConfig.map((config, index) => (
          <Grid item xs={12} key={config.name || index}>
            {config.type === 'text' && (
              <Controller
                name={config.name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={config.label}
                    placeholder={config.placeholder}
                    InputProps={{
                      startAdornment: config.startAdornment || (config.searchIcon ? <Search sx={{ mr: 1, color: 'text.secondary' }} /> : null)
                    }}
                  />
                )}
              />
            )}

            {config.type === 'autocomplete' && (
              <Controller
                name={config.name}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple={config.multiple || false}
                    options={config.options || []}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderInput={(params) => <TextField {...params} label={config.label} />}
                    renderTags={config.multiple ? (value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} label={option} size="small" {...getTagProps({ index })} />
                      )) : undefined
                    }
                  />
                )}
              />
            )}

            {config.type === 'select' && (
              <Controller
                name={config.name}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>{config.label}</InputLabel>
                    <Select
                      {...field}
                      multiple={config.multiple || false}
                      label={config.label}
                      renderValue={config.multiple ? (selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      ) : undefined}
                    >
                      {(config.options || []).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            )}

            {config.type === 'range' && (
              <Controller
                name={config.name}
                control={control}
                render={({ field }) => (
                  <Box>
                    <Typography gutterBottom>{config.label}</Typography>
                    <Slider
                      {...field}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      valueLabelDisplay="auto"
                      min={config.min || 0}
                      max={config.max || 100}
                      step={config.step || 1}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {config.formatValue ? config.formatValue(field.value) : `${field.value[0]} - ${field.value[1]}`}
                    </Typography>
                  </Box>
                )}
              />
            )}

            {config.type === 'date' && (
              <Controller
                name={config.name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="date"
                    label={config.label}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            )}

            {config.type === 'custom' && config.render && (
              <Controller
                name={config.name}
                control={control}
                render={({ field }) => config.render(field, control)}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>

    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        fullWidth
        variant="contained"
        onClick={applyFilters}
        disabled={!hasUnappliedChanges}
        sx={{ mb: 1 }}
      >
        Apply Filters
      </Button>
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

const FilterableDataPanelGeneric = ({
  // Data and filtering
  data = [],
  onDataFiltered,
  
  // Filter configuration
  filterConfig = [],
  defaultFilters = {},
  
  // UI customization
  title = "Data Panel",
  subtitle = "Use filters to narrow down data",
  drawerTitle = "Filters",
  
  // Children components (Table, List, etc.)
  children,
  
  // Selected items functionality
  selectedItems = [],
  onSelectedItemsChange,
  showSelectedItems = false,
  selectedItemsLabel = "Selected Items",
  selectedItemRenderer,
  
  // Container props
  maxWidth = "xl",
  containerProps = {},
  
  // Custom filter functions
  customFilterFunction,
  
  // Callbacks
  onFilterChange,
}) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  // React Hook Form setup
  const { control, reset, watch } = useForm({
    defaultValues: defaultFilters
  });

  // Watch all form values (for display only, not for filtering)
  const currentFilters = watch();

  // Apply filters only when appliedFilters changes
  const filteredData = useMemo(() => {
    if (customFilterFunction) {
      return customFilterFunction(data, appliedFilters);
    }

    // Default filtering logic
    return data.filter(item => {
      return filterConfig.every(config => {
        const filterValue = appliedFilters[config.name];
        const itemValue = item[config.dataKey || config.name];

        // Skip filtering if no filter value is set
        if (!filterValue || 
            filterValue === '' ||
            (Array.isArray(filterValue) && filterValue.length === 0)) {
          return true;
        }

        // Special handling for range filters with default values
        if (config.type === 'range' && Array.isArray(filterValue)) {
          const defaultRange = defaultFilters[config.name] || [config.min || 0, config.max || 100];
          if (filterValue[0] === defaultRange[0] && filterValue[1] === defaultRange[1]) {
            return true; // Skip filtering if range is at default values
          }
        }

        switch (config.type) {
          case 'text':
            return itemValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
          
          case 'autocomplete':
          case 'select':
            if (config.multiple) {
              return filterValue.includes(itemValue);
            }
            return filterValue === itemValue;
          
          case 'range':
            return itemValue >= filterValue[0] && itemValue <= filterValue[1];
          
          case 'date':
            return new Date(itemValue) >= new Date(filterValue);
          
          case 'custom':
            return config.filterFunction ? config.filterFunction(item, filterValue) : true;
          
          default:
            return true;
        }
      });
    });
  }, [data, appliedFilters, filterConfig, customFilterFunction]);

  // Notify parent of filtered data
  React.useEffect(() => {
    if (onDataFiltered) {
      onDataFiltered(filteredData);
    }
  }, [filteredData, onDataFiltered]);

  // Notify parent of filter changes (only when applied)
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange(appliedFilters);
    }
  }, [appliedFilters, onFilterChange]);

  // Apply current filters
  const applyFilters = () => {
    setAppliedFilters(currentFilters);
    setDrawerOpen(false); // Close drawer after applying filters
  };

  // Clear all filters
  const clearAllFilters = () => {
    reset();
    setAppliedFilters(defaultFilters);
    if (onSelectedItemsChange) {
      onSelectedItemsChange([]);
    }
  };

  // Check if current filters differ from applied filters
  const hasUnappliedChanges = JSON.stringify(currentFilters) !== JSON.stringify(appliedFilters);

  // Get active filter count (based on applied filters)
  const getActiveFilterCount = useMemo(() => {
    return filterConfig.reduce((count, config) => {
      const value = appliedFilters[config.name];
      const defaultValue = defaultFilters[config.name];
      
      if (!value && !defaultValue) return count;
      
      if (Array.isArray(value)) {
        return count + (value.length > 0 ? 1 : 0);
      } else if (config.type === 'range') {
        // Compare against the actual default value from defaultFilters
        const defaultRange = defaultValue || [config.min || 0, config.max || 100];
        return count + (value[0] !== defaultRange[0] || value[1] !== defaultRange[1] ? 1 : 0);
      } else {
        // For other types, check if value differs from default
        const isDefault = value === defaultValue || 
                         (value === '' && (defaultValue === '' || !defaultValue)) ||
                         (!value && !defaultValue);
        return count + (!isDefault ? 1 : 0);
      }
    }, 0);
  }, [appliedFilters, filterConfig, defaultFilters]);

  // Get active filters for display (based on applied filters)
  const getActiveFilters = useMemo(() => {
    return filterConfig.reduce((activeFilters, config) => {
      const value = appliedFilters[config.name];
      const defaultValue = defaultFilters[config.name];
      
      if (!value && !defaultValue) return activeFilters;

      let displayValue = '';
      
      if (Array.isArray(value) && value.length > 0) {
        displayValue = value.join(', ');
      } else if (config.type === 'range') {
        // Compare against the actual default value from defaultFilters
        const defaultRange = defaultValue || [config.min || 0, config.max || 100];
        if (value[0] !== defaultRange[0] || value[1] !== defaultRange[1]) {
          displayValue = config.formatValue ? config.formatValue(value) : `${value[0]} - ${value[1]}`;
        }
      } else {
        // For other types, check if value differs from default
        const isDefault = value === defaultValue || 
                         (value === '' && (defaultValue === '' || !defaultValue)) ||
                         (!value && !defaultValue);
        if (!isDefault) {
          displayValue = value.toString();
        }
      }

      if (displayValue) {
        activeFilters.push({
          type: config.label,
          value: displayValue
        });
      }

      return activeFilters;
    }, []);
  }, [appliedFilters, filterConfig, defaultFilters]);

  const defaultSelectedItemRenderer = (item) => (
    <Chip
      key={item.id || Math.random()}
      label={item.name || item.title || item.label || `Item ${item.id}`}
      onDelete={() => {
        if (onSelectedItemsChange) {
          onSelectedItemsChange(selectedItems.filter(i => i.id !== item.id));
        }
      }}
      color="primary"
      variant="outlined"
    />
  );

  return (
    <Container maxWidth={maxWidth} sx={{ py: 4, ...containerProps.sx }} {...containerProps}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
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
              {filteredData.length} of {data.length} items
              {hasUnappliedChanges && (
                <Chip 
                  label="Changes pending" 
                  size="small" 
                  color="warning" 
                  variant="outlined" 
                  sx={{ ml: 1 }}
                />
              )}
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
      {showSelectedItems && selectedItems.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {selectedItemsLabel} ({selectedItems.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedItems.map(selectedItemRenderer || defaultSelectedItemRenderer)}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Content Area - Pass filtered data to children */}
      {children && (
        <Paper>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6">
              Filtered Results ({filteredData.length} items)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {children.props.onRowClick ? 'Click rows to select/deselect items' : 'Data results'}
            </Typography>
          </Box>
          {React.cloneElement(children, { 
            data: filteredData,
            selectedItems,
            onSelectedItemsChange 
          })}
        </Paper>
      )}

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
          filterConfig={filterConfig}
          title={drawerTitle}
          applyFilters={applyFilters}
          hasUnappliedChanges={hasUnappliedChanges}
        />
      </Drawer>
    </Container>
  );
};

export default FilterableDataPanelGeneric;