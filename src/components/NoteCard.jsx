import { useRef, useEffect, useState } from 'react'
import Trash from '../icons/Trash'
import { setNewOffset, autoGrow, setZindex, bodyParser } from '../utils'
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


    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
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
            </div>
             
             
             <div className='card-body'>
            <textarea 
            ref={textAreaRef}
            style={{ color: colors.colorText }}
            defaultValue={body}
            onInput={(e) => autoGrow(textAreaRef)}
            onFocus={() => setZindex(cardRef.current)}
            
            ></textarea>

        </div>
            
        </div>

        
    );
};
  

export default NoteCard