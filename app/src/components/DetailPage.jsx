import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Button,
  Box,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from 'axios';
import styles from "./Form.module.css";

function Client() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    work_experience: 0,
    canada_workex: 0,
    dep_num: 0,
    canada_born: "false",
    citizen_status: "",
    level_of_schooling: "",
    fluent_english: "false",
    reading_english_scale: 0,
    speaking_english_scale: 0,
    writing_english_scale: 0,
    numeracy_scale: 0,
    computer_scale: 0,
    transportation_bool: "false",
    caregiver_bool: "false",
    housing: "",
    income_source: "",
    felony_bool: "false",
    attending_school: "false",
    currently_employed: "false",
    substance_use: "false",
    time_unemployed: 0,
    need_mental_health_support_bool: "false",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/client/${id}`);
        setSelectedUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);


  const handleSave = async () => {
    try {
      // Update existing user
      const response = await axios.put(`http://localhost:3001/api/update-user/${id}`, selectedUser);
      console.log(response.data.message);
      alert('User updated successfully!');
    } catch (error) {
      console.error("Error saving user:", error);
      alert('Failed to save user.');
    }
    setOpen(false);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: change url to use an env variable to make it easier to change when deploying in different environments
      const response = await axios.post(
        "http://ec2-34-219-155-200.us-west-2.compute.amazonaws.com:8000/clients/predictions",
        selectedUser
      );
      console.log(response);
      console.log(response.data);

      const probability = response.data.baseline;

      const interventions = response.data.interventions;
      navigate("/results", { state: { selectedUser, probability, interventions } });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <Box sx={{ width: 800, margin: '50px auto' }}>
      <Typography
          variant="h4"
          component="h2"
          gutterBottom
          className={styles.formTitle}
        >
          Client Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            type="text"
            value={selectedUser.firstName}
            onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }} // Ensures label shrinks when there is content

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            type="text"
            value={selectedUser.lastName}
            onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }} 
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Age"
            type="number"
            name="age"
            value={selectedUser.age}
            onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })}
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
                value={selectedUser.gender}
                label="Gender"
                onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}
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
            label="Work Experience"
            name="work_experience"
            type="number"
            value={selectedUser.work_experience}
            onChange={(e) => setSelectedUser({ ...selectedUser, work_experience: e.target.value })}
            className={styles.formField}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Canada Work Experience"
            value={selectedUser.canada_workex}
            onChange={(e) => setSelectedUser({ ...selectedUser, canada_workex: e.target.value })}
            className={styles.formField}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Dependents"
              name="dep_num"
              type="number"
              value={selectedUser.dep_num}
              onChange={(e) => setSelectedUser({ ...selectedUser, dep_num: e.target.value })}
            />
          </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Citizen Status</InputLabel>
              <Select
                name="citizen_status"
                value={selectedUser.citizen_status}
                onChange={(e) => setSelectedUser({ ...selectedUser, citizen_status: e.target.value })}
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
                  checked={selectedUser.canada_born === "true"}
                  onChange={(e) => setSelectedUser({ ...selectedUser, canada_born: e.target.checked ? "true" : "false"})}
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
                value={selectedUser.level_of_schooling}
                onChange={(e) => setSelectedUser({ ...selectedUser, level_of_schooling: e.target.value })}
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
                  checked={selectedUser.attending_school === "true"}
                  onChange={(e) => setSelectedUser({ ...selectedUser, attending_school: e.target.checked ? "true" : "false"})}
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
                  checked={selectedUser.fluent_english === "true"}
                  onChange={(e) => setSelectedUser({ ...selectedUser, fluent_english: e.target.value })}
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
                  checked={selectedUser.currently_employed === "true"}
                  onChange={(e) => setSelectedUser({ ...selectedUser, currently_employed: e.target.checked ? "true" : "false" })}
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
              value={selectedUser.time_unemployed}
              onChange={(e) => setSelectedUser({ ...selectedUser, time_unemployed: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedUser.transportation_bool === "true"}
                  onChange={(e) => setSelectedUser({ ...selectedUser, transportation_bool: e.target.checked ? "true" : "false"  })}
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
                  checked={selectedUser.caregiver_bool === "true"}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, caregiver_bool: e.target.checked ? "true" : "false" })
                  }
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
                value={selectedUser.housing}
                onChange={(e) => setSelectedUser({ ...selectedUser, housing: e.target.value })}
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
                value={selectedUser.income_source}
                onChange={(e) => setSelectedUser({ ...selectedUser, income_source: e.target.value })}
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
                  checked={selectedUser.felony_bool === "true"}
                  onChange={(e) => setSelectedUser({ ...selectedUser, felony_bool: e.target.checked ? "true" : "false" })}
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
                checked={selectedUser.substance_use === "true"} // Compare with string "true" to determine checked state
                onChange={(e) => setSelectedUser({ ...selectedUser, substance_use: e.target.checked ? "true" : "false" })} // Convert to string
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
                  checked={selectedUser.need_mental_health_support_bool  === "true"}
                  onChange={(e) => setSelectedUser({ ...selectedUser, need_mental_health_support_bool: e.target.checked ? "true" : "false" })}
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
              value={selectedUser.reading_english_scale}
              onChange={(e) => setSelectedUser({ ...selectedUser, reading_english_scale: e.target.value })}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Speaking English Scale (0-10)"
              name="speaking_english_scale"
              type="number"
              value={selectedUser.speaking_english_scale}
              onChange={(e) => setSelectedUser({ ...selectedUser, speaking_english_scale: e.target.value })}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Writing English Scale (0-10)"
              name="writing_english_scale"
              type="number"
              value={selectedUser.writing_english_scale}
              onChange={(e) => setSelectedUser({ ...selectedUser, writing_english_scale: e.target.value })}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Numeracy Scale (0-10)"
              name="numeracy_scale"
              type="number"
              value={selectedUser.numeracy_scale}
              onChange={(e) => setSelectedUser({ ...selectedUser, numeracy_scale: e.target.value })}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Computer Scale (0-10)"
              name="computer_scale"
              type="number"
              value={selectedUser.computer_scale}
              onChange={(e) => setSelectedUser({ ...selectedUser, computer_scale: e.target.value })}
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
      <Button type="update" variant="contained" color="primary" onClick={handleSave} fullWidth>
              Update
      </Button>
      </Grid>
      {/* <Grid item xs={12} sm={3}>
      <Button type="submit" variant="contained" color="secondary" onClick={handleSubmit} fullWidth>
              Submit
      </Button>
      </Grid> */}
    </Grid>
    </Box>
  );
}

export default Client;
