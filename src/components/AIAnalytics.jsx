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
  List,
  ListItem,
  ListItemText,
  Link,
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

// Content renderer component for handling text and lists
const ContentRenderer = ({ content, theme }) => {
  // Function to parse bold text formatting and links
  const parseTextFormatting = (text) => {
    // Combined regex to split by bold patterns and URLs
    const combinedRegex = /(\*\*[^*]+\*\*|__[^_]+__|https?:\/\/[^\s]+)/g;
    const parts = text.split(combinedRegex);
    
    return parts.map((part, index) => {
      // Bold text with **text**
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Typography
            key={index}
            component="span"
            sx={{ fontWeight: 700, color: theme.palette.text.primary }}
          >
            {part.slice(2, -2)}
          </Typography>
        );
      } 
      // Bold text with __text__
      else if (part.startsWith('__') && part.endsWith('__')) {
        return (
          <Typography
            key={index}
            component="span"
            sx={{ fontWeight: 700, color: theme.palette.text.primary }}
          >
            {part.slice(2, -2)}
          </Typography>
        );
      }
      // Direct URLs (http:// or https://)
      else if (part.match(/^https?:\/\/[^\s]+$/)) {
        return (
          <Link
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: 'underline',
              wordBreak: 'break-all',
              '&:hover': {
                color: theme.palette.primary.dark,
                textDecoration: 'underline',
              },
            }}
          >
            {part}
          </Link>
        );
      }
      
      return part;
    });
  };

  const parseContent = (text) => {
    // Split content by double newlines to separate paragraphs and lists
    const blocks = text.split('\n\n').filter(block => block.trim());
    
    return blocks.map((block, blockIndex) => {
      const trimmedBlock = block.trim();
      
      // Check if block is an ordered list (starts with "1." or similar)
      if (/^\d+\.\s/.test(trimmedBlock)) {
        return parseOrderedList(trimmedBlock, blockIndex);
      }
      
      // Check if block is an unordered list (starts with "•" or "-")
      if (/^[•\-]\s/.test(trimmedBlock)) {
        return parseUnorderedList(trimmedBlock, blockIndex);
      }
      
      // Regular paragraph
      return (
        <Typography
          key={`paragraph-${blockIndex}`}
          variant="body1"
          sx={{
            lineHeight: 1.7,
            color: theme.palette.text.secondary,
            fontSize: '0.95rem',
            mb: blockIndex < blocks.length - 1 ? 2 : 0,
          }}
        >
          {parseTextFormatting(trimmedBlock)}
        </Typography>
      );
    });
  };

  const parseOrderedList = (listText, blockIndex) => {
    const lines = listText.split('\n').map(line => line.trim()).filter(line => line);
    const listItems = [];
    let currentItem = null;
    let currentSubItems = [];

    lines.forEach((line) => {
      // Main list item (starts with number)
      if (/^\d+\.\s/.test(line)) {
        // Save previous item if exists
        if (currentItem) {
          listItems.push({
            text: currentItem,
            subItems: [...currentSubItems]
          });
        }
        
        currentItem = line.replace(/^\d+\.\s/, '');
        currentSubItems = [];
      }
      // Sub-item (starts with letter or indented number)
      else if (/^\s*[a-z]\)\s/.test(line) || /^\s*\d+\.\d+\.\s/.test(line) || /^\s*-\s/.test(line)) {
        currentSubItems.push(line.replace(/^\s*([a-z]\)|(\d+\.\d+\.)|(-\s))/, '').trim());
      }
      // Continuation of current item
      else if (currentItem && line) {
        currentItem += ' ' + line;
      }
    });

    // Add the last item
    if (currentItem) {
      listItems.push({
        text: currentItem,
        subItems: [...currentSubItems]
      });
    }

    return (
      <Box key={`list-${blockIndex}`} sx={{ mb: 2 }}>
        <List sx={{ py: 0 }}>
          {listItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  py: 1,
                  px: 0,
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Typography
                    component="span"
                    sx={{
                      minWidth: '24px',
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      mt: 0.1,
                    }}
                  >
                    {index + 1}.
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.6,
                        color: theme.palette.text.secondary,
                        fontSize: '0.95rem',
                        mb: item.subItems.length > 0 ? 1 : 0,
                      }}
                    >
                      {parseTextFormatting(item.text)}
                    </Typography>
                    
                    {/* Nested sub-items */}
                    {item.subItems.length > 0 && (
                      <List sx={{ py: 0, pl: 2 }}>
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItem key={subIndex} sx={{ py: 0.5, px: 0 }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                              <Typography
                                component="span"
                                sx={{
                                  minWidth: '20px',
                                  color: theme.palette.secondary.main,
                                  fontWeight: 500,
                                  fontSize: '0.9rem',
                                  mt: 0.1,
                                }}
                              >
                                {String.fromCharCode(97 + subIndex)}.
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  lineHeight: 1.5,
                                  color: theme.palette.text.secondary,
                                  fontSize: '0.9rem',
                                  flex: 1,
                                }}
                              >
                                {parseTextFormatting(subItem)}
                              </Typography>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
  };

  const parseUnorderedList = (listText, blockIndex) => {
    const lines = listText.split('\n').map(line => line.trim()).filter(line => line);
    const listItems = [];
    let currentItem = null;
    let currentSubItems = [];

    lines.forEach((line) => {
      // Main list item (starts with bullet)
      if (/^[•\-]\s/.test(line)) {
        // Save previous item if exists
        if (currentItem) {
          listItems.push({
            text: currentItem,
            subItems: [...currentSubItems]
          });
        }
        
        currentItem = line.replace(/^[•\-]\s/, '');
        currentSubItems = [];
      }
      // Sub-item (indented with bullet or dash)
      else if (/^\s+[•\-]\s/.test(line)) {
        currentSubItems.push(line.replace(/^\s+[•\-]\s/, '').trim());
      }
      // Continuation of current item
      else if (currentItem && line) {
        currentItem += ' ' + line;
      }
    });

    // Add the last item
    if (currentItem) {
      listItems.push({
        text: currentItem,
        subItems: [...currentSubItems]
      });
    }

    return (
      <Box key={`unordered-list-${blockIndex}`} sx={{ mb: 2 }}>
        <List sx={{ py: 0 }}>
          {listItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  py: 1,
                  px: 0,
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Typography
                    component="span"
                    sx={{
                      minWidth: '20px',
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      fontSize: '1.2rem',
                      mt: -0.2,
                      lineHeight: 1,
                    }}
                  >
                    •
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.6,
                        color: theme.palette.text.secondary,
                        fontSize: '0.95rem',
                        mb: item.subItems.length > 0 ? 1 : 0,
                      }}
                    >
                      {parseTextFormatting(item.text)}
                    </Typography>
                    
                    {/* Nested sub-items */}
                    {item.subItems.length > 0 && (
                      <List sx={{ py: 0, pl: 2 }}>
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItem key={subIndex} sx={{ py: 0.5, px: 0 }}>
                            <Box sx={{ display: 'flex', width: '100%' }}>
                              <Typography
                                component="span"
                                sx={{
                                  minWidth: '16px',
                                  color: theme.palette.secondary.main,
                                  fontWeight: 500,
                                  fontSize: '1rem',
                                  mt: -0.1,
                                  lineHeight: 1,
                                }}
                              >
                                ◦
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  lineHeight: 1.5,
                                  color: theme.palette.text.secondary,
                                  fontSize: '0.9rem',
                                  flex: 1,
                                }}
                              >
                                {parseTextFormatting(subItem)}
                              </Typography>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
  };

  return <Box>{parseContent(content)}</Box>;
};

// Mock AI data sections
const defaultSections = [
  {
    id: 'overview',
    title: 'Business Overview',
    icon: <Assessment />,
    content: `Based on current data analysis, your business is showing **strong growth patterns** with a **23% increase** in user engagement over the past quarter. Key performance indicators suggest optimal market positioning with room for strategic expansion in emerging segments.

**Key Highlights:**

• Revenue growth exceeded expectations by 15%
• Customer satisfaction scores reached **4.7/5.0**
• Market share expanded in **3 key demographics**
  • Millennial professionals (25-35 age group)
  • Small business owners
  • Enterprise decision makers
• **Competitive advantage** maintained through innovation
• View detailed analytics at https://analytics.example.com
• Download full report: https://reports.example.com/business-overview.pdf`,
  },
  {
    id: 'trends',
    title: 'Market Trends Analysis',
    icon: <TrendingUp />,
    content: `Current market trends indicate a shift towards mobile-first experiences, with 78% of user interactions happening on mobile devices.

Key trends identified:

1. Mobile-first user behavior increasing by 45% quarterly
2. Voice search adoption growing in enterprise environments
3. AI-powered personalization becoming standard expectation
   a) Real-time content recommendations
   b) Dynamic user interface adaptation
   c) Predictive user journey optimization
4. Sustainability metrics influencing B2B purchasing decisions`,
  },
  {
    id: 'insights',
    title: 'AI-Powered Insights',
    icon: <Insights />,
    content: `Machine learning algorithms have identified several key opportunities for business optimization:

1. Customer retention can be improved by 15% through personalized onboarding
   a) Implement progressive user education
   b) Create role-based dashboard customization
   c) Deploy intelligent feature recommendations
2. Revenue optimization through dynamic pricing strategies
   a) Real-time competitor price analysis
   b) Demand-based pricing adjustments
   c) Customer segment-specific offers
3. Operational efficiency gains through automated workflow integration
   a) AI-powered task prioritization
   b) Intelligent resource allocation
   c) Predictive maintenance scheduling`,
  },
  {
    id: 'recommendations',
    title: 'Strategic Recommendations',
    icon: <Psychology />,
    content: `Based on comprehensive data analysis, we recommend implementing a phased approach:

1. Phase 1: Foundation Enhancement (Months 1-3)
   a) Enhance user experience through UI/UX improvements
   b) Implement advanced analytics tracking
   c) Establish baseline performance metrics
2. Phase 2: Intelligence Integration (Months 4-6)
   a) Deploy AI-driven personalization features
   b) Implement predictive analytics dashboard
   c) Launch automated customer segmentation
3. Phase 3: Optimization & Scale (Months 7-12)
   a) Advanced machine learning model deployment
   b) Real-time decision engine implementation
   c) Cross-platform integration completion

Expected outcome: 18-25% increase in conversion rates with 30% improvement in operational efficiency.`,
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
          
          <ContentRenderer content={section.content} theme={theme} />
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
        default: `Based on your query "${query}", our AI analysis reveals several key insights and actionable recommendations:

1. Data Pattern Analysis
   a) Historical trend identification shows cyclical patterns
   b) Anomaly detection reveals 3 optimization opportunities
   c) Predictive modeling suggests 15% improvement potential
2. Strategic Implementation Framework
   a) Short-term tactical adjustments (1-3 months)
   b) Medium-term strategic initiatives (3-6 months)
   c) Long-term transformation goals (6-12 months)
3. Expected Outcomes
   a) Performance optimization: 12-18% improvement
   b) Cost efficiency: 8-12% reduction
   c) User satisfaction: 20-25% increase`,
        
        revenue: `Revenue analysis indicates strong potential for growth through strategic optimization:

1. Pricing Strategy Optimization
   a) Dynamic pricing model implementation
   b) Customer segment-based pricing tiers
   c) Competitive price positioning analysis
2. Customer Segmentation & Targeting
   a) High-value customer identification (top 20% generate 80% revenue)
   b) Cross-selling opportunity mapping
   c) Retention-focused revenue strategies
3. Conversion Funnel Enhancement
   a) Lead qualification scoring system
   b) Personalized user journey optimization
   c) Automated follow-up sequences

Expected revenue increase: 15-22% within 6 months through targeted implementation.`,
        
        users: `User behavior analysis reveals significant opportunities for engagement optimization:

1. User Retention Strategies
   a) Onboarding experience personalization
   b) Feature adoption guidance systems
   c) Proactive user support mechanisms
2. Engagement Enhancement Initiatives
   a) Gamification elements for increased interaction
   b) Social features for community building
   c) Personalized content recommendation engine
3. Lifecycle Value Optimization
   a) Early warning system for churn prevention
   b) Upgrade path optimization
   c) Loyalty program implementation

User lifetime value improvement: 22-28% through systematic engagement strategies.`,
        
        performance: `Performance metrics analysis identifies key optimization opportunities:

1. System Performance Enhancement
   a) Database query optimization (reduce load time by 40%)
   b) Caching strategy implementation
   c) CDN optimization for global performance
2. User Workflow Optimization
   a) Process automation for repetitive tasks
   b) Intelligent task prioritization
   c) Real-time collaboration tools
3. Infrastructure Scaling
   a) Auto-scaling configuration for peak loads
   b) Microservices architecture optimization
   c) Performance monitoring and alerting

Overall performance improvement: 18-25% across all key metrics.`,
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
              onKeyDown={handleKeyPress}
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