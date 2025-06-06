import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Avatar,
  IconButton,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  Person,
  Business,
  Email,
  Phone,
  CheckCircle,
  Cancel,
  Pending,
} from '@mui/icons-material';
import Table from './Table';

// Sample data
const usersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-05T10:30:00Z',
    avatar: null,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Manager',
    status: 'Active',
    joinDate: '2023-03-20',
    lastLogin: '2024-01-04T15:45:00Z',
    avatar: null,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'User',
    status: 'Inactive',
    joinDate: '2023-05-10',
    lastLogin: '2023-12-20T09:15:00Z',
    avatar: null,
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'User',
    status: 'Pending',
    joinDate: '2023-12-01',
    lastLogin: null,
    avatar: null,
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Manager',
    status: 'Active',
    joinDate: '2022-11-30',
    lastLogin: '2024-01-05T08:20:00Z',
    avatar: null,
  },
];

const productsData = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 45,
    status: 'In Stock',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 299.99,
    stock: 0,
    status: 'Out of Stock',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Coffee Maker',
    category: 'Appliances',
    price: 89.99,
    stock: 23,
    status: 'In Stock',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    category: 'Electronics',
    price: 49.99,
    stock: 5,
    status: 'Low Stock',
    rating: 4.3,
  },
];

const TableDemo = () => {
  const theme = useTheme();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Column definitions for users table
  const userColumns = [
    {
      id: 'avatar',
      label: 'Avatar',
      accessor: 'name',
      type: 'avatar',
      minWidth: 60,
      sortable: false,
    },
    {
      id: 'name',
      label: 'Name',
      accessor: 'name',
      minWidth: 150,
    },
    {
      id: 'email',
      label: 'Email',
      accessor: 'email',
      minWidth: 200,
    },
    {
      id: 'role',
      label: 'Role',
      accessor: 'role',
      type: 'chip',
      minWidth: 100,
      chipProps: (value) => ({
        color: value === 'Admin' ? 'primary' : value === 'Manager' ? 'secondary' : 'default',
        variant: 'outlined',
      }),
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      type: 'chip',
      minWidth: 120,
      chipProps: (value) => ({
        color: value === 'Active' ? 'success' : value === 'Inactive' ? 'error' : 'warning',
        icon: value === 'Active' ? <CheckCircle /> : value === 'Inactive' ? <Cancel /> : <Pending />,
      }),
    },
    {
      id: 'joinDate',
      label: 'Join Date',
      accessor: 'joinDate',
      type: 'date',
      minWidth: 120,
    },
    {
      id: 'lastLogin',
      label: 'Last Login',
      accessor: 'lastLogin',
      type: 'datetime',
      minWidth: 160,
      render: (value) => value ? new Date(value).toLocaleString() : 'Never',
    },
  ];

  // Column definitions for products table
  const productColumns = [
    {
      id: 'name',
      label: 'Product Name',
      accessor: 'name',
      minWidth: 200,
    },
    {
      id: 'category',
      label: 'Category',
      accessor: 'category',
      minWidth: 120,
    },
    {
      id: 'price',
      label: 'Price',
      accessor: 'price',
      type: 'currency',
      align: 'right',
      minWidth: 100,
    },
    {
      id: 'stock',
      label: 'Stock',
      accessor: 'stock',
      align: 'center',
      minWidth: 80,
      render: (value, row) => (
        <Chip
          label={value}
          color={value === 0 ? 'error' : value < 10 ? 'warning' : 'success'}
          size="small"
        />
      ),
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      type: 'chip',
      minWidth: 120,
      chipProps: (value) => ({
        color: value === 'In Stock' ? 'success' : value === 'Out of Stock' ? 'error' : 'warning',
      }),
    },
    {
      id: 'rating',
      label: 'Rating',
      accessor: 'rating',
      align: 'center',
      minWidth: 80,
      render: (value) => `⭐ ${value}`,
    },
  ];

  // Action handlers
  const handleEdit = (row) => {
    console.log('Edit:', row);
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
  };

  const handleView = (row) => {
    console.log('View:', row);
  };

  const handleRowClick = (row) => {
    console.log('Row clicked:', row);
  };

  const handleLoadingToggle = () => {
    setLoading(!loading);
  };

  // Actions for users table
  const userActions = [
    {
      icon: <Visibility />,
      onClick: handleView,
      color: 'info',
    },
    {
      icon: <Edit />,
      onClick: handleEdit,
      color: 'primary',
    },
    {
      icon: <Delete />,
      onClick: handleDelete,
      color: 'error',
      disabled: (row) => row.role === 'Admin',
    },
  ];

  // Actions for products table
  const productActions = [
    {
      icon: <Edit />,
      onClick: handleEdit,
      color: 'primary',
    },
    {
      icon: <Delete />,
      onClick: handleDelete,
      color: 'error',
    },
  ];

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Table Component Demo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Showcasing the reusable Table component with various configurations
        </Typography>
        <Button
          variant="outlined"
          onClick={handleLoadingToggle}
          sx={{ mb: 2 }}
        >
          Toggle Loading State
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Users Table - Full Featured */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Users Management"
              subheader="Full-featured table with selection, sorting, pagination, and actions"
              action={
                selectedUsers.length > 0 && (
                  <Chip
                    label={`${selectedUsers.length} selected`}
                    color="primary"
                    size="small"
                  />
                )
              }
            />
            <CardContent>
              <Table
                columns={userColumns}
                data={usersData}
                loading={loading}
                pagination
                selectable
                sortable
                actions={userActions}
                onRowClick={handleRowClick}
                onSelectionChange={setSelectedUsers}
                rowsPerPageOptions={[5, 10, 15]}
                defaultRowsPerPage={5}
                stickyHeader
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Products Table - Simple */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Products Inventory"
              subheader="Simple table with custom rendering and actions"
            />
            <CardContent>
              <Table
                columns={productColumns}
                data={productsData}
                loading={loading}
                actions={productActions}
                dense
                maxHeight={400}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Empty Table Demo */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Empty State Demo"
              subheader="Table with no data to show empty state"
            />
            <CardContent>
              <Table
                columns={[
                  { id: 'name', label: 'Name', accessor: 'name' },
                  { id: 'status', label: 'Status', accessor: 'status' },
                  { id: 'date', label: 'Date', accessor: 'date', type: 'date' },
                ]}
                data={[]}
                loading={loading}
                emptyMessage="No items found. Try adding some data!"
                pagination
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TableDemo;