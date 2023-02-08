import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  toolbar: theme.mixins.toolbar,
  layout: {
    marginTop: "5%",
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  form: {
    marginleft: "70%",
    marginright: "10%",
  },
  paper: {
    padding: "3% 1%",
    width: "20%",
    margin: " 1% auto",
  },
  header: {
    margin: 0,
  },
  avatar: {
    background: "#9DCC6C",
  },
  button: {
    background: "#9DCC6C",
  },
}));
