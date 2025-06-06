import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  IconButton,
  Skeleton,
  Fade,
  Grow,
  CircularProgress,
  Chip,
  Divider,
  useTheme,
  alpha,
  Grid,
  Paper,
  Avatar,
  Button,
  Stack,
} from '@mui/material';
import {
  Send,
  Psychology,
  TrendingUp,
  Assessment,
  DataUsage,
  Speed,
  Timeline,
  PieChart,
  BarChart,
  ShowChart,
} from '@mui/icons-material';

// Metrics data for cards
const metricsData = [
  {
    title: 'Revenue Growth',
    value: '+23.5%',
    description: 'vs last quarter',
    icon: <TrendingUp />,
    color: 'success.main',
    bgColor: 'success.light',
  },
  {
    title: 'User Engagement',
    value: '87.2%',
    description: 'active users',
    icon: <Speed />,
    color: 'primary.main',
    bgColor: 'primary.light',
  },
  {
    title: 'Conversion Rate',
    value: '4.8%',
    description: 'improved by 1.2%',
    icon: <Timeline />,
    color: 'warning.main',
    bgColor: 'warning.light',
  },
  {
    title: 'Customer Satisfaction',
    value: '9.1/10',
    description: 'based on reviews',
    icon: <Assessment />,
    color: 'info.main',
    bgColor: 'info.light',
  },
];

// AI Insights data
const insightsData = [
  {
    id: 1,
    category: 'Performance',
    title: 'Mobile Traffic Surge',
    description: 'Mobile users increased by 45% this month. Consider optimizing mobile experience further.',
    impact: 'High',
    confidence: 95,
    icon: <ShowChart />,
  },
  {
    id: 2,
    category: 'Revenue',
    title: 'Premium Plan Adoption',
    description: 'Premium subscriptions up 30%. Users value advanced analytics features most.',
    impact: 'Medium',
    confidence: 88,
    icon: <PieChart />,
  },
  {
    id: 3,
    category: 'User Behavior',
    title: 'Feature Usage Pattern',
    description: 'Dashboard customization feature shows 78% adoption rate among power users.',
    impact: 'Medium',
    confidence: 92,
    icon: <BarChart />,
  },
];

// Metric Card Component
const MetricCard = ({ metric, index }) => {
  const theme = useTheme();
  
  return (
    <Grow in={true} timeout={300 + index * 100}>
      <Card
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${alpha(theme.palette[metric.bgColor.split('.')[0]][metric.bgColor.split('.')[1]], 0.1)}, ${alpha(theme.palette[metric.bgColor.split('.')[0]][metric.bgColor.split('.')[1]], 0.05)})`,
          border: `1px solid ${alpha(theme.palette[metric.color.split('.')[0]][metric.color.split('.')[1]], 0.2)}`,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 25px ${alpha(theme.palette[metric.color.split('.')[0]][metric.color.split('.')[1]], 0.15)}`,
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                backgroundColor: theme.palette[metric.color.split('.')[0]][metric.color.split('.')[1]],
                color: 'white',
                width: 48,
                height: 48,
                mr: 2,
              }}
            >
              {metric.icon}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {metric.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {metric.description}
              </Typography>
            </Box>
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {metric.title}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};

// Insight Card Component
const InsightCard = ({ insight, index }) => {
  const theme = useTheme();
  
  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return theme.palette.error.main;
      case 'Medium': return theme.palette.warning.main;
      case 'Low': return theme.palette.success.main;
      default: return theme.palette.text.secondary;
    }
  };

  return (
    <Fade in={true} timeout={500 + index * 200}>
      <Card
        sx={{
          mb: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            borderColor: theme.palette.primary.main,
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Avatar
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                mr: 2,
                mt: 0.5,
              }}
            >
              {insight.icon}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Chip
                  label={insight.category}
                  size="small"
                  sx={{
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    mr: 1,
                  }}
                />
                <Chip
                  label={`${insight.impact} Impact`}
                  size="small"
                  sx={{
                    backgroundColor: alpha(getImpactColor(insight.impact), 0.1),
                    color: getImpactColor(insight.impact),
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {insight.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {insight.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  Confidence: {insight.confidence}%
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                >
                  View Details
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

// Chat Message Component
const ChatMessage = ({ message, isAI = false }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        mb: 3,
        flexDirection: isAI ? 'row' : 'row-reverse',
      }}
    >
      <Avatar
        sx={{
          backgroundColor: isAI ? theme.palette.primary.main : theme.palette.secondary.main,
          color: 'white',
          mx: 2,
        }}
      >
        {isAI ? <Psychology /> : <Typography>U</Typography>}
      </Avatar>
      <Paper
        sx={{
          p: 2,
          maxWidth: '70%',
          backgroundColor: isAI 
            ? alpha(theme.palette.primary.main, 0.05)
            : alpha(theme.palette.secondary.main, 0.05),
          border: `1px solid ${alpha(isAI ? theme.palette.primary.main : theme.palette.secondary.main, 0.2)}`,
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Paper>
    </Box>
  );
};

const AIAnalyticsV2 = () => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      message: "Hello! I'm your AI Analytics assistant. I can help you understand your business metrics, identify trends, and provide actionable insights. What would you like to know?",
      isAI: true,
    }
  ]);
  const [metricsLoaded, setMetricsLoaded] = useState(false);
  const [insightsLoaded, setInsightsLoaded] = useState(false);
  const queryInputRef = useRef(null);

  // Load metrics and insights progressively
  useEffect(() => {
    const timer1 = setTimeout(() => setMetricsLoaded(true), 500);
    const timer2 = setTimeout(() => setInsightsLoaded(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleQuerySubmit = async () => {
    if (!query.trim() || isGenerating) return;

    const userMessage = {
      id: Date.now(),
      message: query,
      isAI: false,
    };

    setChatMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);
    setQuery('');

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const aiResponse = {
      id: Date.now() + 1,
      message: `Based on your query "${userMessage.message}", I've analyzed your current data. Here are the key insights: Your metrics show strong performance with notable growth in user engagement. I recommend focusing on mobile optimization and premium feature promotion to maximize ROI.`,
      isAI: true,
    };

    setChatMessages(prev => [...prev, aiResponse]);
    setIsGenerating(false);
    
    if (queryInputRef.current) {
      queryInputRef.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleQuerySubmit();
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              mr: 2,
            }}
          >
            <DataUsage sx={{ fontSize: '2rem' }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              AI Analytics Hub
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Interactive dashboard with real-time insights and AI-powered analytics
            </Typography>
          </Box>
        </Box>
        <Divider />
      </Box>

      {/* Metrics Cards */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Key Performance Metrics
        </Typography>
        <Grid container spacing={3}>
          {metricsLoaded ? (
            metricsData.map((metric, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <MetricCard metric={metric} index={index} />
              </Grid>
            ))
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Card sx={{ height: 140 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
                      <Box>
                        <Skeleton variant="text" width={80} height={32} />
                        <Skeleton variant="text" width={100} height={20} />
                      </Box>
                    </Box>
                    <Skeleton variant="text" width={120} height={24} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {/* AI Insights */}
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            AI-Generated Insights
          </Typography>
          {insightsLoaded ? (
            insightsData.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2, mt: 0.5 }} />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', mb: 1 }}>
                        <Skeleton variant="rectangular" width={80} height={24} sx={{ mr: 1, borderRadius: 1 }} />
                        <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 1 }} />
                      </Box>
                      <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="100%" height={20} sx={{ mb: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton variant="text" width={100} height={16} />
                        <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>

        {/* AI Chat Interface */}
        <Grid item xs={12} lg={6}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            AI Assistant Chat
          </Typography>
          <Card sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
            {/* Chat Messages */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                p: 2,
                backgroundColor: alpha(theme.palette.background.default, 0.5),
              }}
            >
              {chatMessages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.message}
                  isAI={message.isAI}
                />
              ))}
              {isGenerating && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      mx: 2,
                    }}
                  >
                    <Psychology />
                  </Avatar>
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="text.secondary">
                        AI is thinking...
                      </Typography>
                    </Stack>
                  </Paper>
                </Box>
              )}
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  ref={queryInputRef}
                  fullWidth
                  size="small"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your analytics..."
                  disabled={isGenerating}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <IconButton
                  onClick={handleQuerySubmit}
                  disabled={!query.trim() || isGenerating}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    '&:disabled': {
                      backgroundColor: theme.palette.action.disabledBackground,
                    },
                  }}
                >
                  {isGenerating ? (
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                  ) : (
                    <Send />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIAnalyticsV2;