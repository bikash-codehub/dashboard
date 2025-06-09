import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import ReactECharts from 'echarts-for-react';

const TrendCard = ({ title, description, data, primaryDataKey, primaryColor, secondaryDataKey, secondaryColor, primaryName, secondaryName }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#e0e0e0',
      borderWidth: 1,
      borderRadius: 8,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      textStyle: {
        fontSize: 12,
        color: '#333'
      }
    },
    legend: {
      data: [primaryName, secondaryName],
      bottom: 10,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: 30,
      right: 30,
      top: 20,
      bottom: 50,
      containLabel: false
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 12,
        color: '#666'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 10,
        color: '#666'
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: primaryName,
        type: 'line',
        data: data.map(item => item[primaryDataKey]),
        smooth: true,
        lineStyle: {
          color: primaryColor,
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: primaryColor + '4D' // 30% opacity
              },
              {
                offset: 1,
                color: primaryColor + '00' // 0% opacity
              }
            ]
          }
        },
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: {
          color: primaryColor
        }
      },
      {
        name: secondaryName,
        type: 'line',
        data: data.map(item => item[secondaryDataKey]),
        smooth: true,
        lineStyle: {
          color: secondaryColor,
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: secondaryColor + '33' // 20% opacity
              },
              {
                offset: 1,
                color: secondaryColor + '00' // 0% opacity
              }
            ]
          }
        },
        symbol: 'circle',
        symbolSize: 4,
        itemStyle: {
          color: secondaryColor
        }
      }
    ]
  };

  return (
    <Card sx={{ 
      height: 400, 
      border: 1, 
      borderColor: 'divider',
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-2px)',
        transition: 'all 0.3s ease-in-out'
      }
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            height: 40,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {description}
        </Typography>
        <Box sx={{ height: 300 }}>
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrendCard;