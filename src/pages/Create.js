import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles({
  head: {
    marginTop: 10,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = async (e) => {
    e.preventDefault();

    !title && setTitleError(true);
    !details && setDetailsError(true);

    title && setTitleError(false);
    details && setDetailsError(false);

    if (title && details) {
      const data = await fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title,
          details,
          category,
        }),
      });
      await history.push("/");
    }
  };

  return (
    <Container>
      <Typography
        className={classes.head}
        variant='h6'
        component='h2'
        color='textSecondary'
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete='false' onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label='Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          className={classes.field}
          error={titleError}
        ></TextField>

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          label='Details'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          className={classes.field}
          error={detailsError}
        ></TextField>

        <FormControl className={classes.field}>
          <FormLabel>Note category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value='money' control={<Radio />} label='Money' />
            <FormControlLabel value='todos' control={<Radio />} label='Todos' />
            <FormControlLabel value='work' control={<Radio />} label='Work' />
            <FormControlLabel
              value='reminders'
              control={<Radio />}
              label='Reminders'
            />
          </RadioGroup>
        </FormControl>

        <Button
          type='submit'
          variant='contained'
          color='secondary'
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
