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

const singleNoteController = async (req,res)=> {
   try {
    let noteId = req.params.id;
    let note = await NotesModel.findById(noteId);
    res.status(200).json({
        message:"your note has been successfully finded",
        data:note
    })
   } catch (error) {
    res.status(500).json({
        message:"internal error your note has been note finded please try again after some time later"
    })
   }
}

const getUpdatedNoteController = async(req,res)=>{
     try {
     let noteId = req.params.id;
     let body = req.body;

    let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {
      new: true,
    });

    return res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};