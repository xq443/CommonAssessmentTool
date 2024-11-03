import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "./Form.module.css";

function DetailPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  // fetchUsers api call
  useEffect(() => {
    fetchUsers(); // call fetchuser to get user info
  }, []); // The empty dependency array: the function is only called when the component is mounted.

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/${selectedUser.id}'); // call api endpoint /api/users/:id
      setUsers(response.data); // update user data
    } catch (error) {
      console.error("Error fetching users:", error);
      alert('Failed to fetch users.'); 
    }
  };

  const handleUpdate = (user) => {
    debugger
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      // Update existing user
      const response = await axios.put(`http://localhost:3001/api/update-user/${selectedUser.id}`, selectedUser);
      console.log(response.data.message);
      alert('User updated successfully!');
      
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error saving user:", error);
      alert('Failed to save user.');
    }
    setOpen(false);
  };

  

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleUpdate} className={styles.form}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          className={styles.formTitle}
        >
          Client Detail
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputProps={{ inputProps: { min: 18, max: 65 } }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Work Experience (years)"
              name="work_experience"
              type="number"
              value={formData.work_experience}
              onChange={handleChange}
              className={styles.formField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Canadian Work Experience (years)"
              name="canada_workex"
              type="number"
              value={formData.canada_workex}
              onChange={handleChange}
              className={styles.formField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Dependents"
              name="dep_num"
              type="number"
              value={formData.dep_num}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Citizen Status</InputLabel>
              <Select
                name="citizen_status"
                value={formData.citizen_status}
                onChange={handleChange}
                label="Citizen Status"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="citizen">Citizen</MenuItem>
                <MenuItem value="permanent_resident">
                  Permanent Resident
                </MenuItem>
                <MenuItem value="temporary_resident">
                  Temporary Resident
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.canada_born === "true"}
                  onChange={handleChange}
                  name="canada_born"
                />
              }
              label="Born in Canada"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Level of Schooling</InputLabel>
              <Select
                name="level_of_schooling"
                value={formData.level_of_schooling}
                onChange={handleChange}
                label="Level of Schooling"
              >
                <MenuItem value="Grade 0-8">Grade 0-8</MenuItem>
                <MenuItem value="Grade 9">Grade 9</MenuItem>
                <MenuItem value="Grade 10">Grade 10</MenuItem>
                <MenuItem value="Grade 11">Grade 11</MenuItem>

                <MenuItem value="Grade 12 or equivalent">
                  Grade 12 or equivalent
                </MenuItem>
                <MenuItem value="OAC or Grade 13">OAC or Grade 13</MenuItem>
                <MenuItem value="Some college">Some college</MenuItem>
                <MenuItem value="Some university">Some university</MenuItem>
                <MenuItem value="Some apprenticeship">
                  Some apprenticeship
                </MenuItem>
                <MenuItem value="Certificate of Apprenticeship">
                  Certificate of Apprenticeship
                </MenuItem>
                <MenuItem value="Journeyperson">Journeyperson</MenuItem>
                <MenuItem value="Certificate/Diploma">
                  Certificate/Diploma
                </MenuItem>
                <MenuItem value="Bachelor’s degree">Bachelor’s degree</MenuItem>
                <MenuItem value="Post graduate">Post graduate</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.attending_school === "true"}
                  onChange={handleChange}
                  name="attending_school"
                />
              }
              label="Attending School"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.fluent_english === "true"}
                  onChange={handleChange}
                  name="fluent_english"
                />
              }
              label="Fluent in English"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.currently_employed === "true"}
                  onChange={handleChange}
                  name="currently_employed"
                />
              }
              label="Currently Employed"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Time Unemployed (months)"
              name="time_unemployed"
              type="number"
              value={formData.time_unemployed}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.transportation_bool === "true"}
                  onChange={handleChange}
                  name="transportation_bool"
                />
              }
              label="Has Transportation"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.caregiver_bool === "true"}
                  onChange={handleChange}
                  name="caregiver_bool"
                />
              }
              label="Is a Caregiver"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Housing</InputLabel>
              <Select
                name="housing"
                label="housing"
                value={formData.housing}
                onChange={handleChange}
              >
                <MenuItem value="Renting-private">Renting-private</MenuItem>
                <MenuItem value="Renting-subsidized">
                  Renting-subsidized
                </MenuItem>
                <MenuItem value="Boarding or lodging">
                  Boarding or lodging
                </MenuItem>
                <MenuItem value="Homeowner">Homeowner</MenuItem>
                <MenuItem value="Living with family/friend">
                  Living with family/friend
                </MenuItem>
                <MenuItem value="Institution">Institution</MenuItem>
                <MenuItem value="Temporary second residence">
                  Temporary second residence
                </MenuItem>
                <MenuItem value="Band-owned home">Band-owned home</MenuItem>
                <MenuItem value="Homeless or transient">
                  Homeless or transient
                </MenuItem>
                <MenuItem value="Emergency hostel">Emergency hostel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Source of Income</InputLabel>
              <Select
                name="income_source"
                label="Source of Income"
                value={formData.income_source}
                onChange={handleChange}
              >
                <MenuItem value="No Source of Income">
                  No Source of Income
                </MenuItem>
                <MenuItem value="Employment Insurance">
                  Employment Insurance
                </MenuItem>
                <MenuItem value="Ontario Works applied or receiving">
                  Ontario Works applied or receiving
                </MenuItem>
                <MenuItem value="Ontario Disability Support Program applied or receiving">
                  Ontario Disability Support Program applied or receiving
                </MenuItem>
                <MenuItem value="Dependent of someone receiving OW or ODSP">
                  Dependent of someone receiving OW or ODSP
                </MenuItem>
                <MenuItem value="Crown Ward">Crown Ward</MenuItem>
                <MenuItem value="Employment">Employment</MenuItem>
                <MenuItem value="Band-owned home">Band-owned home</MenuItem>
                <MenuItem value="Homeless or transient">
                  Homeless or transient
                </MenuItem>
                <MenuItem value="Self-Employment">Self-Employment</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.felony_bool === "true"}
                  onChange={handleChange}
                  name="felony_bool"
                />
              }
              label="Has Felony"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.substance_use === "true"}
                  onChange={handleChange}
                  name="substance_use"
                />
              }
              label="Substance Use"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.need_mental_health_support_bool === "true"}
                  onChange={handleChange}
                  name="need_mental_health_support_bool"
                  className={styles.checkbox}
                />
              }
              label="Needs Mental Health Support"
              className={styles.formField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reading English Scale (0-10)"
              name="reading_english_scale"
              type="number"
              value={formData.reading_english_scale}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Speaking English Scale (0-10)"
              name="speaking_english_scale"
              type="number"
              value={formData.speaking_english_scale}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Writing English Scale (0-10)"
              name="writing_english_scale"
              type="number"
              value={formData.writing_english_scale}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Numeracy Scale (0-10)"
              name="numeracy_scale"
              type="number"
              value={formData.numeracy_scale}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Computer Scale (0-10)"
              name="computer_scale"
              type="number"
              value={formData.computer_scale}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12} sm={3}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleClearForm}
              fullWidth
            >
              Clear Form
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button type="update" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FormNew;