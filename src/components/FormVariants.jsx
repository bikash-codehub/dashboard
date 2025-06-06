import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Alert,
  Avatar,
  Chip,
  Tabs,
  Tab,
  useTheme,
  alpha,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
} from '@mui/material';
import {
  PersonAdd,
  ContactSupport,
  Poll,
  Work,
  Settings,
  Email,
  Phone,
  Person,
  Business,
  Star,
  Assignment,
  Security,
  Notifications,
  Palette,
} from '@mui/icons-material';
import Form from './Form';

const FormVariants = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (data, formType) => {
    console.log(`${formType} submitted:`, data);
    setSubmittedData({ type: formType, data });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  // 1. User Registration Form
  const userRegistrationFields = [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
      icon: <Person />,
      gridSize: { sm: 6 },
      validation: (value) => value && value.length < 2 ? 'Must be at least 2 characters' : null,
    },
    {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
      icon: <Person />,
      gridSize: { sm: 6 },
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      icon: <Email />,
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value && !emailRegex.test(value) ? 'Invalid email format' : null;
      },
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      icon: <Phone />,
      placeholder: '+1 (555) 123-4567',
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      helperText: 'Must be at least 8 characters with uppercase, lowercase, and number',
      validation: (value) => {
        if (!value || value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and number';
        return null;
      },
    },
    {
      id: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      required: true,
      validation: (value, allValues) => {
        return value !== allValues.password ? 'Passwords do not match' : null;
      },
    },
    {
      id: 'accountType',
      type: 'radio',
      label: 'Account Type',
      required: true,
      options: [
        { value: 'personal', label: 'Personal' },
        { value: 'business', label: 'Business' },
        { value: 'developer', label: 'Developer' },
      ],
    },
    {
      id: 'agreeToTerms',
      type: 'checkbox',
      label: 'I agree to the Terms of Service and Privacy Policy',
      required: true,
      validation: (value) => !value ? 'You must agree to the terms' : null,
    },
    {
      id: 'newsletter',
      type: 'checkbox',
      label: 'Subscribe to our newsletter for updates and promotions',
    },
  ];

  // 2. Contact/Support Form
  const contactSupportFields = [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
      icon: <Person />,
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      icon: <Email />,
    },
    {
      id: 'company',
      type: 'text',
      label: 'Company Name',
      icon: <Business />,
    },
    {
      id: 'subject',
      type: 'select',
      label: 'Subject',
      required: true,
      options: [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'billing', label: 'Billing Question' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'bug', label: 'Bug Report' },
      ],
    },
    {
      id: 'priority',
      type: 'radio',
      label: 'Priority Level',
      required: true,
      row: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' },
      ],
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
      rows: 6,
      helperText: 'Please provide as much detail as possible',
      validation: (value) => value && value.length < 10 ? 'Message must be at least 10 characters' : null,
    },
    {
      id: 'attachments',
      type: 'file',
      label: 'Attachments (Optional)',
      multiple: true,
      accept: '.pdf,.doc,.docx,.jpg,.png,.gif',
      helperText: 'Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF',
    },
    {
      id: 'followUp',
      type: 'switch',
      label: 'Allow follow-up emails for this inquiry',
    },
  ];

  // 3. Product Survey Form
  const productSurveyFields = [
    {
      id: 'customerType',
      type: 'select',
      label: 'I am a...',
      required: true,
      options: [
        { value: 'new', label: 'New Customer' },
        { value: 'existing', label: 'Existing Customer' },
        { value: 'potential', label: 'Potential Customer' },
      ],
    },
    {
      id: 'productUsage',
      type: 'checkboxGroup',
      label: 'Which products do you use?',
      options: [
        { value: 'dashboard', label: 'Analytics Dashboard' },
        { value: 'api', label: 'API Services' },
        { value: 'mobile', label: 'Mobile App' },
        { value: 'integrations', label: 'Third-party Integrations' },
      ],
    },
    {
      id: 'overallRating',
      type: 'rating',
      label: 'Overall Satisfaction',
      max: 5,
      required: true,
    },
    {
      id: 'easeOfUse',
      type: 'slider',
      label: 'Ease of Use',
      min: 1,
      max: 10,
      step: 1,
      marks: [
        { value: 1, label: 'Very Hard' },
        { value: 5, label: 'Neutral' },
        { value: 10, label: 'Very Easy' },
      ],
      helperText: 'Rate from 1 (Very Hard) to 10 (Very Easy)',
    },
    {
      id: 'features',
      type: 'checkboxGroup',
      label: 'Which features are most important to you?',
      options: [
        { value: 'reporting', label: 'Advanced Reporting' },
        { value: 'realtime', label: 'Real-time Analytics' },
        { value: 'collaboration', label: 'Team Collaboration' },
        { value: 'customization', label: 'Customization Options' },
        { value: 'security', label: 'Security Features' },
      ],
    },
    {
      id: 'improvements',
      type: 'textarea',
      label: 'What could we improve?',
      rows: 4,
      helperText: 'Your feedback helps us make better products',
    },
    {
      id: 'recommend',
      type: 'radio',
      label: 'Would you recommend our product to others?',
      required: true,
      options: [
        { value: 'definitely', label: 'Definitely' },
        { value: 'probably', label: 'Probably' },
        { value: 'maybe', label: 'Maybe' },
        { value: 'probably_not', label: 'Probably Not' },
        { value: 'definitely_not', label: 'Definitely Not' },
      ],
    },
  ];

  // 4. Job Application Form
  const jobApplicationFields = [
    {
      id: 'personalInfo',
      type: 'text',
      label: 'Full Name',
      required: true,
      icon: <Person />,
      gridSize: { sm: 6 },
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      icon: <Email />,
      gridSize: { sm: 6 },
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      required: true,
      icon: <Phone />,
      gridSize: { sm: 6 },
    },
    {
      id: 'position',
      type: 'select',
      label: 'Position Applied For',
      required: true,
      gridSize: { sm: 6 },
      options: [
        { value: 'frontend', label: 'Frontend Developer' },
        { value: 'backend', label: 'Backend Developer' },
        { value: 'fullstack', label: 'Full Stack Developer' },
        { value: 'designer', label: 'UI/UX Designer' },
        { value: 'manager', label: 'Project Manager' },
      ],
    },
    {
      id: 'experience',
      type: 'radio',
      label: 'Years of Experience',
      required: true,
      options: [
        { value: '0-1', label: '0-1 years' },
        { value: '2-3', label: '2-3 years' },
        { value: '4-6', label: '4-6 years' },
        { value: '7+', label: '7+ years' },
      ],
    },
    {
      id: 'skills',
      type: 'checkboxGroup',
      label: 'Technical Skills',
      options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'react', label: 'React' },
        { value: 'nodejs', label: 'Node.js' },
        { value: 'python', label: 'Python' },
        { value: 'sql', label: 'SQL' },
        { value: 'aws', label: 'AWS' },
      ],
    },
    {
      id: 'salary',
      type: 'number',
      label: 'Expected Salary (USD)',
      min: 30000,
      max: 200000,
      step: 5000,
      helperText: 'Annual salary expectation',
    },
    {
      id: 'availability',
      type: 'date',
      label: 'Available Start Date',
      required: true,
    },
    {
      id: 'remote',
      type: 'radio',
      label: 'Work Preference',
      required: true,
      row: true,
      options: [
        { value: 'remote', label: 'Remote' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'onsite', label: 'On-site' },
      ],
    },
    {
      id: 'coverLetter',
      type: 'textarea',
      label: 'Cover Letter',
      rows: 5,
      helperText: 'Tell us why you want to work with us',
    },
    {
      id: 'resume',
      type: 'file',
      label: 'Upload Resume',
      required: true,
      accept: '.pdf,.doc,.docx',
      helperText: 'PDF or DOC format only',
    },
  ];

  // 5. Settings/Profile Form
  const settingsProfileFields = [
    {
      id: 'displayName',
      type: 'text',
      label: 'Display Name',
      required: true,
      icon: <Person />,
      gridSize: { sm: 6 },
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      icon: <Email />,
      gridSize: { sm: 6 },
    },
    {
      id: 'bio',
      type: 'textarea',
      label: 'Bio',
      rows: 3,
      helperText: 'Tell others about yourself',
    },
    {
      id: 'timezone',
      type: 'select',
      label: 'Timezone',
      options: [
        { value: 'UTC', label: 'UTC' },
        { value: 'EST', label: 'Eastern Time' },
        { value: 'PST', label: 'Pacific Time' },
        { value: 'GMT', label: 'Greenwich Mean Time' },
      ],
    },
    {
      id: 'language',
      type: 'select',
      label: 'Language',
      options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' },
      ],
    },
    {
      id: 'theme',
      type: 'radio',
      label: 'Theme Preference',
      row: true,
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'auto', label: 'Auto' },
      ],
    },
    {
      id: 'notifications',
      type: 'checkboxGroup',
      label: 'Email Notifications',
      options: [
        { value: 'updates', label: 'Product Updates' },
        { value: 'security', label: 'Security Alerts' },
        { value: 'newsletter', label: 'Newsletter' },
        { value: 'marketing', label: 'Marketing' },
      ],
    },
    {
      id: 'twoFactor',
      type: 'switch',
      label: 'Enable Two-Factor Authentication',
    },
    {
      id: 'profileVisible',
      type: 'switch',
      label: 'Make Profile Public',
    },
    {
      id: 'dataSharing',
      type: 'switch',
      label: 'Allow Anonymous Usage Analytics',
    },
  ];

  const formVariants = [
    {
      id: 'registration',
      title: 'User Registration',
      description: 'Account creation with validation and security features',
      icon: <PersonAdd />,
      color: theme.palette.primary.main,
      fields: userRegistrationFields,
      initialValues: {
        accountType: 'personal',
        newsletter: true,
      },
    },
    {
      id: 'contact',
      title: 'Contact Support',
      description: 'Customer support and inquiry form',
      icon: <ContactSupport />,
      color: theme.palette.secondary.main,
      fields: contactSupportFields,
      initialValues: {
        subject: 'general',
        priority: 'medium',
        followUp: true,
      },
    },
    {
      id: 'survey',
      title: 'Product Survey',
      description: 'Feedback collection with ratings and preferences',
      icon: <Poll />,
      color: theme.palette.info.main,
      fields: productSurveyFields,
      initialValues: {
        customerType: 'existing',
        overallRating: 4,
        easeOfUse: 7,
      },
    },
    {
      id: 'job',
      title: 'Job Application',
      description: 'Complete application form with file uploads',
      icon: <Work />,
      color: theme.palette.success.main,
      fields: jobApplicationFields,
      initialValues: {
        experience: '2-3',
        remote: 'hybrid',
        availability: '2024-01-15',
      },
    },
    {
      id: 'settings',
      title: 'Profile Settings',
      description: 'User preferences and account configuration',
      icon: <Settings />,
      color: theme.palette.warning.main,
      fields: settingsProfileFields,
      initialValues: {
        displayName: 'John Doe',
        email: 'john.doe@example.com',
        timezone: 'EST',
        language: 'en',
        theme: 'auto',
        twoFactor: true,
        profileVisible: false,
        dataSharing: true,
      },
    },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const currentVariant = formVariants[activeTab];

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Form Variants Showcase
        </Typography>
        <Typography variant="body1" color="text.secondary">
          5 Different form styles and use cases demonstrating various field types and layouts
        </Typography>
      </Box>

      {/* Alert for submitted data */}
      {showAlert && submittedData && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowAlert(false)}>
          {submittedData.type} form submitted successfully! Check the console for details.
        </Alert>
      )}

      {/* Tabs for different form variants */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minHeight: 72,
              textTransform: 'none',
            },
          }}
        >
          {formVariants.map((variant, index) => (
            <Tab
              key={variant.id}
              icon={variant.icon}
              label={
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {variant.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {variant.description}
                  </Typography>
                </Box>
              }
              sx={{
                alignItems: 'flex-start',
                '& .MuiTab-iconWrapper': {
                  color: variant.color,
                  mb: 1,
                },
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Current Form */}
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: currentVariant.color }}>
              {currentVariant.icon}
            </Avatar>
          }
          title={currentVariant.title}
          subheader={currentVariant.description}
          action={
            <Chip
              label={`${currentVariant.fields.length} fields`}
              color="primary"
              size="small"
            />
          }
        />
        <CardContent>
          <Form
            fields={currentVariant.fields}
            initialValues={currentVariant.initialValues}
            onSubmit={(data) => handleSubmit(data, currentVariant.title)}
            submitLabel={`Submit ${currentVariant.title}`}
            showSubmit={true}
            showReset={true}
          />
        </CardContent>
      </Card>

      {/* Submitted Data Display */}
      {submittedData && (
        <Card sx={{ mt: 4 }}>
          <CardHeader 
            title={`${submittedData.type} - Submitted Data`}
            avatar={
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <Assignment />
              </Avatar>
            }
          />
          <CardContent>
            <Box
              component="pre"
              sx={{
                backgroundColor: alpha(theme.palette.success.main, 0.05),
                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                borderRadius: 1,
                p: 2,
                overflow: 'auto',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                maxHeight: 400,
              }}
            >
              {JSON.stringify(submittedData.data, null, 2)}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FormVariants;