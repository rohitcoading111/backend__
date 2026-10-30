import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLectureThunk } from "../thunks/lectureThunk";


function useLectures(moduleId) {


  const dispatch = useDispatch();

    const { lecture, loading, error } = useSelector(
    (state) => state.lectures
  );


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
  error
};


}

export default useLectures;