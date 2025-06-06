import React, { useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Chip,
  Avatar,
  Typography,
  Box,
  useTheme,
  alpha,
  Skeleton,
} from '@mui/material';
import {
  Edit,
  Delete,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

const Table = ({
  columns = [],
  data = [],
  loading = false,
  pagination = false,
  selectable = false,
  sortable = false,
  actions = [],
  onRowClick,
  onSelectionChange,
  onSort,
  dense = false,
  maxHeight,
  emptyMessage = 'No data available',
  stickyHeader = false,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  ...props
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((row, index) => row.id || index);
      setSelected(newSelected);
      onSelectionChange?.(newSelected);
    } else {
      setSelected([]);
      onSelectionChange?.([]);
    }
  };

  const handleRowSelect = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    onSort?.(property, newOrder);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const renderCellContent = (column, row, rowIndex) => {
    const value = column.accessor ? row[column.accessor] : row[column.id];

    if (column.render) {
      return column.render(value, row, rowIndex);
    }

    if (column.type === 'avatar') {
      return (
        <Avatar
          src={value}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
          }}
        >
          {typeof value === 'string' ? value.charAt(0).toUpperCase() : '?'}
        </Avatar>
      );
    }

    if (column.type === 'chip') {
      const chipProps = column.chipProps?.(value, row) || {};
      return (
        <Chip
          label={value}
          size="small"
          {...chipProps}
        />
      );
    }

    if (column.type === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    }

    if (column.type === 'date') {
      return new Date(value).toLocaleDateString();
    }

    if (column.type === 'datetime') {
      return new Date(value).toLocaleString();
    }

    return value;
  };

  const renderActions = (row, rowIndex) => {
    if (!actions || actions.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {actions.map((action, index) => (
          <IconButton
            key={index}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              action.onClick(row, rowIndex);
            }}
            sx={{
              color: action.color || 'inherit',
              '&:hover': {
                backgroundColor: alpha(
                  theme.palette[action.color] ? theme.palette[action.color].main : theme.palette.action.hover,
                  0.1
                ),
              },
            }}
            disabled={action.disabled?.(row, rowIndex)}
          >
            {action.icon}
          </IconButton>
        ))}
      </Box>
    );
  };

  const paginatedData = pagination
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data;

  const numSelected = selected.length;
  const rowCount = data.length;

  if (loading) {
    return (
      <TableContainer component={Paper} sx={{ maxHeight }}>
        <MuiTable stickyHeader={stickyHeader} size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {selectable && <TableCell padding="checkbox" />}
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Skeleton variant="text" width={100} />
                </TableCell>
              ))}
              {actions.length > 0 && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rowsPerPage || 5 }).map((_, index) => (
              <TableRow key={index}>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Skeleton variant="circular" width={20} height={20} />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    <Skeleton variant="circular" width={24} height={24} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', ...props.sx }}>
      <TableContainer sx={{ maxHeight }}>
        <MuiTable stickyHeader={stickyHeader} size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  {sortable && column.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell align="center" style={{ minWidth: 100 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography color="text.secondary">{emptyMessage}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const isItemSelected = isSelected(row.id || rowIndex);
                const labelId = `table-checkbox-${rowIndex}`;

                return (
                  <TableRow
                    hover
                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                    role={selectable ? 'checkbox' : undefined}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id || rowIndex}
                    selected={isItemSelected}
                    sx={{
                      cursor: onRowClick ? 'pointer' : 'default',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                    }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={(event) => handleRowSelect(event, row.id || rowIndex)}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                        id={column.id === 'name' ? labelId : undefined}
                      >
                        {renderCellContent(column, row, rowIndex)}
                      </TableCell>
                    ))}
                    {actions.length > 0 && (
                      <TableCell align="center">
                        {renderActions(row, rowIndex)}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default Table;