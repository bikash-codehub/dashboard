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
} from '@mui/material';
import {
  Send,
  Psychology,
  TrendingUp,
  Assessment,
  Insights,
  AutoAwesome,
  DataUsage,
} from '@mui/icons-material';

// Mock AI data sections
const defaultSections = [
  {
    id: 'overview',
    title: 'Business Overview',
    icon: <Assessment />,
    content: `Based on current data analysis, your business is showing strong growth patterns with a 23% increase in user engagement over the past quarter. Key performance indicators suggest optimal market positioning with room for strategic expansion in emerging segments.`,
  },
  {
    id: 'trends',
    title: 'Market Trends Analysis',
    icon: <TrendingUp />,
    content: `Current market trends indicate a shift towards mobile-first experiences, with 78% of user interactions happening on mobile devices. We recommend focusing on mobile optimization and progressive web app features to capitalize on this trend.`,
  },
  {
    id: 'insights',
    title: 'AI-Powered Insights',
    icon: <Insights />,
    content: `Machine learning algorithms have identified three key opportunities: 1) Customer retention can be improved by 15% through personalized onboarding, 2) Revenue optimization through dynamic pricing strategies, 3) Operational efficiency gains through automated workflow integration.`,
  },
  {
    id: 'recommendations',
    title: 'Strategic Recommendations',
    icon: <Psychology />,
    content: `Based on comprehensive data analysis, we recommend implementing a phased approach: Phase 1 - Enhance user experience through UI/UX improvements, Phase 2 - Integrate advanced analytics tracking, Phase 3 - Deploy AI-driven personalization features to increase conversion rates by an estimated 18-25%.`,
  },
];

const LoadingSkeleton = () => (
  <Card sx={{ mb: 3, backgroundColor: 'background.paper', borderRadius: 3 }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1.5 }} />
        <Skeleton variant="text" width="30%" height={32} />
      </Box>
      <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="85%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={20} />
    </CardContent>
  </Card>
);

const SectionCard = ({ section, index, isNew = false }) => {
  const theme = useTheme();
  
  return (
    <Grow
      in={true}
      timeout={500 + index * 200}
      style={{ transformOrigin: '0 0 0' }}
    >
      <Card
        sx={{
          mb: 3,
          backgroundColor: 'background.paper',
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
          ...(isNew && {
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
          }),
        }}
      >
        {isNew && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: 'white',
              px: 2,
              py: 0.5,
              borderBottomLeftRadius: 2,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            New Response
          </Box>
        )}
        
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {section.icon}
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: '1.1rem',
              }}
            >
              {section.title}
            </Typography>
            {isNew && (
              <Chip
                label="AI Generated"
                size="small"
                icon={<AutoAwesome sx={{ fontSize: '0.9rem' }} />}
                sx={{
                  ml: 'auto',
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  color: theme.palette.secondary.main,
                  fontWeight: 500,
                }}
              />
            )}
          </Box>
          
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              color: theme.palette.text.secondary,
              fontSize: '0.95rem',
            }}
          >
            {section.content}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );
};

const AIAnalytics = () => {
  const theme = useTheme();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStages, setLoadingStages] = useState([]);
  const queryInputRef = useRef(null);
  const sectionsEndRef = useRef(null);

  // Simulate AI content loading on component mount
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      
      // Simulate loading each section progressively
      for (let i = 0; i < defaultSections.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSections(prev => [...prev, { ...defaultSections[i], timestamp: Date.now() }]);
        setLoadingStages(prev => [...prev, i]);
      }
      
      setLoading(false);
    };

    loadContent();
  }, []);

  // Scroll to bottom when new content is added
  useEffect(() => {
    if (sectionsEndRef.current && sections.length > 0) {
      // Add a small delay to ensure the new content is rendered
      setTimeout(() => {
        sectionsEndRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'end'
        });
      }, 100);
    }
  }, [sections]);

  const handleQuerySubmit = async () => {
    if (!query.trim() || isGenerating) return;

    setIsGenerating(true);
    const userQuery = query;
    setQuery('');

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock response based on query
    const generateResponse = (query) => {
      const responses = {
        default: `Based on your query "${query}", our AI analysis reveals several key insights: The data patterns suggest implementing targeted strategies could yield significant improvements. We recommend focusing on data-driven decision making to optimize performance across all metrics.`,
        revenue: `Revenue analysis indicates strong potential for growth through strategic pricing optimization and customer segmentation. Current trends show a 15% opportunity for revenue increase through personalized offerings and improved conversion funnels.`,
        users: `User behavior analysis reveals engagement patterns that suggest opportunities for retention improvement. Implementing personalized user experiences and enhanced onboarding could increase user lifetime value by approximately 22%.`,
        performance: `Performance metrics indicate optimal system efficiency with room for strategic enhancements. Key bottlenecks have been identified in user workflow processes, with recommended optimizations that could improve overall performance by 18%.`,
      };

      const lowercaseQuery = query.toLowerCase();
      if (lowercaseQuery.includes('revenue') || lowercaseQuery.includes('sales')) {
        return responses.revenue;
      } else if (lowercaseQuery.includes('user') || lowercaseQuery.includes('customer')) {
        return responses.users;
      } else if (lowercaseQuery.includes('performance') || lowercaseQuery.includes('speed')) {
        return responses.performance;
      }
      return responses.default;
    };

    const newSection = {
      id: `query-${Date.now()}`,
      title: `AI Response: ${userQuery}`,
      icon: <AutoAwesome />,
      content: generateResponse(userQuery),
      timestamp: Date.now(),
      isNew: true,
      isUserQuery: true,
    };

    // Add new section at the bottom
    setSections(prev => [...prev, newSection]);
    setIsGenerating(false);
    
    // Refocus the input after response is generated
    setTimeout(() => {
      if (queryInputRef.current) {
        queryInputRef.current.focus();
      }
    }, 500);
  };

  const handleKeyPress = (event) => {
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
          <Box
            sx={{
              p: 1.5,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              mr: 2,
            }}
          >
            <DataUsage sx={{ fontSize: '2rem' }} />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              AI Analytics Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Get intelligent insights and analytics powered by artificial intelligence
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ opacity: 0.6 }} />
      </Box>

      {/* Content Sections */}
      <Box sx={{ mb: 4 }}>
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            {section.isUserQuery && (
              <Box sx={{ mb: 3, mt: 4 }}>
                <Divider sx={{ mb: 2 }}>
                  <Chip
                    label="New AI Response"
                    size="small"
                    icon={<AutoAwesome sx={{ fontSize: '0.9rem' }} />}
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                  />
                </Divider>
              </Box>
            )}
            <SectionCard
              section={section}
              index={index}
              isNew={section.isNew}
            />
          </React.Fragment>
        ))}

        {/* Loading skeletons */}
        {loading && (
          <Box>
            {Array.from({ length: defaultSections.length - sections.length }).map((_, index) => (
              <Fade in={true} timeout={300} key={`loading-${index}`}>
                <div>
                  <LoadingSkeleton />
                </div>
              </Fade>
            ))}
          </Box>
        )}
      </Box>

      {/* Query Input Section */}
      <Card
        sx={{
          position: 'sticky',
          bottom: 0,
          zIndex: 100,
          backgroundColor: 'background.paper',
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Psychology sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Ask AI Assistant
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
            <TextField
              ref={queryInputRef}
              fullWidth
              multiline
              maxRows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your data, trends, or business insights..."
              disabled={isGenerating}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                },
              }}
            />
            
            <IconButton
              onClick={handleQuerySubmit}
              disabled={!query.trim() || isGenerating}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                width: 48,
                height: 48,
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
          
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              display: 'block',
              color: theme.palette.text.secondary,
            }}
          >
            Press Enter to send • Ask about revenue, users, performance, or any business metrics
          </Typography>
        </CardContent>
      </Card>

      <div ref={sectionsEndRef} />
    </Box>
  );
};

export default AIAnalytics;