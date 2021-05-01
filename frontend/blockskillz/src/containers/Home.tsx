import { Button, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
          <Grid item>
            <Button variant="contained" href="/register">
              Register Your Academic Institution
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" href="/award">
              Award Certificate or Endorse Skill
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
