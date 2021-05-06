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
import { DateTime } from "luxon";

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
  const { currentAccount, isInstitution, getContract } = useContext(Ethereum);
  const [name, setName] = useState("");
  const [cert, setCert] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [uri, setUri] = useState("");
  const [expiration, setExpiration] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleAwardCertificate = async () => {
    if (isInstitution) {
      const trimmedName = name.trim();
      const trimmedCert = cert.trim();
      const trimmedRecipient = recipientAddress.trim();
      const trimmedSignature = signature.trim();
      const trimmedUri = uri.trim();
      const contract = await getContract();

      const expirationInMs = DateTime.fromISO(expiration).toMillis();

      if (
        contract &&
        trimmedName &&
        trimmedCert &&
        trimmedRecipient &&
        trimmedSignature
      ) {
        await contract.methods
          .awardCertification(
            recipientAddress,
            trimmedName,
            trimmedCert,
            trimmedSignature,
            trimmedUri,
            isNaN(expirationInMs) ? 0 : expirationInMs
          )
          .send({ from: currentAccount })
          .on("receipt", async (receipt: any) => {
            console.log(`Transaction successful: ${receipt.transactionHash}`);
            setSnackBarMessage(
              `Transaction successful: ${receipt.transactionHash}`
            );
            setSnackBarOpen(true);

            // clear form
            setName("");
            setCert("");
            setRecipientAddress("");
            setSignature("");
            setUri("");
            setExpiration("");
          })
          .on("error", (error: any) => {
            console.log(error);
          });
      }
    }
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    setSnackBarMessage("");
  };

  if (!isInstitution) {
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
              private key and provide the signed base64 encoded value as the
              digital signature. Please note that you will be charged gas fees
              for each transaction.
            </div>
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
                label="Institution Name"
                value={name}
                fullWidth
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Certification or Skill"
                value={cert}
                fullWidth
                onChange={(event) => setCert(event.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Recipient Wallet Address"
                value={recipientAddress}
                fullWidth
                onChange={(event) => setRecipientAddress(event.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Digital Signature"
                value={signature}
                fullWidth
                onChange={(event) => setSignature(event.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Certificate/Endorsement URI"
                value={uri}
                fullWidth
                onChange={(event) => setUri(event.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                type="date"
                label="Expiration Date"
                value={expiration}
                fullWidth
                onChange={(event) => setExpiration(event.target.value)}
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
                    onClick={handleAwardCertificate}
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
