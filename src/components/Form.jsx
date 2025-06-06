import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  Rating,
  Autocomplete,
  Chip,
  Button,
  IconButton,
  Typography,
  Paper,
  Grid,
  Avatar,
  InputAdornment,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  CloudUpload,
  Delete,
  CalendarToday,
  AccessTime,
  AttachMoney,
  Percent,
  Phone,
  Email,
  Link,
  ColorLens,
} from '@mui/icons-material';
// Date picker imports removed - using native HTML date inputs instead

const Form = ({
  fields = [],
  initialValues = {},
  onSubmit,
  onReset,
  submitLabel = 'Submit',
  resetLabel = 'Reset',
  showSubmit = true,
  showReset = false,
  disabled = false,
  loading = false,
  ...props
}) => {
  const theme = useTheme();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({});
  const fileInputRefs = useRef({});

  const handleChange = (fieldId, value) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: null }));
    }
  };

  const handlePasswordVisibility = (fieldId) => {
    setShowPasswords(prev => ({ ...prev, [fieldId]: !prev[fieldId] }));
  };

  const handleFileChange = (fieldId, event) => {
    const files = Array.from(event.target.files);
    const field = fields.find(f => f.id === fieldId);
    
    if (field?.multiple) {
      handleChange(fieldId, files);
    } else {
      handleChange(fieldId, files[0] || null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Basic validation
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && (!values[field.id] || values[field.id] === '')) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      if (field.validation) {
        const validationError = field.validation(values[field.id], values);
        if (validationError) {
          newErrors[field.id] = validationError;
        }
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(values);
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    onReset?.();
  };

  const renderField = (field) => {
    const fieldProps = {
      key: field.id,
      id: field.id,
      name: field.id,
      label: field.label,
      value: values[field.id] || '',
      error: !!errors[field.id],
      helperText: errors[field.id] || field.helperText,
      disabled: disabled || field.disabled,
      required: field.required,
      placeholder: field.placeholder,
      fullWidth: field.fullWidth !== false,
      size: field.size || 'medium',
      variant: field.variant || 'outlined',
      ...field.props,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'tel':
        return (
          <TextField
            {...fieldProps}
            type={field.type}
            onChange={(e) => handleChange(field.id, e.target.value)}
            InputProps={{
              startAdornment: field.icon && (
                <InputAdornment position="start">{field.icon}</InputAdornment>
              ),
              ...field.InputProps,
            }}
          />
        );

      case 'password':
        return (
          <TextField
            {...fieldProps}
            type={showPasswords[field.id] ? 'text' : 'password'}
            onChange={(e) => handleChange(field.id, e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handlePasswordVisibility(field.id)}
                    edge="end"
                  >
                    {showPasswords[field.id] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );

      case 'number':
        return (
          <TextField
            {...fieldProps}
            type="number"
            inputProps={{
              min: field.min,
              max: field.max,
              step: field.step,
            }}
            onChange={(e) => handleChange(field.id, e.target.value)}
            InputProps={{
              startAdornment: field.icon && (
                <InputAdornment position="start">{field.icon}</InputAdornment>
              ),
            }}
          />
        );

      case 'textarea':
        return (
          <TextField
            {...fieldProps}
            multiline
            rows={field.rows || 4}
            maxRows={field.maxRows}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );

      case 'select':
        return (
          <FormControl {...fieldProps} error={!!errors[field.id]}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              label={field.label}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {(errors[field.id] || field.helperText) && (
              <FormHelperText>{errors[field.id] || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'multiselect':
        return (
          <FormControl {...fieldProps} error={!!errors[field.id]}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              multiple
              value={values[field.id] || []}
              onChange={(e) => handleChange(field.id, e.target.value)}
              label={field.label}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const option = field.options?.find(opt => opt.value === value);
                    return <Chip key={value} label={option?.label || value} size="small" />;
                  })}
                </Box>
              )}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={(values[field.id] || []).indexOf(option.value) > -1} />
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {(errors[field.id] || field.helperText) && (
              <FormHelperText>{errors[field.id] || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'autocomplete':
        return (
          <Autocomplete
            options={field.options || []}
            getOptionLabel={(option) => option?.label || option || ''}
            value={values[field.id] || (field.multiple ? [] : null)}
            onChange={(_, value) => handleChange(field.id, value)}
            multiple={field.multiple}
            freeSolo={field.freeSolo}
            renderInput={(params) => (
              <TextField
                {...params}
                label={field.label}
                error={!!errors[field.id]}
                helperText={errors[field.id] || field.helperText}
                required={field.required}
              />
            )}
            renderTags={(value, getTagProps) =>
              (value || []).map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option?.label || option || 'Unknown'}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        );

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={values[field.id] || false}
                onChange={(e) => handleChange(field.id, e.target.checked)}
                disabled={disabled || field.disabled}
              />
            }
            label={field.label}
          />
        );

      case 'checkboxGroup':
        return (
          <FormControl component="fieldset" error={!!errors[field.id]}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <FormGroup>
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={(values[field.id] || []).includes(option.value)}
                      onChange={(e) => {
                        const currentValues = values[field.id] || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option.value]
                          : currentValues.filter(v => v !== option.value);
                        handleChange(field.id, newValues);
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
            {(errors[field.id] || field.helperText) && (
              <FormHelperText>{errors[field.id] || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl component="fieldset" error={!!errors[field.id]}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              row={field.row}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {(errors[field.id] || field.helperText) && (
              <FormHelperText>{errors[field.id] || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'switch':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={values[field.id] || false}
                onChange={(e) => handleChange(field.id, e.target.checked)}
                disabled={disabled || field.disabled}
              />
            }
            label={field.label}
          />
        );

      case 'slider':
        return (
          <FormControl fullWidth>
            <FormLabel>{field.label}</FormLabel>
            <Slider
              value={values[field.id] || field.min || 0}
              onChange={(_, value) => handleChange(field.id, value)}
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              marks={field.marks}
              valueLabelDisplay={field.valueLabelDisplay || 'auto'}
              disabled={disabled || field.disabled}
            />
            {(errors[field.id] || field.helperText) && (
              <FormHelperText error={!!errors[field.id]}>
                {errors[field.id] || field.helperText}
              </FormHelperText>
            )}
          </FormControl>
        );

      case 'rating':
        return (
          <FormControl>
            <FormLabel>{field.label}</FormLabel>
            <Rating
              value={values[field.id] || 0}
              onChange={(_, value) => handleChange(field.id, value)}
              max={field.max || 5}
              precision={field.precision || 1}
              disabled={disabled || field.disabled}
            />
            {(errors[field.id] || field.helperText) && (
              <FormHelperText error={!!errors[field.id]}>
                {errors[field.id] || field.helperText}
              </FormHelperText>
            )}
          </FormControl>
        );

      case 'toggle':
        return (
          <FormControl>
            <FormLabel>{field.label}</FormLabel>
            <ToggleButtonGroup
              value={values[field.id]}
              exclusive={!field.multiple}
              onChange={(_, value) => handleChange(field.id, value)}
              disabled={disabled || field.disabled}
            >
              {field.options?.map((option) => (
                <ToggleButton key={option.value} value={option.value}>
                  {option.icon && option.icon}
                  {option.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            {(errors[field.id] || field.helperText) && (
              <FormHelperText error={!!errors[field.id]}>
                {errors[field.id] || field.helperText}
              </FormHelperText>
            )}
          </FormControl>
        );

      case 'file':
        return (
          <FormControl fullWidth error={!!errors[field.id]}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{ justifyContent: 'flex-start', p: 2 }}
            >
              {field.label}
              <input
                ref={el => fileInputRefs.current[field.id] = el}
                type="file"
                hidden
                multiple={field.multiple}
                accept={field.accept}
                onChange={(e) => handleFileChange(field.id, e)}
              />
            </Button>
            {values[field.id] && (
              <Box sx={{ mt: 1 }}>
                {field.multiple ? (
                  values[field.id].map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => {
                        const newFiles = values[field.id].filter((_, i) => i !== index);
                        handleChange(field.id, newFiles.length > 0 ? newFiles : null);
                      }}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))
                ) : (
                  <Chip
                    label={values[field.id].name}
                    onDelete={() => handleChange(field.id, null)}
                  />
                )}
              </Box>
            )}
            {(errors[field.id] || field.helperText) && (
              <FormHelperText>{errors[field.id] || field.helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'date':
        return (
          <TextField
            {...fieldProps}
            type="date"
            onChange={(e) => handleChange(field.id, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );

      case 'time':
        return (
          <TextField
            {...fieldProps}
            type="time"
            onChange={(e) => handleChange(field.id, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );

      case 'datetime':
        return (
          <TextField
            {...fieldProps}
            type="datetime-local"
            onChange={(e) => handleChange(field.id, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );

      case 'color':
        return (
          <Box>
            <FormLabel>{field.label}</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <input
                type="color"
                value={values[field.id] || '#000000'}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={{
                  width: 50,
                  height: 40,
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              />
              <TextField
                value={values[field.id] || '#000000'}
                onChange={(e) => handleChange(field.id, e.target.value)}
                size="small"
                sx={{ width: 120 }}
              />
            </Box>
            {(errors[field.id] || field.helperText) && (
              <FormHelperText error={!!errors[field.id]}>
                {errors[field.id] || field.helperText}
              </FormHelperText>
            )}
          </Box>
        );

      default:
        return (
          <TextField
            {...fieldProps}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} {...props}>
      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid item xs={12} sm={field.gridSize?.sm} md={field.gridSize?.md} lg={field.gridSize?.lg} key={field.id}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
      
      {(showSubmit || showReset) && (
        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          {showReset && (
            <Button
              type="button"
              variant="outlined"
              onClick={handleReset}
              disabled={disabled || loading}
            >
              {resetLabel}
            </Button>
          )}
          {showSubmit && (
            <Button
              type="submit"
              variant="contained"
              disabled={disabled || loading}
            >
              {submitLabel}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Form;