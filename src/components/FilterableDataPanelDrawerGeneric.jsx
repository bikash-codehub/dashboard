import React, { useState, useMemo, useCallback } from 'react';
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

// Render individual filter based on type
const renderFilter = (filter, field, control) => {
  switch (filter.type) {
    case 'text':
      return (
        <TextField
          {...field}
          fullWidth
          label={filter.label}
          placeholder={filter.placeholder}
          InputProps={filter.showSearchIcon ? {
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          } : undefined}
        />
      );

    case 'select':
      return (
        <FormControl fullWidth>
          <InputLabel>{filter.label}</InputLabel>
          <Select
            {...field}
            multiple={filter.multiple}
            label={filter.label}
            renderValue={filter.multiple ? (selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            ) : undefined}
          >
            {filter.options.map((option) => {
              const optionValue = typeof option === 'object' ? option.value : option;
              const optionLabel = typeof option === 'object' ? option.label : option;
              return (
                <MenuItem key={optionValue} value={optionValue}>
                  {optionLabel}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );

    case 'autocomplete':
      return (
        <Autocomplete
          {...field}
          multiple={filter.multiple}
          options={filter.options}
          getOptionLabel={(option) => typeof option === 'object' ? option.label : option}
          onChange={(_, newValue) => field.onChange(newValue)}
          renderInput={(params) => <TextField {...params} label={filter.label} />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip 
                key={typeof option === 'object' ? option.value : option} 
                label={typeof option === 'object' ? option.label : option} 
                size="small" 
                {...getTagProps({ index })} 
              />
            ))
          }
        />
      );

    case 'range':
      return (
        <Box>
          <Typography gutterBottom>{filter.label}</Typography>
          <Slider
            {...field}
            onChange={(_, newValue) => field.onChange(newValue)}
            valueLabelDisplay="auto"
            min={filter.min || 0}
            max={filter.max || 100}
            step={filter.step || 1}
            valueLabelFormat={filter.formatValue || ((value) => value)}
          />
          <Typography variant="caption" color="text.secondary">
            {filter.formatValue ? 
              `${filter.formatValue(field.value[0])} - ${filter.formatValue(field.value[1])}` :
              `${field.value[0]} - ${field.value[1]}`
            }
          </Typography>
        </Box>
      );

    case 'date':
      return (
        <TextField
          {...field}
          fullWidth
          type="date"
          label={filter.label}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );

    case 'custom':
      return filter.render ? filter.render(field, control) : null;

    default:
      return null;
  }
};

// Separate component for FilterDrawerContent to prevent re-renders
const FilterDrawerContent = React.memo(({ 
  control, 
  filters, 
  clearAllFilters, 
  onClose,
  applyFilters,
  hasChanges,
  drawerTitle = "Filters"
}) => (
  <Box sx={{ width: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Tune sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {drawerTitle}
        </Typography>
        <IconButton color="inherit" onClick={onClose}>
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>

    <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
      <Grid container spacing={3}>
        {filters.map((filter) => (
          <Grid item xs={12} key={filter.name}>
            <Controller
              name={filter.name}
              control={control}
              render={({ field }) => renderFilter(filter, field, control)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>

    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', gap: 1 }}>
      {applyFilters && (
        <Button
          fullWidth
          variant="contained"
          onClick={applyFilters}
          disabled={!hasChanges}
          sx={{ mb: 1 }}
        >
          Apply Filters {hasChanges && '(Pending Changes)'}
        </Button>
      )}
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

const FilterableDataPanelDrawerGeneric = ({
  data = [],
  filters = [],
  children,
  onFilteredDataChange,
  onSelectionChange,
  selectedItems = [],
  renderSelectedItem,
  title = "Filterable Data Panel",
  subtitle = "Use the filter drawer to narrow down data and select specific items.",
  drawerTitle = "Filters",
  applyMode = false, // If true, filters are applied only when "Apply" is clicked
  defaultFilterValues = {},
  showActiveFilters = true,
  showSelectedItems = true,
  containerProps = {},
  drawerWidth = 400
}) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilterValues);

  // Create default values from filter configuration
  const getDefaultValues = useCallback(() => {
    const defaults = { ...defaultFilterValues };
    filters.forEach(filter => {
      if (!(filter.name in defaults)) {
        switch (filter.type) {
          case 'text':
          case 'date':
            defaults[filter.name] = '';
            break;
          case 'select':
          case 'autocomplete':
            defaults[filter.name] = filter.multiple ? [] : '';
            break;
          case 'range':
            defaults[filter.name] = [filter.min || 0, filter.max || 100];
            break;
          default:
            defaults[filter.name] = filter.defaultValue || '';
        }
      }
    });
    return defaults;
  }, [filters, defaultFilterValues]);

  // React Hook Form setup
  const { control, reset, watch } = useForm({
    defaultValues: getDefaultValues()
  });

  // Watch all form values
  const currentFilters = useWatch({ control });

  // Determine which filters to use for actual filtering
  const activeFilters = applyMode ? appliedFilters : currentFilters;

  // Check if there are pending changes (only relevant in apply mode)
  const hasChanges = useMemo(() => {
    if (!applyMode) return false;
    return JSON.stringify(currentFilters) !== JSON.stringify(appliedFilters);
  }, [currentFilters, appliedFilters, applyMode]);

  // Apply current filters (for apply mode)
  const applyFilters = useCallback(() => {
    if (applyMode) {
      setAppliedFilters({ ...currentFilters });
    }
  }, [currentFilters, applyMode]);

  // Filter the data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return filters.every(filter => {
        const filterValue = activeFilters[filter.name];
        
        // Skip if no filter value is set
        if (filterValue === '' || filterValue === undefined || filterValue === null) {
          return true;
        }
        
        // For arrays, skip if empty
        if (Array.isArray(filterValue) && filterValue.length === 0) {
          return true;
        }

        // Use custom filter function if provided
        if (filter.filterFunction) {
          return filter.filterFunction(item, filterValue);
        }

        // Default filtering logic based on type
        const itemValue = filter.dataKey ? item[filter.dataKey] : item;

        switch (filter.type) {
          case 'text':
            return itemValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
          
          case 'select':
          case 'autocomplete':
            if (filter.multiple) {
              const values = filterValue.map(v => typeof v === 'object' ? v.value : v);
              return values.includes(itemValue);
            } else {
              const value = typeof filterValue === 'object' ? filterValue.value : filterValue;
              return itemValue === value;
            }
          
          case 'range':
            return itemValue >= filterValue[0] && itemValue <= filterValue[1];
          
          case 'date':
            // Basic date comparison - can be extended
            return new Date(itemValue) >= new Date(filterValue);
          
          default:
            return true;
        }
      });
    });
  }, [data, filters, activeFilters]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const defaults = getDefaultValues();
    reset(defaults);
    if (applyMode) {
      setAppliedFilters(defaults);
    }
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  }, [reset, getDefaultValues, applyMode, onSelectionChange]);

  // Get active filter count
  const getActiveFilterCount = useMemo(() => {
    return filters.reduce((count, filter) => {
      const filterValue = activeFilters[filter.name];
      
      if (!filterValue) return count;
      
      if (Array.isArray(filterValue)) {
        return filterValue.length > 0 ? count + 1 : count;
      }
      
      if (filter.type === 'range') {
        const [min, max] = filterValue;
        const isDefault = min === (filter.min || 0) && max === (filter.max || 100);
        return isDefault ? count : count + 1;
      }
      
      return filterValue !== '' ? count + 1 : count;
    }, 0);
  }, [filters, activeFilters]);

  // Get active filters for display
  const getActiveFilters = useMemo(() => {
    return filters.reduce((activeFilters, filter) => {
      const filterValue = activeFilters[filter.name];
      
      if (!filterValue) return activeFilters;
      
      let displayValue = '';
      
      if (Array.isArray(filterValue)) {
        if (filterValue.length === 0) return activeFilters;
        displayValue = filterValue.map(v => typeof v === 'object' ? v.label : v).join(', ');
      } else if (filter.type === 'range') {
        const [min, max] = filterValue;
        const isDefault = min === (filter.min || 0) && max === (filter.max || 100);
        if (isDefault) return activeFilters;
        displayValue = filter.formatValue ? 
          `${filter.formatValue(min)} - ${filter.formatValue(max)}` :
          `${min} - ${max}`;
      } else {
        if (filterValue === '') return activeFilters;
        displayValue = typeof filterValue === 'object' ? filterValue.label : filterValue;
      }
      
      activeFilters.push({ type: filter.label, value: displayValue });
      return activeFilters;
    }, []);
  }, [filters, activeFilters]);

  // Notify parent of filtered data changes
  React.useEffect(() => {
    if (onFilteredDataChange) {
      onFilteredDataChange(filteredData);
    }
  }, [filteredData, onFilteredDataChange]);

  // Clone children and pass filtered data
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        data: filteredData,
        selectedItems,
        onSelectionChange,
        ...child.props
      });
    }
    return child;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4, ...containerProps }}>
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
              {hasChanges && <Chip label="Pending" size="small" color="warning" sx={{ ml: 1 }} />}
            </Button>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} of {data.length} items
            </Typography>
          </Box>
          
          {getActiveFilterCount > 0 && (
            <Button startIcon={<Clear />} onClick={clearAllFilters} size="small">
              Clear All
            </Button>
          )}
        </Box>

        {/* Active Filters Display */}
        {showActiveFilters && getActiveFilters.length > 0 && (
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
              Selected Items ({selectedItems.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedItems.map((item, index) => (
                <Chip
                  key={item.id || index}
                  label={renderSelectedItem ? renderSelectedItem(item) : `Item ${index + 1}`}
                  onDelete={() => {
                    if (onSelectionChange) {
                      onSelectionChange(selectedItems.filter((_, i) => i !== index));
                    }
                  }}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Filtered Results */}
      {childrenWithProps}

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { 
            width: drawerWidth,
            boxShadow: theme.shadows[8]
          }
        }}
      >
        <FilterDrawerContent
          control={control}
          filters={filters}
          clearAllFilters={clearAllFilters}
          onClose={() => setDrawerOpen(false)}
          applyFilters={applyMode ? applyFilters : undefined}
          hasChanges={hasChanges}
          drawerTitle={drawerTitle}
        />
      </Drawer>
    </Container>
  );
};

export default FilterableDataPanelDrawerGeneric;