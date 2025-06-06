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
  useTheme,
  alpha,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Settings,
} from '@mui/icons-material';
import Form from './Form';

const SimpleFormDemo = () => {
  const theme = useTheme();
  const [submittedData, setSubmittedData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Simple form fields that should definitely work
  const basicFields = [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
      icon: <Person />,
      gridSize: { sm: 6 },
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
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      icon: <Phone />,
      placeholder: '+1 (555) 123-4567',
    },
    {
      id: 'bio',
      type: 'textarea',
      label: 'Biography',
      rows: 4,
      helperText: 'Tell us about yourself',
    },
  ];

  const selectionFields = [
    {
      id: 'country',
      type: 'select',
      label: 'Country',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
      ],
      required: true,
    },
    {
      id: 'experience',
      type: 'radio',
      label: 'Experience Level',
      options: [
        { value: 'junior', label: 'Junior (0-2 years)' },
        { value: 'mid', label: 'Mid-level (2-5 years)' },
        { value: 'senior', label: 'Senior (5+ years)' },
      ],
      required: true,
    },
    {
      id: 'skills',
      type: 'checkboxGroup',
      label: 'Skills',
      options: [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'react', label: 'React' },
        { value: 'nodejs', label: 'Node.js' },
        { value: 'python', label: 'Python' },
      ],
    },
  ];

  const interactiveFields = [
    {
      id: 'notifications',
      type: 'switch',
      label: 'Enable Email Notifications',
    },
    {
      id: 'newsletter',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
    },
    {
      id: 'age',
      type: 'number',
      label: 'Age',
      min: 16,
      max: 120,
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      helperText: 'Must be at least 8 characters',
    },
  ];

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setShowAlert(false);
  };

  const initialValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    country: 'us',
    notifications: true,
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Form Component Demo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Interactive form with various field types and validation
        </Typography>
      </Box>

      {/* Alert for submitted data */}
      {showAlert && submittedData && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowAlert(false)}>
          Form submitted successfully! Check the console and JSON output below.
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Basic Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Basic Information"
              subheader="Text inputs, email, phone, and textarea"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <Person />
                </Avatar>
              }
            />
            <CardContent>
              <Form
                fields={basicFields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                showSubmit={false}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Selection Fields */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Selection & Interactive"
              subheader="Dropdowns, radio buttons, checkboxes, and switches"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  <Settings />
                </Avatar>
              }
            />
            <CardContent>
              <Form
                fields={[...selectionFields, ...interactiveFields]}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                showSubmit={false}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Complete Form */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Complete Form Example"
              subheader="All fields combined with validation and submission"
            />
            <CardContent>
              <Form
                fields={[
                  ...basicFields,
                  ...selectionFields.slice(0, 2),
                  ...interactiveFields.slice(0, 2),
                ]}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onReset={handleReset}
                showSubmit={true}
                showReset={true}
                submitLabel="Submit Application"
                resetLabel="Clear Form"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Submitted Data Display */}
      {submittedData && (
        <Card sx={{ mt: 4 }}>
          <CardHeader title="Submitted Data" />
          <CardContent>
            <Box
              component="pre"
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 1,
                p: 2,
                overflow: 'auto',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
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

export default SimpleFormDemo;