const express = require("express");
const {NoteModel} = require("../models/noteModel");
const { auth } = require("../middleware/auth.middleware");

/**
* @swagger
* components:
*   schemas:
*       User:
*           type: object
*           properties:
*               title:
*                   type: string
*                   description: The title of the note
*               description:
*                   type: string
*                   description: The description of the note
*/

const noteRoutes = express.Router();

/**
* @swagger
* tags:
*   name: Notes
*   description: All the API routes related to Notes
*/

/**
* @swagger
* /notes/create:
*   post:
*       summary: To post the details of a new note
*       tags: [Notes]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Note'
*       responses:
*           200:
*               description: Note has been saved
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Note'
*           400:
*               description: Some server error
*/

noteRoutes.post("/create", auth, async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({"msg": "Note has been saved"});
    } catch (error) {
        res.status(400).send({"error": error});
    }
})

/**
* @swagger
* /notes/:
*   get:
*       summary: To get the details of all notes
*       tags: [Notes]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Note'
*       responses:
*           200:
*               description: All the notes of a user
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Note'
*           400:
*               description: Some server error
*/

noteRoutes.get("/", auth, async (req, res) => {
    try {
        const notes = await NoteModel.find({userID: req.body.userID});
        res.status(200).send(notes);
    } catch (error) {
        res.status(400).send({"error": error});
    }
});

/**
* @swagger
* /notes/update:
*   patch:
*       summary: To update the details of a note
*       tags: [Notes]
*       parameters:
*           - in: path
*               name: id
*               schema:
*                   type: string
*               required: true
*               description: The book id
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Note'
*       responses:
*           200:
*               description: Note has been updated
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Note'
*           400:
*               description: Some server error
*/

noteRoutes.patch("/update/:noteID", auth, async (req, res) => {
    const {title, description} = req.body;
    const {noteID} = req.params
    try {
        const note = await NoteModel.findOne({_id: noteID});
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndUpdate({_id: noteID}, {title, description});
            res.status(200).send({"msg": `Note with id ${noteID} has been updated`});
        }else{
            res.status(200).send({"msg": `No note found with id ${noteID} for user ${req.body.user}`});
        }
    } catch (error) {
        res.status(400).send({"error": error});
    }
});

/**
* @swagger
* /notes/delete:
*   delete:
*       summary: To delete the details of a note
*       tags: [Notes]
*       parameters:
*           - in: path
*               name: id
*               schema:
*                   type: string
*               required: true
*               description: The book id
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Note'
*       responses:
*           200:
*               description: Note has been deleted
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Note'
*           400:
*               description: Some server error
*/

noteRoutes.delete("/delete/:noteID", auth, async (req, res) => {
    const {noteID} = req.params
    try {
        const note = await NoteModel.findOne({_id: noteID});
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndDelete({_id: noteID});
            res.status(200).send({"msg": `Note with id ${noteID} has been deleted`});
        }else{
            res.status(200).send({"msg": `No note found with id ${noteID} for user ${req.body.user}`});
        }
    } catch (error) {
        res.status(400).send({"error": error});
    }
})

module.exports = {
    noteRoutes
}
