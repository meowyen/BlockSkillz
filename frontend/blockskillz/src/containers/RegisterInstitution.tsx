import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingTop: 48,
    paddingBottom: 24,
    textAlign: "center",
  },
  body: {
    fontSize: 20,
    fontWeight: 300,
    maxWidth: 600,
    textAlign: "center",
  },
  button: {
    marginBottom: 12,
    marginTop: 12,
  },
  form: {
    marginTop: 24,
    minWidth: 400,
  },
  steps: {
    maxWidth: 600,
    paddingTop: 48,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 300,
    marginTop: 12,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
  },
  snackbar: {
    backgroundColor: "#666666",
    padding: "12px 24px",
    color: "white",
    maxWidth: 240,
  },
}));

const RegisterInstitution = () => {
  const classes = useStyles();
  const [snackBarOpen, setSnackbarOpen] = useState(false);
  const [keyPair, setKeyPair] = useState<any>({});

  const handleGenerateKeyPair = async () => {
    const response = await axios.get(
      "https://blockskillzkeygen.azurewebsites.net/generate_keys"
    );
    setKeyPair(response.data);
    setSnackbarOpen(true);
  };

  const handleSnackBarClose = async () => {
    setSnackbarOpen(false);
    setKeyPair({});
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={10000}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        key="keypair-snackbar"
      >
        <Grid container className={classes.root} spacing={2}>
          <Grid item>
            <Paper elevation={2} className={classes.snackbar}>
              <div>
                <Typography variant="subtitle1">Private Key</Typography>
              </div>
              <div>
                <Typography variant="body2">{keyPair.private}</Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2} className={classes.snackbar}>
              <div>
                <Typography variant="subtitle1">Public Key</Typography>
              </div>
              <div>
                <Typography variant="body2">{keyPair.public}</Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Snackbar>
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item>
          <Button className={classes.button} variant="contained" href="/">
            Home
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h3">
            Register Your Academic Institution
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Typography className={classes.body}>
            <div>We're excited for you to join this project!</div>
            <div>But first, we need a couple things from you.</div>
          </Typography>
          <Grid
            className={classes.steps}
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Typography className={classes.stepTitle}>
                Step 1. Generate private and public keys.
              </Typography>
              <Typography className={classes.stepText}>
                You will use the private to generate a digital signature when
                awarding certificates or endorsing skills. <b>DO NOT</b> share
                your private key with anyone. Put your public key on your
                website. Employers or other interested parties can then use your
                public key to verify the authenticity of the award or
                endorsement.
              </Typography>
              <div style={{ textAlign: "center" }}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleGenerateKeyPair}
                >
                  Generate Keys
                </Button>
              </div>
            </Grid>
            <Grid item>
              <Typography className={classes.stepTitle}>
                Step 2. Send us a request to be added.
              </Typography>
              <Typography className={classes.stepText}>
                Fill out the form below and send the request. We will get back
                to you when we have processed the request.
              </Typography>
              <Grid
                className={classes.form}
                container
                direction="column"
                spacing={2}
              >
                <Grid item>
                  <TextField required label="Name" fullWidth />
                </Grid>
                <Grid item>
                  <TextField required label="Wallet Address" fullWidth />
                </Grid>
                <Grid item>
                  <TextField required label="Public Key" fullWidth />
                </Grid>
                <Grid item>
                  <TextField required label="Contact Email" fullWidth />
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item>
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                      >
                        Send Request
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterInstitution;
