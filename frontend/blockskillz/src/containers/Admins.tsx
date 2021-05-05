import {
  Button,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { Ethereum } from "../Ethereum";

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
}));

const Admins = () => {
  const { currentAccount, isAdmin, getContract } = useContext(Ethereum);
  const classes = useStyles();
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleAddressChange = (event: any) => {
    setWalletAddress(event.target.value);
  };

  const handleRegister = async () => {
    const trimmedAddress = walletAddress.trim();
    const contract = await getContract();
    if (isAdmin && contract && currentAccount && trimmedAddress) {
      await contract.methods
        .addAdmin(trimmedAddress)
        .send({ from: currentAccount })
        .on("receipt", async (receipt: any) => {
          console.log(`Transaction successful: ${receipt.transactionHash}`);
          setSnackBarMessage(
            `Transaction successful: ${receipt.transactionHash}`
          );
          setSnackBarOpen(true);

          // clear form
          setWalletAddress("");
        })
        .on("error", (error: any) => {
          console.log(error);
        });
    }
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    setSnackBarMessage("");
  };

  if (!isAdmin) {
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center" justify="center">
        <Grid item>
          <Button className={classes.button} variant="contained" href="/">
            Home
          </Button>
        </Grid>
      </Grid>
    </div>;
  }

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        open={snackBarOpen}
        onClose={handleSnackBarClose}
        message={snackBarMessage}
        key="notification-snackbar"
      />
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
            Manage Admins
          </Typography>
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography className={classes.stepTitle}>
                Register New Admin
              </Typography>
              <Grid
                className={classes.form}
                container
                direction="column"
                spacing={2}
              >
                <Grid item>
                  <TextField
                    required
                    label="Wallet Address"
                    value={walletAddress}
                    fullWidth
                    onChange={handleAddressChange}
                  />
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
                        onClick={handleRegister}
                      >
                        Register
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

export default Admins;
