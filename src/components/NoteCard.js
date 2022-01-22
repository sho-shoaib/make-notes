import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { green, yellow } from "@material-ui/core/colors";
import { blue, pink } from "@mui/material/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (category) => {
      if (category.category === "work") return yellow[700];
      if (category.category === "money") return green[700];
      if (category.category === "todos") return pink[700];
      return blue[500];
    },
  },
});

const NoteCard = ({ title, details, category, id, handleDelete }) => {
  const classes = useStyles({ category });

  return (
    <div>
      <Card elevation={3} className={classes.test}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(id)}>
              <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            </IconButton>
          }
          title={title}
          subheader={category}
        ></CardHeader>
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
