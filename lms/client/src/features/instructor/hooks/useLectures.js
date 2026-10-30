import { useState } from "react";

function useLectures() {

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [order, setOrder] = useState(1);
  const [video, setVideo] = useState(null);

  const handleSubmit = (e) => {
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
 
};


  // Loading and error states


  // Submit handler


  return {
  title,
  setTitle,
  notes,
  setNotes,
  order,
  setOrder,
  video,
  setVideo
};


}

export default useLectures;