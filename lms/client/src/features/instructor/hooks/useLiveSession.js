
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  createLiveSessionThunk,
  endLiveSessionThunk,
  getActiveLiveSessionThunk,
} from "../thunks/liveSessionThunk";

function useLiveSession() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    session,
    activeSession,
    activeSessionCourseId,
    loading,
    error,
  } = useSelector((state) => state.liveSession);

  const [selectedCourseId, setSelectedCourseId] = useState(
    location.state?.liveSessionCourseId || ""
  );
  const [resumeError, setResumeError] = useState(null);

  useEffect(() => {
    if (!selectedCourseId) return;

    dispatch(getActiveLiveSessionThunk(selectedCourseId));
  }, [dispatch, selectedCourseId]);

  const handleCourseChange = (courseId) => {
    setResumeError(null);
    setSelectedCourseId(courseId);
  };

  // Continue an active session, or start a new one if none exists.
  const handleStartLive = async () => {
    if (!selectedCourseId) {
      alert("Please select a course");
      return;
    }

    try {
      if (activeSession && activeSessionCourseId === selectedCourseId) {
        const credentials = await dispatch(
          getActiveLiveSessionThunk(selectedCourseId)
        ).unwrap();

        if (
          !credentials?.session ||
          !credentials.token ||
          !credentials.liveKitUrl
        ) {
          setResumeError(
            "The live session is no longer available. Check the course status and try again."
          );
          return;
        }

        navigate("/instructor/live-room", {
          state: {
            session: credentials.session,
            token: credentials.token,
            liveKitUrl: credentials.liveKitUrl,
          },
        });
        return;
      }

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
      setResumeError(
        typeof error === "string"
          ? error
          : error?.message || "Unable to continue the live session."
      );
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
    setSelectedCourseId: handleCourseChange,
    handleStartLive,
    handleEndLive,
    session,
    activeSession,
    activeSessionCourseId,
    resumeError,
    loading,
    error,
  };
}

export default useLiveSession;
