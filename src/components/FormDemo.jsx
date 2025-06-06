import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Alert,
  Divider,
  Chip,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  AttachMoney,
  Percent,
  Link,
  CalendarToday,
  AccessTime,
  ColorLens,
  CloudUpload,
  Star,
  Settings,
  ViewModule,
  ViewList,
  TextFormat,
  FormatBold,
  FormatItalic,
} from '@mui/icons-material';
import Form from './Form';

const FormDemo = () => {
  const theme = useTheme();
  const [submittedData, setSubmittedData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Sample options for various fields
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
  ];

  const skillsOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'sql', label: 'SQL' },
    { value: 'aws', label: 'AWS' },
  ];

  const hobbyOptions = [
    { value: 'reading', label: 'Reading' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'traveling', label: 'Traveling' },
    { value: 'photography', label: 'Photography' },
    { value: 'music', label: 'Music' },
  ];

  const experienceOptions = [
    { value: 'junior', label: 'Junior (0-2 years)' },
    { value: 'mid', label: 'Mid-level (2-5 years)' },
    { value: 'senior', label: 'Senior (5-8 years)' },
    { value: 'lead', label: 'Lead (8+ years)' },
  ];

  const formatOptions = [
    { value: 'bold', label: 'Bold', icon: <FormatBold /> },
    { value: 'italic', label: 'Italic', icon: <FormatItalic /> },
    { value: 'underline', label: 'Underline', icon: <TextFormat /> },
  ];

  const viewOptions = [
    { value: 'grid', label: 'Grid', icon: <ViewModule /> },
    { value: 'list', label: 'List', icon: <ViewList /> },
  ];

  // Basic Information Fields
  const basicFields = [
    {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
      icon: <Person />,
      gridSize: { sm: 6 },
      validation: (value) => {
        if (value && value.length < 2) return 'First name must be at least 2 characters';
        return null;
      },
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
      gridSize: { sm: 6 },
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
      },
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      icon: <Phone />,
      gridSize: { sm: 6 },
      placeholder: '+1 (555) 123-4567',
    },
    {
      id: 'website',
      type: 'url',
      label: 'Website',
      icon: <Link />,
      placeholder: 'https://example.com',
    },
    {
      id: 'bio',
      type: 'textarea',
      label: 'Biography',
      rows: 4,
      helperText: 'Tell us about yourself',
    },
  ];

  // Advanced Input Fields
  const advancedFields = [
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      required: true,
      helperText: 'Must be at least 8 characters',
      validation: (value) => {
        if (value && value.length < 8) return 'Password must be at least 8 characters';
        return null;
      },
    },
    {
      id: 'age',
      type: 'number',
      label: 'Age',
      min: 16,
      max: 120,
      gridSize: { sm: 4 },
    },
    {
      id: 'salary',
      type: 'number',
      label: 'Expected Salary',
      icon: <AttachMoney />,
      gridSize: { sm: 4 },
      step: 1000,
    },
    {
      id: 'experience',
      type: 'number',
      label: 'Years of Experience',
      min: 0,
      max: 50,
      gridSize: { sm: 4 },
    },
  ];

  // Selection Fields
  const selectionFields = [
    {
      id: 'country',
      type: 'select',
      label: 'Country',
      options: countryOptions,
      required: true,
      gridSize: { sm: 6 },
    },
    {
      id: 'experienceLevel',
      type: 'radio',
      label: 'Experience Level',
      options: experienceOptions,
      required: true,
      gridSize: { sm: 6 },
    },
    {
      id: 'skills',
      type: 'multiselect',
      label: 'Skills',
      options: skillsOptions,
      helperText: 'Select all that apply',
    },
    {
      id: 'autocompleteSkills',
      type: 'autocomplete',
      label: 'Skills (Autocomplete)',
      options: skillsOptions,
      multiple: true,
      freeSolo: true,
      helperText: 'Type to search or add custom skills',
    },
    {
      id: 'hobbies',
      type: 'checkboxGroup',
      label: 'Hobbies & Interests',
      options: hobbyOptions,
    },
  ];

  // Interactive Fields
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
      id: 'rating',
      type: 'rating',
      label: 'Rate your experience',
      max: 5,
    },
    {
      id: 'satisfaction',
      type: 'slider',
      label: 'Satisfaction Level',
      min: 0,
      max: 100,
      step: 10,
      marks: [
        { value: 0, label: '0%' },
        { value: 50, label: '50%' },
        { value: 100, label: '100%' },
      ],
      helperText: 'How satisfied are you with our service?',
    },
    {
      id: 'textFormat',
      type: 'toggle',
      label: 'Text Formatting',
      options: formatOptions,
      multiple: true,
      gridSize: { sm: 6 },
    },
    {
      id: 'viewMode',
      type: 'toggle',
      label: 'View Mode',
      options: viewOptions,
      gridSize: { sm: 6 },
    },
  ];

  // Date and File Fields
  const dateFileFields = [
    {
      id: 'birthDate',
      type: 'date',
      label: 'Birth Date',
      gridSize: { sm: 4 },
    },
    {
      id: 'meetingTime',
      type: 'time',
      label: 'Preferred Meeting Time',
      gridSize: { sm: 4 },
    },
    {
      id: 'appointment',
      type: 'datetime',
      label: 'Appointment Date & Time',
      gridSize: { sm: 4 },
    },
    {
      id: 'favoriteColor',
      type: 'color',
      label: 'Favorite Color',
      gridSize: { sm: 6 },
    },
    {
      id: 'resume',
      type: 'file',
      label: 'Upload Resume',
      accept: '.pdf,.doc,.docx',
      gridSize: { sm: 6 },
      helperText: 'PDF, DOC, or DOCX files only',
    },
    {
      id: 'portfolio',
      type: 'file',
      label: 'Portfolio Images',
      accept: 'image/*',
      multiple: true,
      helperText: 'Select multiple images',
    },
  ];

  const handleSubmit = (data) => {
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
    rating: 4,
    satisfaction: 70,
    favoriteColor: '#2563eb',
    birthDate: '1990-01-15',
    meetingTime: '14:30',
    appointment: '2024-12-25T15:30',
  };

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Form Component Demo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive showcase of all available form field types and configurations
        </Typography>
      </Box>

      {/* Alert for submitted data */}
      {showAlert && submittedData && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowAlert(false)}>
          Form submitted successfully! Check the console for submitted data.
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Basic Information"
              subheader="Text inputs, email, phone, URL, and textarea fields"
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

        {/* Advanced Inputs */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Advanced Inputs"
              subheader="Password, number fields with validation"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                  <Settings />
                </Avatar>
              }
            />
            <CardContent>
              <Form
                fields={advancedFields}
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
              title="Selection Fields"
              subheader="Dropdowns, radio buttons, checkboxes, and autocomplete"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                  <ViewModule />
                </Avatar>
              }
            />
            <CardContent>
              <Form
                fields={selectionFields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                showSubmit={false}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Interactive Elements */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Interactive Elements"
              subheader="Switches, sliders, ratings, and toggle buttons"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.warning.main }}>
                  <Star />
                </Avatar>
              }
            />
            <CardContent>
              <Form
                fields={interactiveFields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                showSubmit={false}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Date and File Fields */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Date & File Fields"
              subheader="Date pickers, time pickers, color picker, and file uploads"
              avatar={
                <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                  <CalendarToday />
                </Avatar>
              }
            />
            <CardContent>
              <Form
                fields={dateFileFields}
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
              action={
                <Chip
                  label="Interactive"
                  color="primary"
                  size="small"
                />
              }
            />
            <CardContent>
              <Form
                fields={[
                  ...basicFields,
                  { id: 'divider1', type: 'divider' },
                  ...advancedFields,
                  { id: 'divider2', type: 'divider' },
                  ...selectionFields.slice(0, 2),
                  ...interactiveFields.slice(0, 3),
                  ...dateFileFields.slice(0, 2),
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

export default FormDemo;