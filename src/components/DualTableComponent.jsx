import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import Table from './Table';

const DualTableComponent = ({
  leftTableData = [],
  leftTableColumns = [],
  rightTableData = [],
  rightTableColumns = [],
  leftTableTitle = 'Primary Data',
  rightTableTitle = 'Details',
  onLeftRowSelect,
  getDetailData,
  initialSelectedIndex = 0,
  maxHeight = 600,
  ...props
}) => {
  const theme = useTheme();
  const [selectedRowIndex, setSelectedRowIndex] = useState(initialSelectedIndex);
  const [rightData, setRightData] = useState([]);

  useEffect(() => {
    if (leftTableData.length > 0) {
      const initialRow = leftTableData[selectedRowIndex] || leftTableData[0];
      if (getDetailData) {
        const detailData = getDetailData(initialRow, selectedRowIndex);
        setRightData(Array.isArray(detailData) ? detailData : [detailData]);
      } else if (rightTableData.length > 0) {
        setRightData(rightTableData);
      }
    }
  }, [leftTableData, rightTableData, selectedRowIndex, getDetailData]);

  const handleLeftRowClick = (row, rowIndex) => {
    setSelectedRowIndex(rowIndex);
    
    if (getDetailData) {
      const detailData = getDetailData(row, rowIndex);
      setRightData(Array.isArray(detailData) ? detailData : [detailData]);
    }
    
    onLeftRowSelect?.(row, rowIndex);
  };

  const enhancedLeftColumns = leftTableColumns.map(column => ({
    ...column,
    render: column.render || ((value, row, rowIndex) => {
      const isSelected = rowIndex === selectedRowIndex;
      return (
        <Box
          sx={{
            fontWeight: isSelected ? 600 : 400,
            color: isSelected ? theme.palette.primary.main : 'inherit',
          }}
        >
          {value}
        </Box>
      );
    })
  }));

  return (
    <Box sx={{ width: '100%', height: '100%', ...props.sx }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={6}>
          <Paper 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" component="h2">
                {leftTableTitle}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Table
                columns={enhancedLeftColumns}
                data={leftTableData}
                onRowClick={handleLeftRowClick}
                stickyHeader={true}
                maxHeight={maxHeight - 80}
                sx={{
                  '& .MuiTableBody-root .MuiTableRow-root': {
                    cursor: 'pointer',
                    '&:nth-of-type(even)': {
                      backgroundColor: `${alpha(theme.palette.grey[100], 0.7)} !important`,
                    },
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'transparent !important',
                    },
                    '&:hover': {
                      backgroundColor: `${alpha(theme.palette.primary.main, 0.08)} !important`,
                    },
                  },
                  '& .MuiTableBody-root .MuiTableRow-root.Mui-selected': {
                    backgroundColor: `${alpha(theme.palette.primary.main, 0.12)} !important`,
                    '&:hover': {
                      backgroundColor: `${alpha(theme.palette.primary.main, 0.16)} !important`,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={6}>
          <Paper 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" component="h2">
                {rightTableTitle}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Table
                columns={rightTableColumns}
                data={rightData}
                stickyHeader={true}
                maxHeight={maxHeight - 80}
                emptyMessage="Select a row from the left table to view details"
                sx={{
                  '& .MuiTableBody-root .MuiTableRow-root': {
                    '&:nth-of-type(even)': {
                      backgroundColor: `${alpha(theme.palette.grey[100], 0.7)} !important`,
                    },
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'transparent !important',
                    },
                    '&:hover': {
                      backgroundColor: `${alpha(theme.palette.action.hover, 0.08)} !important`,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DualTableComponent;