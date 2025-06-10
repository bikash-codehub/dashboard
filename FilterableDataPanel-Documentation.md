# FilterableDataPanel Components Documentation

A comprehensive guide to the filterable data panel components in the dashboard application.

## Overview

The dashboard includes a suite of powerful filtering components designed to handle complex data filtering scenarios with different UI patterns and levels of customization.

## Component Architecture

### 1. FilterableDataPanel
**File**: `src/components/FilterableDataPanel.jsx`

A standalone component with an integrated collapsible filter panel.

#### Features
- **8 Filter Types**: Text search, multi-select autocomplete, range sliders, dropdowns, date picker
- **Collapsible UI**: Expandable filter panel with active filter count badge
- **Real-time Filtering**: Immediate data updates using useEffect
- **Row Selection**: Built-in selection functionality
- **Sample Data**: Includes 10 pre-configured API endpoint records

#### Usage
```jsx
import FilterableDataPanel from './components/FilterableDataPanel';

function App() {
  return <FilterableDataPanel />;
}
```

#### Filter Configuration
```javascript
const filters = [
  {
    name: 'search',
    type: 'text',
    label: 'Search',
    placeholder: 'Search by name or endpoint...'
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    options: ['Active', 'Inactive', 'Pending'],
    multiple: true
  },
  {
    name: 'countRange',
    type: 'range',
    label: 'Call Count',
    min: 0,
    max: 10000,
    step: 100
  }
];
```

### 2. FilterableDataPanelGeneric
**File**: `src/components/FilterableDataPanelGeneric.jsx`

A highly configurable, reusable component for advanced filtering scenarios.

#### Features
- **Configuration-Driven**: Completely customizable through props
- **React Hook Form**: Performance-optimized form handling
- **Drawer UI**: Clean side-panel filter interface
- **6 Filter Types**: text, select, autocomplete, range, date, custom
- **Custom Functions**: Support for custom filter logic
- **Apply Workflow**: Pending changes with apply/clear buttons
- **Memoized Performance**: Optimized filtering calculations

#### Props Interface
```typescript
interface FilterableDataPanelGenericProps {
  data: Array<any>;                    // Data to filter
  filters: FilterConfig[];             // Filter configuration
  children: React.ReactNode;           // Child components to render
  onFilteredDataChange?: (data: Array<any>) => void;
  onSelectionChange?: (selected: Array<any>) => void;
  selectedItems?: Array<any>;          // Controlled selection
  renderSelectedItem?: (item: any) => React.ReactNode;
}
```

#### Filter Configuration Schema
```typescript
interface FilterConfig {
  name: string;                        // Unique identifier
  type: 'text' | 'select' | 'autocomplete' | 'range' | 'date' | 'custom';
  label: string;                       // Display label
  dataKey?: string;                    // Data property to filter
  multiple?: boolean;                  // For select/autocomplete
  options?: string[] | Array<{label: string, value: any}>;
  min?: number;                        // For range filters
  max?: number;                        // For range filters
  step?: number;                       // For range filters
  formatValue?: (value: number) => string;  // Range display formatter
  render?: (field: any, control: any) => React.ReactNode;  // Custom render
  filterFunction?: (item: any, filterValue: any) => boolean;  // Custom logic
}
```

#### Usage Example
```jsx
import FilterableDataPanelGeneric from './components/FilterableDataPanelGeneric';
import Table from './components/Table';

const sampleData = [
  { id: 1, name: 'API Endpoint 1', status: 'Active', count: 1500 },
  { id: 2, name: 'API Endpoint 2', status: 'Inactive', count: 800 }
];

const filterConfig = [
  {
    name: 'search',
    type: 'text',
    label: 'Search',
    dataKey: 'name'
  },
  {
    name: 'status',
    type: 'autocomplete',
    label: 'Status',
    dataKey: 'status',
    options: ['Active', 'Inactive', 'Pending'],
    multiple: true
  },
  {
    name: 'countRange',
    type: 'range',
    label: 'Call Count',
    dataKey: 'count',
    min: 0,
    max: 5000,
    step: 100,
    formatValue: (value) => `${value.toLocaleString()} calls`
  }
];

function MyComponent() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <FilterableDataPanelGeneric
      data={sampleData}
      filters={filterConfig}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      renderSelectedItem={(item) => (
        <span>{item.name} ({item.status})</span>
      )}
    >
      <Table />
    </FilterableDataPanelGeneric>
  );
}
```

### 3. FilterableDataPanelDrawer
**File**: `src/components/FilterableDataPanelDrawer.jsx`

Specialized version with drawer-based filters and real-time updates.

#### Features
- **Drawer Interface**: Side-panel filter controls
- **Real-time Updates**: useWatch for immediate filtering
- **Performance Optimized**: React.memo for drawer content
- **Same Data Structure**: Compatible with FilterableDataPanel data

#### Usage
```jsx
import FilterableDataPanelDrawer from './components/FilterableDataPanelDrawer';

function App() {
  return <FilterableDataPanelDrawer />;
}
```

### 4. FilterableDataPanelDrawerGeneric
**File**: `src/components/FilterableDataPanelDrawerGeneric.jsx`

A highly configurable, reusable drawer-based filter component that combines the power of FilterableDataPanelGeneric with a clean drawer interface.

#### Features
- **Configuration-Driven**: Completely customizable through props
- **React Hook Form**: Performance-optimized form handling
- **Drawer UI**: Clean side-panel filter interface with customizable width
- **6 Filter Types**: text, select, autocomplete, range, date, custom
- **Custom Functions**: Support for custom filter logic
- **Real-time or Apply Mode**: Choose between immediate filtering or apply-based workflow
- **Memoized Performance**: Optimized filtering calculations
- **Pending Changes Indicator**: Visual feedback for unapplied changes (in apply mode)

#### Props Interface
```typescript
interface FilterableDataPanelDrawerGenericProps {
  data: Array<any>;                    // Data to filter
  filters: FilterConfig[];             // Filter configuration
  children: React.ReactNode;           // Child components to render
  onFilteredDataChange?: (data: Array<any>) => void;
  onSelectionChange?: (selected: Array<any>) => void;
  selectedItems?: Array<any>;          // Controlled selection
  renderSelectedItem?: (item: any) => React.ReactNode;
  title?: string;                      // Panel title
  subtitle?: string;                   // Panel subtitle
  drawerTitle?: string;                // Drawer header title
  applyMode?: boolean;                 // Enable apply-based filtering
  defaultFilterValues?: object;        // Default filter values
  showActiveFilters?: boolean;         // Show active filters summary
  showSelectedItems?: boolean;         // Show selected items panel
  containerProps?: object;             // Container styling props
  drawerWidth?: number;                // Drawer width in pixels
}
```

#### Usage Example
```jsx
import FilterableDataPanelDrawerGeneric from './components/FilterableDataPanelDrawerGeneric';
import Table from './components/Table';

const sampleData = [
  { id: 1, name: 'API Endpoint 1', status: 'Active', count: 1500 },
  { id: 2, name: 'API Endpoint 2', status: 'Inactive', count: 800 }
];

const filterConfig = [
  {
    name: 'search',
    type: 'text',
    label: 'Search',
    dataKey: 'name',
    showSearchIcon: true
  },
  {
    name: 'status',
    type: 'autocomplete',
    label: 'Status',
    dataKey: 'status',
    options: ['Active', 'Inactive', 'Pending'],
    multiple: true
  },
  {
    name: 'countRange',
    type: 'range',
    label: 'Call Count',
    dataKey: 'count',
    min: 0,
    max: 5000,
    step: 100,
    formatValue: (value) => `${value.toLocaleString()} calls`
  }
];

function MyComponent() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <FilterableDataPanelDrawerGeneric
      data={sampleData}
      filters={filterConfig}
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      title="My Data Panel"
      subtitle="Filter and select data using the drawer interface"
      drawerTitle="Advanced Filters"
      applyMode={false}  // Real-time filtering
      drawerWidth={450}
      renderSelectedItem={(item) => (
        <span>{item.name} ({item.status})</span>
      )}
    >
      <Table />
    </FilterableDataPanelDrawerGeneric>
  );
}
```

## Filter Types Reference

### 1. Text Filter
```javascript
{
  name: 'search',
  type: 'text',
  label: 'Search',
  dataKey: 'name',           // Field to search in
  placeholder: 'Enter search term...'
}
```

### 2. Select Filter
```javascript
{
  name: 'category',
  type: 'select',
  label: 'Category',
  dataKey: 'category',
  options: ['Option 1', 'Option 2', 'Option 3'],
  multiple: true             // Allow multiple selections
}
```

### 3. Autocomplete Filter
```javascript
{
  name: 'tags',
  type: 'autocomplete',
  label: 'Tags',
  dataKey: 'tags',
  options: [
    { label: 'Important', value: 'important' },
    { label: 'Urgent', value: 'urgent' }
  ],
  multiple: true
}
```

### 4. Range Filter
```javascript
{
  name: 'price',
  type: 'range',
  label: 'Price Range',
  dataKey: 'price',
  min: 0,
  max: 1000,
  step: 10,
  formatValue: (value) => `$${value}`
}
```

### 5. Date Filter
```javascript
{
  name: 'createdDate',
  type: 'date',
  label: 'Created Date',
  dataKey: 'createdAt'
}
```

### 6. Custom Filter
```javascript
{
  name: 'custom',
  type: 'custom',
  label: 'Custom Filter',
  render: (field, control) => (
    <CustomFilterComponent
      value={field.value}
      onChange={field.onChange}
      control={control}
    />
  ),
  filterFunction: (item, filterValue) => {
    // Custom filtering logic
    return customLogic(item, filterValue);
  }
}
```

## Drawer-Specific Features

### Apply Mode vs Real-time Mode

The `FilterableDataPanelDrawerGeneric` supports two filtering modes:

#### Real-time Mode (default)
```jsx
<FilterableDataPanelDrawerGeneric
  data={data}
  filters={filters}
  applyMode={false} // Real-time filtering
>
  <Table />
</FilterableDataPanelDrawerGeneric>
```
- Filters are applied immediately as the user changes them
- Best for small to medium datasets
- Provides instant feedback

#### Apply Mode
```jsx
<FilterableDataPanelDrawerGeneric
  data={data}
  filters={filters}
  applyMode={true} // Apply-based filtering
>
  <Table />
</FilterableDataPanelDrawerGeneric>
```
- Filters are only applied when the user clicks "Apply Filters"
- Shows "Pending Changes" indicator when filters are modified but not applied
- Best for large datasets or complex filter operations
- Reduces unnecessary calculations

### Drawer Customization

```jsx
<FilterableDataPanelDrawerGeneric
  data={data}
  filters={filters}
  title="Custom Data Panel"
  subtitle="Filter your data efficiently"
  drawerTitle="Advanced Filters"
  drawerWidth={500}  // Custom drawer width
  showActiveFilters={true}   // Show active filters summary
  showSelectedItems={true}   // Show selected items panel
  containerProps={{ sx: { backgroundColor: 'grey.50' } }}
>
  <Table />
</FilterableDataPanelDrawerGeneric>
```

### Default Filter Values

```jsx
const defaultFilterValues = {
  search: 'default search term',
  status: ['Active', 'Warning'],
  countRange: [100, 2000],
  severity: ['High']
};

<FilterableDataPanelDrawerGeneric
  data={data}
  filters={filters}
  defaultFilterValues={defaultFilterValues}
>
  <Table />
</FilterableDataPanelDrawerGeneric>
```

## Advanced Usage Patterns

### Custom Filter Functions
```javascript
const filterConfig = [
  {
    name: 'complexFilter',
    type: 'text',
    label: 'Complex Search',
    filterFunction: (item, searchTerm) => {
      // Custom multi-field search
      const searchFields = [item.name, item.description, item.tags?.join(' ')];
      const searchText = searchFields.join(' ').toLowerCase();
      return searchText.includes(searchTerm.toLowerCase());
    }
  }
];
```

### Dynamic Options
```javascript
const [options, setOptions] = useState([]);

useEffect(() => {
  // Dynamically load options
  fetchOptions().then(setOptions);
}, []);

const filterConfig = [
  {
    name: 'dynamicSelect',
    type: 'select',
    label: 'Dynamic Options',
    options: options,
    multiple: true
  }
];
```

### Controlled Selection
```javascript
function ControlledExample() {
  const [selectedItems, setSelectedItems] = useState([]);
  
  const handleSelectionChange = (newSelection) => {
    setSelectedItems(newSelection);
    // Additional logic when selection changes
  };

  return (
    <FilterableDataPanelGeneric
      data={data}
      filters={filters}
      selectedItems={selectedItems}
      onSelectionChange={handleSelectionChange}
    >
      <Table />
    </FilterableDataPanelGeneric>
  );
}
```

## Performance Considerations

### Optimization Strategies
1. **Use React Hook Form**: Integrated in FilterableDataPanelGeneric for minimal re-renders
2. **Memoized Filtering**: useMemo for expensive filter calculations
3. **Component Memoization**: React.memo for expensive child components
4. **Apply-based Workflow**: Batch filter changes in Generic component

### Large Dataset Handling
```javascript
// For large datasets, consider virtualization
const filterConfig = [
  {
    name: 'search',
    type: 'text',
    label: 'Search',
    filterFunction: useMemo(() => 
      debounce((item, searchTerm) => {
        // Debounced search for large datasets
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      }, 300)
    , [])
  }
];
```

## Integration Examples

### With Dashboard Components
```jsx
// AlertsDashboard integration
<FilterableDataPanelGeneric
  data={alertsData}
  filters={alertFilters}
  onFilteredDataChange={handleFilteredAlerts}
>
  <AlertsDashboard />
</FilterableDataPanelGeneric>
```

### With Custom Tables
```jsx
// Custom table integration
<FilterableDataPanelGeneric
  data={tableData}
  filters={tableFilters}
>
  <CustomTable
    columns={columns}
    onRowClick={handleRowClick}
  />
</FilterableDataPanelGeneric>
```

## Component Files Reference

| Component | File Path | UI Pattern | Use Case |
|-----------|-----------|------------|----------|
| FilterableDataPanel | `src/components/FilterableDataPanel.jsx` | Inline collapsible | Quick implementation |
| FilterableDataPanelGeneric | `src/components/FilterableDataPanelGeneric.jsx` | Drawer-based | High customization |
| FilterableDataPanelDrawer | `src/components/FilterableDataPanelDrawer.jsx` | Side drawer | Real-time filtering |
| FilterableDataPanelDrawerGeneric | `src/components/FilterableDataPanelDrawerGeneric.jsx` | Configurable drawer | Reusable drawer filtering |
| FilterableDataPanelDemo | `src/components/FilterableDataPanelDemo.jsx` | Demo implementation | Example usage |
| FilterableDataPanelDrawerDemo | `src/components/FilterableDataPanelDrawerDemo.jsx` | Drawer demo | Drawer example usage |

## Best Practices

1. **Choose the Right Component**:
   - Use `FilterableDataPanel` for quick implementations
   - Use `FilterableDataPanelGeneric` for complex, reusable scenarios with drawer UI
   - Use `FilterableDataPanelDrawer` for real-time filtering needs (hardcoded implementation)
   - Use `FilterableDataPanelDrawerGeneric` for reusable drawer-based filtering with full customization

2. **Filter Configuration**:
   - Always provide unique `name` properties
   - Use appropriate `dataKey` for automatic filtering
   - Implement custom `filterFunction` for complex logic

3. **Performance**:
   - Memoize expensive filter functions
   - Use controlled selection for state management
   - Consider debouncing for text filters on large datasets

4. **User Experience**:
   - Provide clear filter labels
   - Show active filter counts
   - Implement clear/reset functionality
   - Use appropriate filter types for data types

## Troubleshooting

### Common Issues

1. **Filters not working**: Ensure `dataKey` matches your data structure
2. **Performance issues**: Use memoization and consider FilterableDataPanelGeneric
3. **UI not updating**: Check if you're using controlled vs uncontrolled patterns correctly
4. **Custom filters not applying**: Verify `filterFunction` returns boolean values

### Debug Tips

```javascript
// Add debug logging to filter functions
const debugFilterConfig = filters.map(filter => ({
  ...filter,
  filterFunction: filter.filterFunction ? (item, value) => {
    const result = filter.filterFunction(item, value);
    console.log(`Filter ${filter.name}:`, { item, value, result });
    return result;
  } : undefined
}));
```

This documentation provides a complete reference for implementing and customizing filterable data panels in your dashboard application.