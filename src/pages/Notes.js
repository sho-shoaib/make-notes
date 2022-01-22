import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(async () => {
    const data = await fetch("http://localhost:8000/notes");
    const res = await data.json();
    setNotes(res);
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakPoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {notes.map((note) => {
          return (
            <div key={note.id}>
              <NoteCard {...note} handleDelete={handleDelete}></NoteCard>
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
}
