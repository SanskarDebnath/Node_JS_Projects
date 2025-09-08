import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import { Delete, CloudUpload, Description, Close } from "@mui/icons-material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface Qualification {
  id: number;
  type: string;
  branch: string;
  resultStatus: string;
  passingYear: string;
  marksType: string;
  boardUniversity: string;
  document: File | null;
  fileName: string;
  percentage?: string;
  grade?: string;
  marksObtained?: string;
  totalMarks?: string;
  computedPercentage?: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App: React.FC = () => {
  const [qualifications, setQualifications] = useState<Qualification[]>([
    {
      id: 1,
      type: "",
      branch: "",
      resultStatus: "",
      passingYear: "",
      marksType: "",
      boardUniversity: "",
      document: null,
      fileName: "",
    },
  ]);

  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({
    open: false,
    message: "",
    severity: 'success'
  });

  const generateYearOptions = (): string[] => {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let year = currentYear; year >= 1990; year--) {
      years.push(year.toString());
    }
    return years;
  };

  const addQualification = () => {
    const newId =
      qualifications.length > 0
        ? Math.max(...qualifications.map((q) => q.id)) + 1
        : 1;
    setQualifications([
      ...qualifications,
      {
        id: newId,
        type: "",
        branch: "",
        resultStatus: "",
        passingYear: "",
        marksType: "",
        boardUniversity: "",
        document: null,
        fileName: "",
      },
    ]);
  };

  const removeQualification = (id: number) => {
    if (qualifications.length <= 1) return;
    setQualifications(qualifications.filter((q) => q.id !== id));
  };

  const handleInputChange = (
    id: number,
    field: keyof Qualification,
    value: string
  ) => {
    setQualifications(
      qualifications.map((q) => {
        if (q.id === id) {
          const updatedQualification = { ...q, [field]: value };

          if ((field === 'marksObtained' || field === 'totalMarks') &&
            q.marksType === 'Marks' &&
            updatedQualification.marksObtained &&
            updatedQualification.totalMarks) {

            const marks = parseFloat(updatedQualification.marksObtained);
            const total = parseFloat(updatedQualification.totalMarks);

            if (!isNaN(marks) && !isNaN(total) && total > 0) {
              const computedPercentage = ((marks / total) * 100).toFixed(2);
              updatedQualification.computedPercentage = computedPercentage;
            }
          }

          return updatedQualification;
        }
        return q;
      })
    );
  };

  const handleFileUpload = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setSnackbar({ open: true, message: "File size exceeds 2MB limit", severity: 'error' });
        return;
      }
      if (file.type !== "application/pdf") {
        setSnackbar({ open: true, message: "Please upload a PDF file", severity: 'error' });
        return;
      }
      setQualifications(
        qualifications.map((q) =>
          q.id === id
            ? { ...q, document: file, fileName: file.name }
            : q
        )
      );
    }
  };

  const validatePercentage = (value: string): boolean => {
    const percentage = parseFloat(value);
    return !isNaN(percentage) && percentage <= 100;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const qual of qualifications) {
      if (qual.marksType === 'CGPA' && qual.percentage && !validatePercentage(qual.percentage)) {
        setSnackbar({ open: true, message: "Percentage cannot be greater than 100", severity: 'error' });
        return;
      }

      if (qual.marksType === 'Grade' && qual.percentage && !validatePercentage(qual.percentage)) {
        setSnackbar({ open: true, message: "Percentage cannot be greater than 100", severity: 'error' });
        return;
      }
    }

    console.log("Form submitted:", qualifications);
    setSnackbar({ open: true, message: "Form submitted successfully! Check console for data.", severity: 'success' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        padding: { xs: 2, md: 3 },
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
      }}>
        <Paper elevation={0} sx={{
          maxWidth: 800,
          width: { xs: "90%", md: "80%" },
          margin: "auto",
          padding: { xs: 3, md: 4 },
          borderRadius: 4,
          backgroundColor: "white",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          position: "relative"
        }}>

          <Typography variant="h5" gutterBottom sx={{
            fontWeight: "600",
            marginBottom: 2,
            color: "#1e293b",
            background: "linear(45deg, #6366f1 30%, #818cf8 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center"
          }}>
            Qualifications Details
          </Typography>


          <form onSubmit={handleSubmit}>
            {qualifications.map((qual, index) => (
              <Card key={qual.id} sx={{
                marginBottom: 3,
                border: "1px solid #e2e8f0",
                position: "relative",
                overflow: "visible",
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear(90deg, #6366f1 0%, #818cf8 100%)",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12
                }
              }}>
                <CardContent sx={{ padding: 3 }}>
                  <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 3,
                    paddingBottom: 2,
                    borderBottom: "1px solid #f1f5f9"
                  }}>
                    <Typography variant="h6" sx={{ color: "#334155", fontWeight: 600 }}>
                      Qualification {index + 1}
                    </Typography>
                    {qualifications.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => removeQualification(qual.id)}
                        size="small"
                        sx={{
                          backgroundColor: "#fee2e2",
                          "&:hover": { backgroundColor: "#fecaca" }
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>

                  <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                    marginBottom: 2
                  }}>

                    <FormControl fullWidth size="small">
                      <InputLabel id={`type-label-${qual.id}`} sx={{ fontSize: "0.9rem" }}>
                        Qualification Type *
                      </InputLabel>
                      <Select
                        labelId={`type-label-${qual.id}`}
                        value={qual.type}
                        label="Qualification Type *"
                        onChange={(e) =>
                          handleInputChange(qual.id, "type", e.target.value)
                        }
                        required
                      >
                        <MenuItem value="" sx={{ fontSize: "0.9rem" }}>--Please Select--</MenuItem>
                        <MenuItem value="SSC/Matric/High School" sx={{ fontSize: "0.9rem" }}>
                          SSC/Matric/High School
                        </MenuItem>
                        <MenuItem value="HSC/Intermediate" sx={{ fontSize: "0.9rem" }}>
                          HSC/Intermediate
                        </MenuItem>
                        <MenuItem value="Diploma" sx={{ fontSize: "0.9rem" }}>Diploma</MenuItem>
                        <MenuItem value="Bachelor's Degree" sx={{ fontSize: "0.9rem" }}>
                          Bachelor's Degree
                        </MenuItem>
                        <MenuItem value="Master's Degree" sx={{ fontSize: "0.9rem" }}>
                          Master's Degree
                        </MenuItem>
                        <MenuItem value="PhD" sx={{ fontSize: "0.9rem" }}>PhD</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel id={`marks-label-${qual.id}`} sx={{ fontSize: "0.9rem" }}>
                        Marks Type *
                      </InputLabel>
                      <Select
                        labelId={`marks-label-${qual.id}`}
                        value={qual.marksType}
                        label="Marks Type *"
                        onChange={(e) =>
                          handleInputChange(qual.id, "marksType", e.target.value)
                        }
                        required
                      >
                        <MenuItem value="" sx={{ fontSize: "0.9rem" }}>--Please Select--</MenuItem>
                        <MenuItem value="CGPA" sx={{ fontSize: "0.9rem" }}>CGPA</MenuItem>
                        <MenuItem value="Grade" sx={{ fontSize: "0.9rem" }}>Grade</MenuItem>
                        <MenuItem value="Marks" sx={{ fontSize: "0.9rem" }}>Marks</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  {qual.marksType === "CGPA" && (
                    <Box sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr" },
                      gap: 2,
                      marginBottom: 2
                    }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Percentage *"
                        type="number"
                        value={qual.percentage || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value && parseFloat(value) > 100) {
                            setSnackbar({ open: true, message: "Percentage cannot be greater than 100", severity: 'error' });
                            return;
                          }
                          handleInputChange(qual.id, "percentage", value);
                        }}
                        required
                        InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            max: 100,
                            step: 0.01
                          }
                        }}
                        helperText="Enter equivalent percentage for CGPA"
                      />
                    </Box>
                  )}

                  {qual.marksType === "Grade" && (
                    <Box sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 2,
                      marginBottom: 2
                    }}>
                      <FormControl fullWidth size="small">
                        <InputLabel id={`grade-label-${qual.id}`} sx={{ fontSize: "0.9rem" }}>
                          Select Grade *
                        </InputLabel>
                        <Select
                          labelId={`grade-label-${qual.id}`}
                          value={qual.grade || ""}
                          label="Select Grade *"
                          onChange={(e) =>
                            handleInputChange(qual.id, "grade", e.target.value)
                          }
                          required
                        >
                          <MenuItem value="" sx={{ fontSize: "0.9rem" }}>--Select Grade--</MenuItem>
                          <MenuItem value="A+" sx={{ fontSize: "0.9rem" }}>A+</MenuItem>
                          <MenuItem value="A" sx={{ fontSize: "0.9rem" }}>A</MenuItem>
                          <MenuItem value="B+" sx={{ fontSize: "0.9rem" }}>B+</MenuItem>
                          <MenuItem value="B" sx={{ fontSize: "0.9rem" }}>B</MenuItem>
                          <MenuItem value="C+" sx={{ fontSize: "0.9rem" }}>C+</MenuItem>
                          <MenuItem value="C" sx={{ fontSize: "0.9rem" }}>C</MenuItem>
                          <MenuItem value="D" sx={{ fontSize: "0.9rem" }}>D</MenuItem>
                          <MenuItem value="F" sx={{ fontSize: "0.9rem" }}>F</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        size="small"
                        label="Percentage *"
                        type="number"
                        value={qual.percentage || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value && parseFloat(value) > 100) {
                            setSnackbar({ open: true, message: "Percentage cannot be greater than 100", severity: 'error' });
                            return;
                          }
                          handleInputChange(qual.id, "percentage", value);
                        }}
                        required
                        InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            max: 100,
                            step: 0.01
                          }
                        }}
                      />
                    </Box>
                  )}

                  {qual.marksType === "Marks" && (
                    <Box sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                      gap: 2,
                      marginBottom: 2
                    }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Marks Obtained *"
                        type="number"
                        value={qual.marksObtained || ""}
                        onChange={(e) => handleInputChange(qual.id, "marksObtained", e.target.value)}
                        required
                        InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            step: 0.01
                          }
                        }}
                      />

                      <TextField
                        fullWidth
                        size="small"
                        label="Total Marks *"
                        type="number"
                        value={qual.totalMarks || ""}
                        onChange={(e) => handleInputChange(qual.id, "totalMarks", e.target.value)}
                        required
                        InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            step: 0.01
                          }
                        }}
                      />

                      <TextField
                        fullWidth
                        size="small"
                        label="Computed Percentage"
                        value={qual.computedPercentage || ""}
                        InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
                        InputProps={{
                          readOnly: true,
                        }}
                        helperText="Auto-calculated"
                      />
                    </Box>
                  )}

                  <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                    marginBottom: 2
                  }}>

                    <FormControl fullWidth size="small">
                      <InputLabel id={`branch-label-${qual.id}`} sx={{ fontSize: "0.9rem" }}>
                        Branch/Stream *
                      </InputLabel>
                      <Select
                        labelId={`branch-label-${qual.id}`}
                        value={qual.branch}
                        label="Branch/Stream *"
                        onChange={(e) =>
                          handleInputChange(qual.id, "branch", e.target.value)
                        }
                        required
                      >
                        <MenuItem value="" sx={{ fontSize: "0.9rem" }}>--Please Select--</MenuItem>
                        <MenuItem value="Science" sx={{ fontSize: "0.9rem" }}>Science</MenuItem>
                        <MenuItem value="Commerce" sx={{ fontSize: "0.9rem" }}>Commerce</MenuItem>
                        <MenuItem value="Arts" sx={{ fontSize: "0.9rem" }}>Arts</MenuItem>
                        <MenuItem value="Engineering" sx={{ fontSize: "0.9rem" }}>Engineering</MenuItem>
                        <MenuItem value="Medical" sx={{ fontSize: "0.9rem" }}>Medical</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel id={`status-label-${qual.id}`} sx={{ fontSize: "0.9rem" }}>
                        Result Status *
                      </InputLabel>
                      <Select
                        labelId={`status-label-${qual.id}`}
                        value={qual.resultStatus}
                        label="Result Status *"
                        onChange={(e) =>
                          handleInputChange(
                            qual.id,
                            "resultStatus",
                            e.target.value
                          )
                        }
                        required
                      >
                        <MenuItem value="" sx={{ fontSize: "0.9rem" }}>--Please Select--</MenuItem>
                        <MenuItem value="Pass" sx={{ fontSize: "0.9rem" }}>Pass</MenuItem>
                        <MenuItem value="Fail" sx={{ fontSize: "0.9rem" }}>Fail</MenuItem>
                        <MenuItem value="Appearing" sx={{ fontSize: "0.9rem" }}>Appearing</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                    marginBottom: 3
                  }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Board/University *"
                      value={qual.boardUniversity}
                      onChange={(e) =>
                        handleInputChange(
                          qual.id,
                          "boardUniversity",
                          e.target.value
                        )
                      }
                      required
                      InputLabelProps={{ sx: { fontSize: "0.9rem" } }}
                    />

                    <FormControl fullWidth size="small">
                      <InputLabel id={`year-label-${qual.id}`} sx={{ fontSize: "0.9rem" }}>
                        Year of Passing *
                      </InputLabel>
                      <Select
                        labelId={`year-label-${qual.id}`}
                        value={qual.passingYear}
                        label="Year of Passing *"
                        onChange={(e) =>
                          handleInputChange(
                            qual.id,
                            "passingYear",
                            e.target.value
                          )
                        }
                        required
                      >
                        <MenuItem value="" sx={{ fontSize: "0.9rem" }}>--Please Select--</MenuItem>
                        {generateYearOptions().map((year) => (
                          <MenuItem key={year} value={year} sx={{ fontSize: "0.9rem" }}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" sx={{
                      marginBottom: 1,
                      fontWeight: "600",
                      color: "#475569",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5
                    }}>
                      <Description fontSize="small" /> Qualification Documents
                    </Typography>
                    <Box sx={{
                      border: "2px dashed #cbd5e1",
                      padding: 3,
                      borderRadius: 3,
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: "#6366f1",
                        backgroundColor: "#f8fafc"
                      }
                    }}>
                      <CloudUpload sx={{ color: "#94a3b8", fontSize: 40, marginBottom: 1 }} />
                      <Typography variant="body2" sx={{ color: "#64748b", marginBottom: 1 }}>
                        Upload or drop PDF
                      </Typography>
                      <Typography variant="caption" sx={{ color: "##94a3b8", display: "block", marginBottom: 2 }}>
                        maximum size: 2MB
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        startIcon={<CloudUpload />}
                        sx={{
                          borderRadius: 2,
                          borderWidth: 1.5,
                          "&:hover": {
                            borderWidth: 1.5
                          }
                        }}
                      >
                        Select File
                        <input
                          type="file"
                          accept=".pdf"
                          hidden
                          onChange={(e) => handleFileUpload(qual.id, e)}
                        />
                      </Button>
                      {qual.fileName && (
                        <Typography variant="body2" sx={{
                          color: "#15803d",
                          marginTop: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 0.5
                        }}>
                          <Description fontSize="small" /> Selected: {qual.fileName}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outlined"
              onClick={addQualification}
              sx={{
                marginBottom: 4,
                borderRadius: 2,
                borderWidth: 1.5,
                "&:hover": {
                  borderWidth: 1.5
                }
              }}
              startIcon={<span style={{ fontSize: "1.2rem" }}>+</span>}
            >
              Add More Qualifications
            </Button>

            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 3,
              borderTop: "1px solid #e2e8f0"
            }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 3
                }}
              >
                Previous
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  background: "linear(90deg, #6366f1 0%, #818cf8 100%)",
                  "&:hover": {
                    background: "linear(90deg, #4f46e5 0%, #6366f1 100%)",
                  }
                }}
              >
                Save & Next ►
              </Button>
            </Box>
          </form>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={snackbar.severity}
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default App;