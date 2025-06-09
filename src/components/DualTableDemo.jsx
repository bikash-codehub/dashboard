import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import DualTableComponent from './DualTableComponent';

const DualTableDemo = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', department: 'Sales', status: 'Inactive', joinDate: '2022-11-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', department: 'HR', status: 'Active', joinDate: '2023-03-05' },
    { id: 5, name: 'David Brown', email: 'david@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-01-22' },
    { id: 6, name: 'Emma Davis', email: 'emma@example.com', department: 'Design', status: 'Active', joinDate: '2023-03-10' },
    { id: 7, name: 'James Miller', email: 'james@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-04-01' },
    { id: 8, name: 'Lisa Garcia', email: 'lisa@example.com', department: 'Marketing', status: 'Active', joinDate: '2023-04-15' },
    { id: 9, name: 'Robert Chen', email: 'robert@example.com', department: 'Sales', status: 'Active', joinDate: '2023-05-01' },
    { id: 10, name: 'Maria Rodriguez', email: 'maria@example.com', department: 'HR', status: 'Active', joinDate: '2023-05-10' },
    { id: 11, name: 'Alex Turner', email: 'alex@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-05-20' },
    { id: 12, name: 'Sophie Lee', email: 'sophie@example.com', department: 'Design', status: 'Active', joinDate: '2023-06-01' },
    { id: 13, name: 'Chris Anderson', email: 'chris@example.com', department: 'Marketing', status: 'Inactive', joinDate: '2022-12-01' },
    { id: 14, name: 'Amanda White', email: 'amanda@example.com', department: 'Sales', status: 'Active', joinDate: '2023-06-15' },
    { id: 15, name: 'Daniel Kim', email: 'daniel@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-07-01' },
    { id: 16, name: 'Rachel Green', email: 'rachel@example.com', department: 'HR', status: 'Active', joinDate: '2023-07-10' },
    { id: 17, name: 'Kevin Park', email: 'kevin@example.com', department: 'Design', status: 'Active', joinDate: '2023-07-20' },
    { id: 18, name: 'Nicole Thompson', email: 'nicole@example.com', department: 'Marketing', status: 'Active', joinDate: '2023-08-01' },
    { id: 19, name: 'Ryan Clark', email: 'ryan@example.com', department: 'Sales', status: 'Active', joinDate: '2023-08-15' },
    { id: 20, name: 'Taylor Brown', email: 'taylor@example.com', department: 'Engineering', status: 'Active', joinDate: '2023-09-01' },
  ];

  const userProjects = {
    1: [
      { id: 1, project: 'E-commerce Platform', role: 'Lead Developer', hours: 40, status: 'In Progress' },
      { id: 2, project: 'Mobile App', role: 'Backend Developer', hours: 20, status: 'Completed' },
      { id: 3, project: 'API Gateway', role: 'Senior Developer', hours: 35, status: 'In Progress' },
      { id: 4, project: 'Microservices', role: 'Architect', hours: 25, status: 'Planning' },
      { id: 5, project: 'Cloud Migration', role: 'DevOps Lead', hours: 30, status: 'Completed' },
      { id: 6, project: 'Security Audit', role: 'Security Engineer', hours: 15, status: 'In Progress' },
      { id: 7, project: 'Performance Optimization', role: 'Senior Developer', hours: 28, status: 'Planning' },
      { id: 8, project: 'Code Review Process', role: 'Tech Lead', hours: 12, status: 'Completed' },
      { id: 9, project: 'Documentation Update', role: 'Developer', hours: 18, status: 'In Progress' },
      { id: 10, project: 'Testing Framework', role: 'QA Engineer', hours: 22, status: 'Planning' },
    ],
    2: [
      { id: 11, project: 'Marketing Campaign', role: 'Campaign Manager', hours: 35, status: 'In Progress' },
      { id: 12, project: 'Brand Redesign', role: 'Creative Lead', hours: 25, status: 'Planning' },
      { id: 13, project: 'Social Media Strategy', role: 'Marketing Specialist', hours: 20, status: 'Completed' },
      { id: 14, project: 'Content Creation', role: 'Content Manager', hours: 30, status: 'In Progress' },
      { id: 15, project: 'SEO Optimization', role: 'SEO Specialist', hours: 15, status: 'Planning' },
      { id: 16, project: 'Email Marketing', role: 'Email Specialist', hours: 18, status: 'In Progress' },
      { id: 17, project: 'Analytics Dashboard', role: 'Data Analyst', hours: 28, status: 'Completed' },
      { id: 18, project: 'Customer Segmentation', role: 'Marketing Analyst', hours: 22, status: 'Planning' },
    ],
    3: [
      { id: 19, project: 'Sales Dashboard', role: 'Business Analyst', hours: 30, status: 'On Hold' },
      { id: 20, project: 'Lead Generation', role: 'Sales Associate', hours: 25, status: 'In Progress' },
      { id: 21, project: 'CRM Integration', role: 'Sales Engineer', hours: 35, status: 'Planning' },
      { id: 22, project: 'Customer Onboarding', role: 'Account Manager', hours: 20, status: 'Completed' },
      { id: 23, project: 'Sales Training', role: 'Sales Trainer', hours: 15, status: 'In Progress' },
      { id: 24, project: 'Pipeline Analysis', role: 'Sales Analyst', hours: 28, status: 'Planning' },
    ],
    4: [
      { id: 25, project: 'Employee Onboarding', role: 'HR Coordinator', hours: 15, status: 'In Progress' },
      { id: 26, project: 'Training Program', role: 'Program Manager', hours: 28, status: 'Completed' },
      { id: 27, project: 'Performance Review System', role: 'HR Specialist', hours: 32, status: 'Planning' },
      { id: 28, project: 'Benefits Administration', role: 'Benefits Coordinator', hours: 20, status: 'In Progress' },
      { id: 29, project: 'Recruitment Process', role: 'Recruiter', hours: 35, status: 'Completed' },
      { id: 30, project: 'Employee Engagement', role: 'HR Manager', hours: 25, status: 'Planning' },
      { id: 31, project: 'Policy Updates', role: 'HR Coordinator', hours: 18, status: 'In Progress' },
    ],
    5: [
      { id: 32, project: 'API Development', role: 'Senior Developer', hours: 45, status: 'In Progress' },
      { id: 33, project: 'Database Migration', role: 'Database Developer', hours: 32, status: 'Completed' },
      { id: 34, project: 'Authentication System', role: 'Security Developer', hours: 28, status: 'Planning' },
      { id: 35, project: 'Logging Framework', role: 'Backend Developer', hours: 22, status: 'In Progress' },
      { id: 36, project: 'Caching Layer', role: 'Performance Engineer', hours: 30, status: 'Completed' },
      { id: 37, project: 'Monitoring Setup', role: 'DevOps Engineer', hours: 25, status: 'Planning' },
    ],
    6: [
      { id: 38, project: 'UI/UX Redesign', role: 'UI Designer', hours: 40, status: 'In Progress' },
      { id: 39, project: 'Design System', role: 'Design Lead', hours: 35, status: 'Planning' },
      { id: 40, project: 'Prototype Development', role: 'UX Designer', hours: 28, status: 'Completed' },
      { id: 41, project: 'User Research', role: 'UX Researcher', hours: 25, status: 'In Progress' },
      { id: 42, project: 'Accessibility Audit', role: 'Accessibility Specialist', hours: 20, status: 'Planning' },
    ],
    7: [
      { id: 43, project: 'Frontend Framework', role: 'Frontend Developer', hours: 38, status: 'In Progress' },
      { id: 44, project: 'Component Library', role: 'UI Developer', hours: 32, status: 'Planning' },
      { id: 45, project: 'PWA Implementation', role: 'Web Developer', hours: 30, status: 'Completed' },
      { id: 46, project: 'Build Optimization', role: 'Frontend Engineer', hours: 25, status: 'In Progress' },
    ],
    8: [
      { id: 47, project: 'Product Launch', role: 'Product Marketing Manager', hours: 42, status: 'In Progress' },
      { id: 48, project: 'Market Research', role: 'Market Analyst', hours: 28, status: 'Completed' },
      { id: 49, project: 'Competitor Analysis', role: 'Business Analyst', hours: 25, status: 'Planning' },
      { id: 50, project: 'Go-to-Market Strategy', role: 'Marketing Manager', hours: 35, status: 'In Progress' },
    ],
    9: [
      { id: 51, project: 'Sales Automation', role: 'Sales Engineer', hours: 35, status: 'In Progress' },
      { id: 52, project: 'Customer Analytics', role: 'Data Analyst', hours: 30, status: 'Planning' },
      { id: 53, project: 'Territory Management', role: 'Territory Manager', hours: 25, status: 'Completed' },
      { id: 54, project: 'Quota Planning', role: 'Sales Operations', hours: 20, status: 'In Progress' },
    ],
    10: [
      { id: 55, project: 'Compensation Review', role: 'Compensation Analyst', hours: 30, status: 'In Progress' },
      { id: 56, project: 'Org Chart Update', role: 'HR Coordinator', hours: 15, status: 'Completed' },
      { id: 57, project: 'Culture Initiative', role: 'Culture Manager', hours: 35, status: 'Planning' },
      { id: 58, project: 'Diversity Program', role: 'Diversity Coordinator', hours: 25, status: 'In Progress' },
    ],
    11: [
      { id: 59, project: 'Machine Learning Pipeline', role: 'ML Engineer', hours: 45, status: 'In Progress' },
      { id: 60, project: 'Data Processing', role: 'Data Engineer', hours: 38, status: 'Planning' },
      { id: 61, project: 'Model Training', role: 'Data Scientist', hours: 32, status: 'Completed' },
    ],
    12: [
      { id: 62, project: 'Brand Guidelines', role: 'Brand Designer', hours: 30, status: 'In Progress' },
      { id: 63, project: 'Logo Redesign', role: 'Graphic Designer', hours: 25, status: 'Planning' },
      { id: 64, project: 'Marketing Materials', role: 'Creative Designer', hours: 28, status: 'Completed' },
    ],
    13: [
      { id: 65, project: 'Campaign Analysis', role: 'Marketing Analyst', hours: 20, status: 'On Hold' },
      { id: 66, project: 'ROI Measurement', role: 'Performance Analyst', hours: 15, status: 'Planning' },
    ],
    14: [
      { id: 67, project: 'Client Acquisition', role: 'Account Executive', hours: 40, status: 'In Progress' },
      { id: 68, project: 'Proposal Writing', role: 'Sales Writer', hours: 25, status: 'Completed' },
      { id: 69, project: 'Contract Negotiation', role: 'Sales Manager', hours: 30, status: 'Planning' },
    ],
    15: [
      { id: 70, project: 'Blockchain Integration', role: 'Blockchain Developer', hours: 40, status: 'In Progress' },
      { id: 71, project: 'Smart Contracts', role: 'Smart Contract Developer', hours: 35, status: 'Planning' },
      { id: 72, project: 'Crypto Wallet', role: 'Crypto Developer', hours: 28, status: 'Completed' },
    ],
    16: [
      { id: 73, project: 'Wellness Program', role: 'Wellness Coordinator', hours: 25, status: 'In Progress' },
      { id: 74, project: 'Team Building', role: 'Event Coordinator', hours: 20, status: 'Planning' },
      { id: 75, project: 'Mental Health Initiative', role: 'Wellness Specialist', hours: 30, status: 'Completed' },
    ],
    17: [
      { id: 76, project: 'Mobile App Design', role: 'Mobile Designer', hours: 35, status: 'In Progress' },
      { id: 77, project: 'Icon Library', role: 'Icon Designer', hours: 20, status: 'Planning' },
      { id: 78, project: 'Animation Design', role: 'Motion Designer', hours: 25, status: 'Completed' },
    ],
    18: [
      { id: 79, project: 'Influencer Campaign', role: 'Influencer Manager', hours: 30, status: 'In Progress' },
      { id: 80, project: 'Viral Marketing', role: 'Viral Specialist', hours: 25, status: 'Planning' },
      { id: 81, project: 'Community Building', role: 'Community Manager', hours: 35, status: 'Completed' },
    ],
    19: [
      { id: 82, project: 'Enterprise Sales', role: 'Enterprise Rep', hours: 45, status: 'In Progress' },
      { id: 83, project: 'Partnership Development', role: 'Partner Manager', hours: 30, status: 'Planning' },
      { id: 84, project: 'Channel Strategy', role: 'Channel Manager', hours: 25, status: 'Completed' },
    ],
    20: [
      { id: 85, project: 'AI Integration', role: 'AI Engineer', hours: 40, status: 'In Progress' },
      { id: 86, project: 'Neural Networks', role: 'Deep Learning Engineer', hours: 35, status: 'Planning' },
      { id: 87, project: 'Computer Vision', role: 'CV Engineer', hours: 30, status: 'Completed' },
    ],
  };

  const getDetailData = (selectedUser) => {
    return userProjects[selectedUser.id] || [];
  };

  const leftTableColumns = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 150,
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 200,
    },
    {
      id: 'department',
      label: 'Department',
      minWidth: 120,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value === 'Active' ? 'success' : 'default'}
          variant={value === 'Active' ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      id: 'joinDate',
      label: 'Join Date',
      minWidth: 120,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const rightTableColumns = [
    {
      id: 'project',
      label: 'Project',
      minWidth: 180,
    },
    {
      id: 'role',
      label: 'Role',
      minWidth: 150,
    },
    {
      id: 'hours',
      label: 'Hours',
      minWidth: 80,
      align: 'center',
      render: (value) => `${value}h`,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      render: (value) => {
        const colorMap = {
          'In Progress': 'primary',
          'Completed': 'success',
          'Planning': 'warning',
          'On Hold': 'error',
        };
        return (
          <Chip
            label={value}
            size="small"
            color={colorMap[value] || 'default'}
            variant="outlined"
          />
        );
      },
    },
  ];

  const handleRowSelect = (user, rowIndex) => {
    console.log('Selected user:', user, 'at index:', rowIndex);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dual Table Component Demo
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This demo shows a dual table component where clicking on a user in the left table
          displays their projects in the right table. Both tables have sticky headers and
          responsive design.
        </Typography>
      </Box>

      <Box sx={{ height: 600 }}>
        <DualTableComponent
          leftTableTitle="Users"
          rightTableTitle="Projects"
          leftTableData={users}
          leftTableColumns={leftTableColumns}
          rightTableColumns={rightTableColumns}
          getDetailData={getDetailData}
          onLeftRowSelect={handleRowSelect}
          maxHeight={600}
        />
      </Box>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Features:
        </Typography>
        <Typography variant="body2" component="div">
          • <strong>Sticky Headers:</strong> Both tables maintain headers when scrolling
          <br />
          • <strong>Row Selection:</strong> Click any row in the left table to update the right table
          <br />
          • <strong>Responsive Grid:</strong> Two-column layout that adapts to screen size
          <br />
          • <strong>Custom Rendering:</strong> Support for chips, dates, and custom cell content
          <br />
          • <strong>Reusable Component:</strong> Easy to configure with different data and columns
        </Typography>
      </Box>
    </Container>
  );
};

export default DualTableDemo;