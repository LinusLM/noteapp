import {useState, useEffect} from 'react'
// import { fakeData as notes } from '../assets/fakeData'
import { db } from "../appwrite/databases";
import NoteCard from '../components/NoteCard'
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

const NotesPage = () => {
    const { notes, setNotes } = useContext(NoteContext);
 
    
  return <div>
        {notes.map(note => (
            <NoteCard key={note.$id} note={note} />
        ))}
    </div>
  
}

export default NotesPage