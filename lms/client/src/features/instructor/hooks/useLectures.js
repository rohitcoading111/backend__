import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLectureThunk ,getLecturesThunk } from "../thunks/lectureThunk";
import { useEffect } from "react";

function useLectures(moduleId) {


  const dispatch = useDispatch();

  const { lecture, lectures, loading, error } = useSelector(
  (state) => state.lectures
);

  useEffect(() => {
  if (moduleId) {
    dispatch(getLecturesThunk(moduleId));
  }
}, [moduleId, dispatch]);
 
   

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [order, setOrder] = useState(1);
  const [video, setVideo] = useState(null);

  const handleSubmit =async (e) => {
  e.preventDefault();

  // Title validation
  if (!title.trim()) {
    alert("Please enter lecture title");
    return;
  }

  // Video validation
  if (!video) {
    alert("Please select a lecture video");
    return;
  }

  // Notes validation
  if (!notes.trim()) {
    alert("Please enter lecture notes");
    return;
  }

  // Order validation
  if (!order || Number(order) < 1) {
    alert("Please enter a valid lecture order");
    return;
  }

  const formData = new FormData();

    formData.append("title", title);
    formData.append("notes", notes);
    formData.append("order", Number(order));
    formData.append("video", video);

    try {
      await dispatch(
      createLectureThunk({
      moduleId,
      formData,
    })
     ).unwrap();
     setTitle("");
     setNotes("");
     setOrder(1);
     setVideo(null);

    } catch (error) {
      console.error(error);
    }
  };




  return {
  title,
  setTitle,
  notes,
  setNotes,
  order,
  setOrder,
  video,
  setVideo,
  handleSubmit,
  lecture,
  loading,
  error,
  lectures
};


}

export default useLectures;