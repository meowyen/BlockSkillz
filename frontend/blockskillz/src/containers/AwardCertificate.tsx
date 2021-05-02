import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

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
    maxWidth: 600,
  },
}));

const AwardCertificate = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
            Award Certificate or Endorse Skill
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
            <div>
              Fill out the form below to award a certificate or endorse a skill.
              You will need to sign the "Certification or Skill" with your
              private key and provide the signed base64 encoded value as the digital signature.
              Please note that you will be charged gas fees for each
              transaction.
            </div>
          </Typography>

          <Grid
            className={classes.form}
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <TextField required label="Institution Name" fullWidth />
            </Grid>
            <Grid item>
              <TextField required label="Certification or Skill" fullWidth />
            </Grid>
            <Grid item>
              <TextField required label="Recipient Wallet Address" fullWidth />
            </Grid>
            <Grid item>
              <TextField required label="Digital Signature" fullWidth />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Certificate/Endorsement URI"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField label="Expiration Date" fullWidth />
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
                    Transact
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AwardCertificate;
