const express = require("express");
const {NoteModel} = require("../models/noteModel");
const { auth } = require("../middleware/auth.middleware");

const noteRoutes = express.Router();

noteRoutes.post("/create", auth, async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({"msg": "Note has been saved"});
    } catch (error) {
        res.status(400).send({"error": error});
    }
})

noteRoutes.get("/", auth, async (req, res) => {
    try {
        const notes = await NoteModel.find({userID: req.body.userID});
        res.status(200).send(notes);
    } catch (error) {
        res.status(400).send({"error": error});
    }
})

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
})

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
