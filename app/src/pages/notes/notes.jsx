import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const [ notes, setNotes ] = useState([]);
    const [ newNoteToggle, setNewNoteToggle ] = useState(false);
    const [ editNoteToggle, setEditNoteToggle ] = useState(false);
    const [ noteDetails, setNoteDetails ] = useState({
        title: "",
        description: ""
    });

    const navigate = useNavigate();

    const getNotes = async () => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }else{
            try {
                const response = await fetch("http://localhost:8080/notes", {
                    method: "GET",
                    headers : {
                        "authorization": `${localStorage.getItem("token")}`
                    }
                })
                const data = await response.json();
                console.log(data);
                setNotes(data)
            } catch (error) {
                console.log(error);
            }
        }
    }
        
    const handleChange = (e) => {
        const {name, value} = e.target; 
        setNoteDetails({
            ...noteDetails,
            [name]: value
        })
    }

    const handleCreateNewNote = async () => {
        if(noteDetails){
            const data = JSON.stringify(noteDetails);
            try {
                const response = await fetch("http://localhost:8080/notes/create", {
                    method: 'POST',
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `${localStorage.getItem("token")}`
                    }
                })

                const res = await response.json()
                console.log(res);

                if(res.msg){
                    setNewNoteToggle(false);
                    alert("New note has been created");
                }
                getNotes();
            } catch (error) {
                alert(error.message);
            }
        }else{
            alert("Empty note cannot be created");
        }
    }

    const submitNoteChanges = async (note, id) => {
        if(note){
            const data = JSON.stringify(note);
            console.log(id);
            try {
                const response = await fetch(`http://localhost:8080/notes/update/${id}`, {
                    method: 'PATCH',
                    body: data,
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `${localStorage.getItem("token")}`
                    }
                });

                const res = await response.json()
                console.log(res);

                if(res.msg){
                    setEditNoteToggle(false);
                    alert("Note has been updated");
                }
                getNotes();
            } catch (error) {
                alert(error.message);
            }
        }else{
            alert("Empty note cannot be saved");
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/notes/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "authorization": `${localStorage.getItem("token")}`
                }
            });

            const res = await response.json()
            console.log(res);

            if(res.msg){
                alert("Note has been deleted");
            }
            getNotes();
        } catch (error) {
            alert(error.message);
        }
        
    }

    useEffect(()=> {
        getNotes();
    },[])

    return (
        <div>
            <h1>Notes Page</h1>
            <br />
            <div>
                <h2>Click to write a new note</h2>
                <button onClick={() => setNewNoteToggle(!newNoteToggle)}>New Note</button>
                <button onClick={() => setEditNoteToggle(!editNoteToggle)}>Edit Note</button>
            </div>
            {
                newNoteToggle ? (
                    <div>
                        <h5>Title</h5>
                        <input type="text" name="title" value={noteDetails.title} onChange={(e)=>handleChange(e)}/>
                        <br />
                        <h5>Description</h5>
                        <input type="text" name="description" value={noteDetails.description} onChange={(e)=>handleChange(e)}/>
                        <br />
                        <button onClick={handleCreateNewNote}>Create</button>
                    </div>
                ) : null
            }
            <div>
                {
                    notes?.map((element, id) => {
                        return (
                            <div key={id+1}>
                                <h3>{id+1}: {element?.title}</h3>
                                <p>{element?.description}</p>
                                <div>
                                    <button onClick={() => handleDelete(element._id)}>Delete</button>
                                </div>
                                {editNoteToggle ? <EditBlock note={element} submitNoteChanges={submitNoteChanges}/>: null}
                            </div>
                        )
                    })
                    
                }
            </div>
        </div>
    )
}

export default Notes;

const EditBlock = ({note, submitNoteChanges}) => {
    const [ noteDetails, setNoteDetails ] = useState({
        title: `${note.title}`,
        description: `${note.description}`,
    })

    const handleChange = (e) => {
        const {name, value} = e.target; 
        setNoteDetails({
            ...noteDetails,
            [name]: value
        })
    }

    return (
        <div>
            <input type="text" value={noteDetails.title} name="title" onChange={(e)=> handleChange(e)}/>
            <br />
            <input type="text" value={noteDetails.description} name="description" onChange={(e)=> handleChange(e)}/>
            <button onClick={() => submitNoteChanges(noteDetails, note._id)}>Save</button>
        </div>
    )
}