import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  DragHandle,
  Preview,
  Save,
  Code,
  Download,
  Upload,
  Clear,
  Visibility,
  Email,
  Phone,
  CalendarToday,
  AccessTime,
  AttachMoney,
  Percent,
  ColorLens,
  CloudUpload,
  Star,
  ToggleOn,
  CheckBox,
  RadioButtonChecked,
  TextFields,
  Subject,
  Numbers,
} from '@mui/icons-material';
import Form from './Form';

const FormGenerator = () => {
  const theme = useTheme();
  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState(null);
  const [fieldDialog, setFieldDialog] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formTitle, setFormTitle] = useState('Generated Form');
  const [formDescription, setFormDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeDialog, setCodeDialog] = useState(false);

  const fieldTypes = [
    { value: 'text', label: 'Text', icon: <TextFields /> },
    { value: 'email', label: 'Email', icon: <Email /> },
    { value: 'password', label: 'Password', icon: <Visibility /> },
    { value: 'number', label: 'Number', icon: <Numbers /> },
    { value: 'textarea', label: 'Textarea', icon: <Subject /> },
    { value: 'select', label: 'Select', icon: <TextFields /> },
    { value: 'multiselect', label: 'Multi Select', icon: <TextFields /> },
    { value: 'radio', label: 'Radio Group', icon: <RadioButtonChecked /> },
    { value: 'checkbox', label: 'Checkbox', icon: <CheckBox /> },
    { value: 'checkboxGroup', label: 'Checkbox Group', icon: <CheckBox /> },
    { value: 'switch', label: 'Switch', icon: <ToggleOn /> },
    { value: 'slider', label: 'Slider', icon: <TextFields /> },
    { value: 'rating', label: 'Rating', icon: <Star /> },
    { value: 'date', label: 'Date', icon: <CalendarToday /> },
    { value: 'time', label: 'Time', icon: <AccessTime /> },
    { value: 'datetime', label: 'DateTime', icon: <CalendarToday /> },
    { value: 'file', label: 'File Upload', icon: <CloudUpload /> },
    { value: 'color', label: 'Color', icon: <ColorLens /> },
  ];

  const [fieldForm, setFieldForm] = useState({
    type: 'text',
    label: '',
    id: '',
    placeholder: '',
    required: false,
    helperText: '',
    options: [],
    validation: '',
    gridSize: { xs: 12, sm: 12, md: 6 },
  });

  const resetFieldForm = () => {
    setFieldForm({
      type: 'text',
      label: '',
      id: '',
      placeholder: '',
      required: false,
      helperText: '',
      options: [],
      validation: '',
      gridSize: { xs: 12, sm: 12, md: 6 },
    });
  };

  const handleAddField = () => {
    setCurrentField(null);
    resetFieldForm();
    setFieldDialog(true);
  };

  const handleEditField = (field, index) => {
    setCurrentField(index);
    setFieldForm(field);
    setFieldDialog(true);
  };

  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSaveField = () => {
    const fieldData = {
      ...fieldForm,
      id: fieldForm.id || fieldForm.label.toLowerCase().replace(/\s+/g, '_'),
    };

    if (currentField !== null) {
      const updatedFields = [...fields];
      updatedFields[currentField] = fieldData;
      setFields(updatedFields);
    } else {
      setFields([...fields, fieldData]);
    }

    setFieldDialog(false);
    resetFieldForm();
  };

  const handleMoveField = (index, direction) => {
    const newFields = [...fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < fields.length) {
      [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
      setFields(newFields);
    }
  };

  const handleOptionAdd = () => {
    setFieldForm({
      ...fieldForm,
      options: [...fieldForm.options, { label: '', value: '' }]
    });
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...fieldForm.options];
    newOptions[index][field] = value;
    setFieldForm({
      ...fieldForm,
      options: newOptions
    });
  };

  const handleOptionDelete = (index) => {
    setFieldForm({
      ...fieldForm,
      options: fieldForm.options.filter((_, i) => i !== index)
    });
  };

  const generateFormCode = () => {
    const code = `import React from 'react';
import Form from './Form';

const ${formTitle.replace(/\s+/g, '')} = () => {
  const fields = ${JSON.stringify(fields, null, 2)};

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <Form
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Submit"
      showReset={true}
    />
  );
};

export default ${formTitle.replace(/\s+/g, '')};`;

    setGeneratedCode(code);
    setCodeDialog(true);
  };

  const handleFormSubmit = (values) => {
    console.log('Form Preview Submitted:', values);
    alert('Form submitted! Check console for values.');
  };

  const clearForm = () => {
    setFields([]);
    setFormTitle('Generated Form');
    setFormDescription('');
  };

  const needsOptions = ['select', 'multiselect', 'radio', 'checkboxGroup'];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Form Generator
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Create dynamic forms with a visual builder interface
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Form Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddField}
          >
            Add Field
          </Button>
          <Button
            variant="outlined"
            startIcon={<Preview />}
            onClick={() => setPreviewMode(!previewMode)}
            color={previewMode ? 'secondary' : 'primary'}
          >
            {previewMode ? 'Builder' : 'Preview'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Code />}
            onClick={generateFormCode}
            disabled={fields.length === 0}
          >
            Generate Code
          </Button>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={clearForm}
            color="error"
          >
            Clear All
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Form Builder */}
        <Grid item xs={12} lg={previewMode ? 6 : 12}>
          {previewMode ? (
            <Typography variant="h6" gutterBottom>
              Builder View
            </Typography>
          ) : null}
          
          <Card>
            <CardContent>
              {fields.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No fields added yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Click "Add Field" to start building your form
                  </Typography>
                  <Button variant="contained" startIcon={<Add />} onClick={handleAddField}>
                    Add Your First Field
                  </Button>
                </Box>
              ) : (
                <List>
                  {fields.map((field, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          <DragHandle sx={{ color: 'text.secondary' }} />
                        </Box>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {fieldTypes.find(t => t.value === field.type)?.icon}
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {field.label}
                              </Typography>
                              <Chip size="small" label={field.type} />
                              {field.required && <Chip size="small" label="Required" color="primary" />}
                            </Box>
                          }
                          secondary={`ID: ${field.id} | Grid: ${field.gridSize?.md || 6}/12`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton onClick={() => handleMoveField(index, 'up')} disabled={index === 0}>
                            <Typography>↑</Typography>
                          </IconButton>
                          <IconButton onClick={() => handleMoveField(index, 'down')} disabled={index === fields.length - 1}>
                            <Typography>↓</Typography>
                          </IconButton>
                          <IconButton onClick={() => handleEditField(field, index)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteField(index)} color="error">
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < fields.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Form Preview */}
        {previewMode && (
          <Grid item xs={12} lg={6}>
            <Typography variant="h6" gutterBottom>
              Live Preview
            </Typography>
            <Card>
              <CardContent>
                {fields.length === 0 ? (
                  <Alert severity="info">Add fields to see the preview</Alert>
                ) : (
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {formTitle}
                    </Typography>
                    {formDescription && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {formDescription}
                      </Typography>
                    )}
                    <Form
                      fields={fields}
                      onSubmit={handleFormSubmit}
                      submitLabel="Submit"
                      showReset={true}
                    />
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Field Editor Dialog */}
      <Dialog open={fieldDialog} onClose={() => setFieldDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {currentField !== null ? 'Edit Field' : 'Add New Field'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Field Type</InputLabel>
                <Select
                  value={fieldForm.type}
                  onChange={(e) => setFieldForm({ ...fieldForm, type: e.target.value })}
                  label="Field Type"
                >
                  {fieldTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {type.icon}
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Field Label"
                value={fieldForm.label}
                onChange={(e) => setFieldForm({ ...fieldForm, label: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Field ID"
                value={fieldForm.id}
                onChange={(e) => setFieldForm({ ...fieldForm, id: e.target.value })}
                helperText="Auto-generated from label if empty"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Placeholder"
                value={fieldForm.placeholder}
                onChange={(e) => setFieldForm({ ...fieldForm, placeholder: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Helper Text"
                value={fieldForm.helperText}
                onChange={(e) => setFieldForm({ ...fieldForm, helperText: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Grid Size (MD)"
                value={fieldForm.gridSize?.md || 6}
                onChange={(e) => setFieldForm({
                  ...fieldForm,
                  gridSize: { ...fieldForm.gridSize, md: Number(e.target.value) }
                })}
                inputProps={{ min: 1, max: 12 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={fieldForm.required}
                    onChange={(e) => setFieldForm({ ...fieldForm, required: e.target.checked })}
                  />
                }
                label="Required"
              />
            </Grid>

            {/* Options for select/radio/checkbox fields */}
            {needsOptions.includes(fieldForm.type) && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Options
                </Typography>
                {fieldForm.options.map((option, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      size="small"
                      label="Label"
                      value={option.label}
                      onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      size="small"
                      label="Value"
                      value={option.value}
                      onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                      sx={{ flex: 1 }}
                    />
                    <IconButton onClick={() => handleOptionDelete(index)} color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleOptionAdd}
                  size="small"
                >
                  Add Option
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFieldDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveField}
            variant="contained"
            disabled={!fieldForm.label}
          >
            {currentField !== null ? 'Update' : 'Add'} Field
          </Button>
        </DialogActions>
      </Dialog>

      {/* Code Generation Dialog */}
      <Dialog open={codeDialog} onClose={() => setCodeDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Generated React Component Code</DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              p: 2,
              backgroundColor: alpha(theme.palette.grey[900], 0.05),
              border: '1px solid',
              borderColor: theme.palette.divider,
            }}
          >
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: 1.4 }}>
              {generatedCode}
            </pre>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCodeDialog(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => navigator.clipboard.writeText(generatedCode)}
          >
            Copy to Clipboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FormGenerator;