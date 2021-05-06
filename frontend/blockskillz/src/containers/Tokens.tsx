import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { Ethereum } from "../Ethereum";
import { Contract, EventData } from "web3-eth-contract";
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
  table: {
    minWidth: 640,
  },
}));

interface Certification {
  institution_name: string;
  certification: string;
  signature: string;
  uri: string;
  expirationInMs: string;
}

const Tokens = () => {
  const { currentAccount, getContract } = useContext(Ethereum);
  const [contract, setContract] = useState<Contract>();
  const [events, setEvents] = useState<EventData[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const classes = useStyles();

  const getCertifications = useCallback(async () => {
    if (contract) {
      const userCertifications = await Promise.all(
        events.map(async (event) => {
          const certification = await contract.methods
            .certifications(event.returnValues.tokenId)
            .call();
          return certification;
        })
      );

      setCertifications(userCertifications);
    } else {
      setCertifications([]);
    }
  }, [events]);

  useEffect(() => {
    getContract().then(setContract);
  }, [getContract]);

  useEffect(() => {
    if (currentAccount && contract) {
      contract
        .getPastEvents("Transfer", {
          filter: {
            to: currentAccount,
          },
          fromBlock: 0,
          toBlock: "latest",
        })
        .then(function (results) {
          setEvents(results);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setEvents([]);
    }
  }, [contract, currentAccount]);

  useEffect(() => {
    getCertifications();
  }, [getCertifications]);

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
            Your Tokens
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
              <Typography>Account: {currentAccount}</Typography>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Certification</TableCell>
                      <TableCell>Institution</TableCell>
                      <TableCell>Expires</TableCell>
                      <TableCell>Signature</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {certifications.map((cert, idx) => (
                      <TableRow key={`cert-${idx}`}>
                        <TableCell>
                          <a href={cert.uri} target="_blank" rel="noreferrer">
                            {cert.certification}
                          </a>
                        </TableCell>
                        <TableCell>{cert.institution_name}</TableCell>
                        <TableCell>
                          {cert.expirationInMs === "0"
                            ? "N/A"
                            : DateTime.fromMillis(
                                parseInt(cert.expirationInMs)
                              ).toISODate()}
                        </TableCell>
                        <TableCell>{cert.signature}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Tokens;
