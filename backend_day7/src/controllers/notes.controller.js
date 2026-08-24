const NotesModel = require("../model/notes.model")

const createNotesController = async (req,res)=> {
    try {
        let {title,description} = req.body;
        let newNote = await NotesModel.create({
            title,
            description
         }   
        )
        return res.status(201).json({
            message: "note created successfully",
            data: newNote,
        })
    } catch (error) {
        return res.status(500).json({
            message:"api not be successed",
        })
    }
}