import { useRef, useEffect, useState } from 'react'
import Trash from '../icons/Trash'
import { setNewOffset, autoGrow, setZindex, bodyParser } from '../utils'
import { db } from "../appwrite/databases";
const NoteCard = ({ note }) => {
    let [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const body = bodyParser(note.body);

    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const textAreaRef = useRef(null);

    useEffect(() => {
        autoGrow(textAreaRef);
    }, []);

    const keyUpTimer = useRef(null);
    const [saving, setSaving] = useState(false);

    const handleKeyUp = async() => {
        setSaving(true);

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(() => {
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };





    

    const mouseDown = (e) => {
        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);

        setZindex(cardRef.current);
        
    };
    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        console.log("mouseMoveDir: ", mouseMoveDir);

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

        setPosition(newPosition);
    };

    const saveData = async (key,value) => {
        const payload = { [key]: JSON.stringify(value) };
        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
          console.log(error);
          alert("Error saving note");
          return;
        }
        setSaving(false);
      };


    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    };

    

    

    return (
        <div
            className="card"
            ref={cardRef}
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div 
            onMouseDown={mouseDown}
            className='card-header'
            style={{ backgroundColor: colors.colorHeader }}
            >
            
                <Trash />

                {saving && (
        <div className="card-saving">
            <span style={{ color: colors.colorText }}>Saving...</span>
        </div>
        
    )};
            </div>
             
             
             <div className='card-body'>
            <textarea 
            ref={textAreaRef}
            style={{ color: colors.colorText }}
            defaultValue={body}
            onInput={(e) => autoGrow(textAreaRef)}
            onFocus={() => setZindex(cardRef.current)}
            onKeyUp={handleKeyUp}
            
            ></textarea>

        </div>
            
        </div>

        
    );
};
  

export default NoteCard