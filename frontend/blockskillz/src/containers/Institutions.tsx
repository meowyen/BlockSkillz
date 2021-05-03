import {
  Button,
  Grid,
  makeStyles,
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

const Institutions = () => {
  const { currentAccount, getContract } = useContext(Ethereum);
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event: any) => {
    setWalletAddress(event.target.value);
  };

  const handleRegister = async () => {
    const trimmedName = name.trim();
    const trimmedAddress = walletAddress.trim();
    const contract = await getContract();
    if (contract && currentAccount && trimmedName && trimmedName) {
      await contract.methods
        .addInstitution(trimmedAddress, trimmedName)
        .send({ from: currentAccount })
        .on("receipt", async (receipt: any) => {
          console.log(`Transaction successful: ${receipt.transactionHash}`);

          // clear form
          setName("");
          setWalletAddress("");
        })
        .on("error", (error: any) => {
          console.log(error);
        });
    }
  };

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
            Manage Institutions
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
                Register New Institution
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
                    label="Name"
                    value={name}
                    fullWidth
                    onChange={handleNameChange}
                  />
                </Grid>
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

export default Institutions;
