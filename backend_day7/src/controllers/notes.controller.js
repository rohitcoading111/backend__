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

const getAllNotesController = async (req,res)=> {
   try {
     const allNotes = NotesModel.find();
    res.status(200).json({
        message:"all notes find has been successfully",
        data:allNotes
    })
   } catch (error) {
     res.status(500).json({
        message:"internal server error your notes has been not find please try again",
     });
   }
};