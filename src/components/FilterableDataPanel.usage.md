# FilterableDataPanelGeneric - Usage Guide

A highly configurable and reusable filterable data panel component that can be integrated with any Table, List, or custom display component.

## Features

- ✅ **Fully Configurable Filters** - Support for text, select, autocomplete, range, date, and custom filters
- ✅ **React Hook Form Integration** - Optimized performance with minimal re-renders
- ✅ **Drawer-based Filter UI** - Clean, slide-out filter panel
- ✅ **Selected Items Management** - Built-in selection handling with customizable display
- ✅ **Custom Filter Functions** - Override default filtering logic
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **TypeScript Ready** - Full type support (when converted)

## Basic Usage

```jsx
import FilterableDataPanelGeneric from './components/FilterableDataPanelGeneric';
import Table from './components/Table';

const MyComponent = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const filterConfig = [
    {
      name: 'search',
      type: 'text',
      label: 'Search',
      dataKey: 'name'
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      multiple: true,
      options: ['Tech', 'Business', 'Design'],
      dataKey: 'category'
    }
  ];

  return (
    <FilterableDataPanelGeneric
      data={myData}
      filterConfig={filterConfig}
      defaultFilters={{ search: '', category: [] }}
      title="My Data Panel"
    >
      <Table columns={columns} />
    </FilterableDataPanelGeneric>
  );
};
```

## Filter Configuration

### Text Filter
```jsx
{
  name: 'search',
  type: 'text',
  label: 'Search Items',
  placeholder: 'Enter search term...',
  searchIcon: true, // Adds search icon
  dataKey: 'name' // Field to filter on
}
```

### Select Filter
```jsx
{
  name: 'status',
  type: 'select',
  label: 'Status',
  multiple: true, // Allow multiple selections
  options: ['Active', 'Inactive', 'Pending'],
  dataKey: 'status'
}
```

### Autocomplete Filter
```jsx
{
  name: 'tags',
  type: 'autocomplete',
  label: 'Tags',
  multiple: true,
  options: ['urgent', 'feature', 'bug', 'enhancement'],
  dataKey: 'tags'
}
```

### Range Filter
```jsx
{
  name: 'priceRange',
  type: 'range',
  label: 'Price Range',
  min: 0,
  max: 1000,
  step: 10,
  defaultValue: [0, 1000],
  dataKey: 'price',
  formatValue: (value) => `$${value[0]} - $${value[1]}`
}
```

### Date Filter
```jsx
{
  name: 'dateAfter',
  type: 'date',
  label: 'Created After',
  dataKey: 'createdDate'
}
```

### Custom Filter
```jsx
{
  name: 'custom',
  type: 'custom',
  label: 'Custom Filter',
  render: (field, control) => (
    <CustomFilterComponent {...field} />
  ),
  filterFunction: (item, filterValue) => {
    // Custom filtering logic
    return customLogic(item, filterValue);
  }
}
```

## Props Reference

### Required Props
- `data` - Array of data items to filter
- `filterConfig` - Array of filter configuration objects
- `children` - Child component (Table, List, etc.) to display filtered data

### Optional Props

#### Data & Filtering
- `defaultFilters` - Default filter values object
- `customFilterFunction(data, filters)` - Override default filtering logic
- `onDataFiltered(filteredData)` - Callback when data is filtered
- `onFilterChange(filters)` - Callback when filters change

#### UI Customization
- `title` - Panel title (default: "Data Panel")
- `subtitle` - Panel subtitle 
- `drawerTitle` - Filter drawer title (default: "Filters")
- `maxWidth` - Container max width (default: "xl")
- `containerProps` - Additional container props

#### Selected Items
- `selectedItems` - Array of selected items
- `onSelectedItemsChange(items)` - Selection change callback
- `showSelectedItems` - Show selected items section (default: false)
- `selectedItemsLabel` - Label for selected items (default: "Selected Items")
- `selectedItemRenderer(item)` - Custom selected item renderer

## Integration Examples

### With Custom Table
```jsx
<FilterableDataPanelGeneric
  data={data}
  filterConfig={filterConfig}
  title="Products"
>
  <CustomTable 
    columns={columns}
    onRowClick={handleRowClick}
  />
</FilterableDataPanelGeneric>
```

### With List Component
```jsx
<FilterableDataPanelGeneric
  data={data}
  filterConfig={filterConfig}
  title="User List"
  showSelectedItems={true}
  selectedItems={selectedUsers}
  onSelectedItemsChange={setSelectedUsers}
>
  <UserList onUserSelect={handleUserSelect} />
</FilterableDataPanelGeneric>
```

### With Custom Filtering
```jsx
const customFilter = (data, filters) => {
  return data.filter(item => {
    // Your custom filtering logic
    if (filters.complexFilter) {
      return complexFilterLogic(item, filters.complexFilter);
    }
    return true;
  });
};

<FilterableDataPanelGeneric
  data={data}
  filterConfig={filterConfig}
  customFilterFunction={customFilter}
>
  <DataView />
</FilterableDataPanelGeneric>
```

## Advanced Features

### Child Component Data Injection
The component automatically passes filtered data to child components via `React.cloneElement`:

```jsx
// Your child component will receive:
// - data: filtered data array
// - selectedItems: current selected items
// - onSelectedItemsChange: selection handler
```

### Filter State Management
Built on react-hook-form for optimal performance:
- Minimal re-renders
- Stable form state
- Built-in validation support
- Easy reset functionality

### Responsive Design
- Drawer-based filters work on all screen sizes
- Responsive filter layout
- Mobile-friendly touch interactions

## Performance Notes

- Uses React.memo for component optimization
- react-hook-form prevents unnecessary re-renders
- Memoized filter calculations
- Efficient data filtering with useMemo

## Styling Customization

The component uses Material-UI components and can be customized via:
- Theme provider
- Container props
- Custom filter renderers
- Child component styling

## Migration from Existing Components

To migrate from a custom filterable component:

1. Extract your filter logic into `filterConfig` format
2. Move data and selection state to parent component
3. Wrap your display component as a child
4. Configure callbacks for data changes

This provides a clean separation of concerns and reusable filtering logic across your application.