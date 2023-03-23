import React, { useState, useEffect, useContext } from "react";
import { networkApiCall, AUTH_DESTROY_END_POINT } from "../lib/networking";

import InvitationsSent from "../components/InvitationsSent";
import InviteForm from "../components/InviteForm";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const { user, logOut } = useContext(AuthContext);
  const [invitations, setInvitations] = useState([]);
  useEffect(() => {
    networkApiCall("/api/v1/invitation")
      .then((result) => setInvitations(result.data.results))
      .catch((result) => setErrors(result.errors));
  }, []);

  const onInvite = (newInvite) => setInvitations([...invitations, newInvite]);

  const handleLogout = (event) => {
    event.preventDefault();
    networkApiCall(AUTH_DESTROY_END_POINT, {
      method: "delete",
    }).then(() => logOut());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Logged in: {user?.email}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <InviteForm onInvite={onInvite} />
      <InvitationsSent invitations={invitations} />
    </>
  );
};

export default HomePage;
