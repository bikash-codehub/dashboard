import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Alert,
  Avatar,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import {
  NotificationsActive,
  Send,
  Person,
  Group,
  Chat,
  Comment,
} from '@mui/icons-material';
import Form from './Form';

const EngageTeamForm = () => {
  const theme = useTheme();
  const [submittedData, setSubmittedData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample data for autocomplete fields
  const teamMembers = [
    { value: 'john.doe', label: 'John Doe - Engineering Lead' },
    { value: 'jane.smith', label: 'Jane Smith - Product Manager' },
    { value: 'mike.johnson', label: 'Mike Johnson - DevOps Engineer' },
    { value: 'sarah.wilson', label: 'Sarah Wilson - QA Lead' },
    { value: 'david.brown', label: 'David Brown - Frontend Developer' },
    { value: 'lisa.garcia', label: 'Lisa Garcia - Backend Developer' },
    { value: 'tom.anderson', label: 'Tom Anderson - UI/UX Designer' },
    { value: 'amy.chen', label: 'Amy Chen - Data Analyst' },
    { value: 'robert.taylor', label: 'Robert Taylor - Security Engineer' },
    { value: 'maria.rodriguez', label: 'Maria Rodriguez - Technical Writer' },
  ];

  const teams = [
    { value: 'engineering', label: 'Engineering Team' },
    { value: 'product', label: 'Product Team' },
    { value: 'design', label: 'Design Team' },
    { value: 'qa', label: 'QA Team' },
    { value: 'devops', label: 'DevOps Team' },
    { value: 'data', label: 'Data Team' },
    { value: 'security', label: 'Security Team' },
    { value: 'support', label: 'Support Team' },
    { value: 'marketing', label: 'Marketing Team' },
    { value: 'sales', label: 'Sales Team' },
  ];

  // Combine team members and teams for the "To" field
  const recipients = [
    ...teamMembers,
    ...teams.map(team => ({ ...team, label: `📧 ${team.label}` })),
  ];

  // Form field definitions
  const engageTeamFields = [
    {
      id: 'sendBy',
      type: 'autocomplete',
      label: 'Send By',
      options: teamMembers,
      helperText: 'Select who is sending this notification',
      icon: <Person />,
    },
    {
      id: 'to',
      type: 'autocomplete',
      label: 'To',
      multiple: true,
      options: recipients,
      helperText: 'Select team members or teams to notify',
      icon: <Group />,
    },
    {
      id: 'channel',
      type: 'select',
      label: 'Channel',
      options: [
        { value: 'xmatter', label: 'Xmatter' },
        { value: 'slack', label: 'Slack' },
        { value: 'email', label: 'Email' },
        { value: 'msteams', label: 'MS Teams' },
      ],
      helperText: 'Choose the communication channel',
      icon: <Chat />,
    },
    {
      id: 'comments',
      type: 'textarea',
      label: 'Comments',
      rows: 6,
      helperText: 'Describe the issue and what help you need from the team',
      placeholder: 'Please provide details about the issue you need help with...',
    },
  ];

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Engage Team notification sent:', data);
      setSubmittedData(data);
      setShowAlert(true);
      
      // Auto-hide alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
      
    } catch (error) {
      console.error('Failed to send notification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setShowAlert(false);
  };

  // Initial values with current user pre-selected
  const initialValues = {
    sendBy: teamMembers[0], // Default to first user (in real app, this would be current user)
    channel: 'slack', // Default to Slack
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: alpha(theme.palette.warning.main, 0.1),
              color: theme.palette.warning.main,
              mr: 2,
            }}
          >
            <NotificationsActive sx={{ fontSize: '2rem' }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Engage Team
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Send notifications to team members for issue resolution and collaboration
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Success Alert */}
      {showAlert && submittedData && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          onClose={() => setShowAlert(false)}
          action={
            <Button color="inherit" size="small">
              View Sent
            </Button>
          }
        >
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Notification sent successfully!
            </Typography>
            <Typography variant="body2">
              Your message has been sent via {submittedData.channel ? submittedData.channel.toUpperCase() : 'UNKNOWN'} to{' '}
              {Array.isArray(submittedData.to) 
                ? `${submittedData.to.length} recipient(s)`
                : submittedData.to ? '1 recipient' : '0 recipients'
              }
            </Typography>
          </Box>
        </Alert>
      )}

      {/* Main Form */}
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
              <Send />
            </Avatar>
          }
          title="Send Team Notification"
          subheader="Notify team members about issues that need their attention"
        />
        <CardContent>
          <Form
            fields={engageTeamFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onReset={handleReset}
            showSubmit={true}
            showReset={true}
            submitLabel={isSubmitting ? "Sending..." : "Send Notification"}
            resetLabel="Clear Form"
            disabled={isSubmitting}
            loading={isSubmitting}
          />
        </CardContent>
      </Card>

      {/* Submitted Data Preview */}
      {submittedData && (
        <Card sx={{ mt: 4 }}>
          <CardHeader 
            title="Notification Details"
            avatar={
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <Comment />
              </Avatar>
            }
          />
          <CardContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Summary:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    FROM
                  </Typography>
                  <Typography variant="body2">
                    {submittedData.sendBy?.label || submittedData.sendBy}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    TO
                  </Typography>
                  <Typography variant="body2">
                    {Array.isArray(submittedData.to) && submittedData.to.length > 0
                      ? submittedData.to.map(recipient => recipient?.label || recipient || 'Unknown').join(', ')
                      : submittedData.to?.label || submittedData.to || 'No recipients'
                    }
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    CHANNEL
                  </Typography>
                  <Typography variant="body2" sx={{ textTransform: 'uppercase' }}>
                    {submittedData.channel}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  MESSAGE
                </Typography>
                <Typography variant="body2" sx={{ 
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                  p: 2,
                  borderRadius: 1,
                  mt: 0.5,
                  border: `1px solid ${theme.palette.divider}`,
                }}>
                  {submittedData.comments}
                </Typography>
              </Box>
            </Box>
            
            <Box
              component="pre"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 1,
                p: 2,
                overflow: 'auto',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                maxHeight: 200,
              }}
            >
              {JSON.stringify(submittedData, null, 2)}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default EngageTeamForm;