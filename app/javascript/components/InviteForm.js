import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { networkApiCall } from "../lib/networking";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const InviteForm = ({ onInvite }) => {
  const classes = useStyles();
  const [invitationEmail, setInvitationEmail] = useState("");
  const handleChange = ({ target: { value } }) => setInvitationEmail(value);
  const [errors, setErrors] = useState();

  const handleInvite = (event) => {
    event.preventDefault();
    setErrors([]);
    networkApiCall("/api/v1/invitation", {
      method: "post",
      data: { email: invitationEmail },
    })
      .then((result) => {
        setInvitationEmail("");
        return onInvite(result.data);
      })
      .catch((result) => setErrors(result.errors));
  };

  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} square={"true"}>
        <div className={classes.paper}>
          <Typography component="h3" variant="h5">
            Invite using email
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="invitationEmail"
              label="Invitation email"
              name="invitationEmail"
              autoFocus
              value={invitationEmail}
              onChange={handleChange}
            />
            {errors?.length > 0 && <Alert severity="error">{errors[0]}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleInvite}
            >
              Invite
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default InviteForm;
