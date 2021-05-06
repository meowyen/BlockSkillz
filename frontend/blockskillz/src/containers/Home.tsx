import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { Ethereum } from "../Ethereum";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    padding: 48,
    textAlign: "center",
  },
  body: {
    fontSize: 20,
    fontWeight: 300,
    maxWidth: 600,
    textAlign: "center",
  },
  actions: {
    paddingTop: 48,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { isAdmin, isInstitution } = useContext(Ethereum);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h1">
            BlockSkillz
          </Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography className={classes.body}>
            Track certifications and endorsed skills on the blockchain where
            employers can quickly and easily verify your qualifications.
          </Typography>
        </Grid>
        <Grid
          className={classes.actions}
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {isAdmin && (
            <>
              <Grid item>
                <Button variant="contained" href="/admins">
                  Manage Admins
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" href="/institutions">
                  Manage Institutions
                </Button>
              </Grid>
            </>
          )}
          {!isAdmin && (
            <Grid item>
              <Button variant="contained" href="/register">
                Register Your Academic Institution
              </Button>
            </Grid>
          )}
          {isInstitution && (
            <Grid item>
              <Button variant="contained" color="primary" href="/award">
                Award Certificate or Endorse Skill
              </Button>
            </Grid>
          )}
          {!isAdmin && !isInstitution && (
            <Grid item>
              <Button variant="contained" color="secondary" href="/tokens">
                My Tokens
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
