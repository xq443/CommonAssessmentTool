// import React, { useEffect, useState } from 'react';
// import { Grid, Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// function ListPage() {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState({});

//   // fetchUsers api call
//   useEffect(() => {
//     fetchUsers(); // call fetchuser to get user info
//   }, []); // The empty dependency array: the function is only called when the component is mounted.

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/api/users'); // call api endpoint
//       setUsers(response.data); // update user data
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       alert('Failed to fetch users.'); 
//     }
//   };

//   const handleUpdate = (user) => {
//     debugger
//     setSelectedUser(user);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSave = async () => {
//     try {
//       // Update existing user
//       const response = await axios.put(`http://localhost:3001/api/update-user/${selectedUser.id}`, selectedUser);
//       console.log(response.data.message);
//       alert('User updated successfully!');
      
//       fetchUsers(); // Refresh the user list
//     } catch (error) {
//       console.error("Error saving user:", error);
//       alert('Failed to save user.');
//     }
//     setOpen(false);
//   };

//   // handle user deletion
//   // const handleDelete = async (user) => {
//   //   console.log("Deleting user with ID:", user.id);
//   //   if (window.confirm("Are you sure you want to delete this user?")) {
//   //     try {
//   //       const response = await axios.delete(`http://localhost:3001/api/delete-user/${user.id}`);
//   //       console.log(response.data.message);
//   //       alert('User deleted successfully!');
//   //       fetchUsers(); // Refresh the user list after deletion
//   //     } catch (error) {
//   //       console.error("Error deleting user:", error);
//   //       alert('Failed to delete user.');
//   //     }
//   //   }
//   // };
  

//   return (
//     <div style={{ padding: "20px" }}>
//       <Grid container spacing={2}>
//         {users.map((user) => (
//           <Grid item xs={12} sm={6} key={user.id}> {/* two cards in everyrow */}
//             <Card sx={{ mb: 2 }}>
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid container spacing={2} justifyContent="space-between">
//                     <Grid item>
//                       <Button onClick={() => handleUpdate(user)}>Update</Button>
//                     </Grid>
//                     {/* <Grid item>
//                       <Button color="error" onClick={handleDelete}>Delete</Button>
//                     </Grid> */}
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Age: {user.age}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Gender: {user.gender}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Work Experience: {user.work_experience}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Canada Work Experience: {user.canada_workex}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Dependent Number: {user.dep_num}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Born in Canada: {user.canada_born === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Citizen Status: {user.citizen_status}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Level of Schooling: {user.level_of_schooling}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Fluent in English: {user.fluent_english === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Reading English Scale: {user.reading_english_scale}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Speaking English Scale: {user.speaking_english_scale}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Writing English Scale: {user.writing_english_scale}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Numeracy Scale: {user.numeracy_scale}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Computer Scale: {user.computer_scale}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Transportation: {user.transportation_bool === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Caregiver: {user.caregiver_bool === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Housing: {user.housing}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Income Source: {user.income_source}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Felony: {user.felony_bool === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Attending School: {user.attending_school === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Currently Employed: {user.currently_employed === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Substance Use: {user.substance_use === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Time Unemployed: {user.time_unemployed}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography color="text.secondary">
//                       Need Mental Health Support: {user.need_mental_health_support_bool === "true" ? "Yes" : "No"}
//                     </Typography>
//                   </Grid>
//                 </Grid>

//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Update User</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 label="Age"
//                 value={selectedUser.age}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Work Experience"
//                 value={selectedUser.work_experience}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, work_experience: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Canada Work Experience"
//                 value={selectedUser.canada_workex}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, canada_workex: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Dependent Number"
//                 value={selectedUser.dep_num}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, dep_num: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Citizen Status"
//                 value={selectedUser.citizen_status}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, citizen_status: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Level of Schooling"
//                 value={selectedUser.level_of_schooling}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, level_of_schooling: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Fluent in English"
//                 value={selectedUser.fluent_english}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, fluent_english: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Reading English Scale"
//                 value={selectedUser.reading_english_scale}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, reading_english_scale: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Speaking English Scale"
//                 value={selectedUser.speaking_english_scale}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, speaking_english_scale: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Writing English Scale"
//                 value={selectedUser.writing_english_scale}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, writing_english_scale: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Numeracy Scale"
//                 value={selectedUser.numeracy_scale}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, numeracy_scale: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Computer Scale"
//                 value={selectedUser.computer_scale}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, computer_scale: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Time Unemployed"
//                 value={selectedUser.time_unemployed}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, time_unemployed: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Gender
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.gender}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="male" control={<Radio />} label="Male" />
//                 <FormControlLabel value="female" control={<Radio />} label="Female" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Born in Canada
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.canada_born}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, canada_born: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Transportation
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.transportation_bool}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, transportation_bool: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Caregiver
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.caregiver_bool}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, caregiver_bool: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Housing
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.housing}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, housing: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Income Source
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.income_source}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, income_source: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Felony
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.felony_bool}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, felony_bool: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Attending School
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.attending_school}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, attending_school: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Currently Employed
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.currently_employed}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, currently_employed: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Substance Use
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.substance_use}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, substance_use: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
//                 Need Mental Health Support
//               </Typography>
//               <RadioGroup
//                 row
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name="row-radio-buttons-group"
//                 value={selectedUser.need_mental_health_support_bool}
//                 onChange={(e) => setSelectedUser({ ...selectedUser, need_mental_health_support_bool: e.target.value })}
//                 sx={{ mb: 2 }}
//               >
//                 <FormControlLabel value="true" control={<Radio />} label="Yes" />
//                 <FormControlLabel value="false" control={<Radio />} label="No" />
//               </RadioGroup>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default ListPage;
