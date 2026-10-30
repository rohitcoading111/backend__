
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createLiveSessionThunk,
  endLiveSessionThunk,
} from "../thunks/liveSessionThunk";

function useLiveSession() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    session,
    token,
    liveKitUrl,
    loading,
    error,
  } = useSelector((state) => state.liveSession);

  const [selectedCourseId, setSelectedCourseId] = useState("");

  // Start live session
  const handleStartLive = async () => {
    if (!selectedCourseId) {
      alert("Please select a course");
      return;
    }

    try {
      const result = await dispatch(
        createLiveSessionThunk(selectedCourseId)
      ).unwrap();

      // Navigate to live room after successful creation
      navigate("/instructor/live-room", {
        state: {
          session: result.session,
          token: result.token,
          liveKitUrl: result.liveKitUrl,
        },
      });
    } catch (error) {
      console.error("Start live error:", error);
    }
  };

  // End live session
  const handleEndLive = async () => {
    if (!session?._id) return;

    try {
      await dispatch(
        endLiveSessionThunk(session._id)
      ).unwrap();
    } catch (error) {
      console.error("End live error:", error);
    }
  };

  return {
    selectedCourseId,
    setSelectedCourseId,
    handleStartLive,
    handleEndLive,
    session,
    token,
    liveKitUrl,
    loading,
    error,
  };
}

export default useLiveSession;
