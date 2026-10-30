import {
  VideoTrack,
  useTracks,
} from "@livekit/components-react";

import { Track } from "livekit-client";
import { useState, useRef } from "react";

function StudentClassroomLayout() {
  const tracks = useTracks([
    Track.Source.ScreenShare,
    Track.Source.Camera,
  ]);

  const screenTrack = tracks.find(
    (track) => track.source === Track.Source.ScreenShare
  );

  const cameraTrack = tracks.find(
    (track) => track.source === Track.Source.Camera
  );

  // Floating panel position
  const [position, setPosition] = useState(null);

  // Dragging information
  const dragRef = useRef(null);

  // Start dragging
  const handlePointerDown = (e) => {
    const panel = e.currentTarget.parentElement;
    const rect = panel.getBoundingClientRect();

    dragRef.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    setPosition({
      x: rect.left,
      y: rect.top,
    });

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Move floating panel
  const handlePointerMove = (e) => {
    if (!dragRef.current) return;

    const panel = e.currentTarget.parentElement;
    const rect = panel.getBoundingClientRect();

    const panelWidth = rect.width;
    const panelHeight = rect.height;

    const x = Math.max(
      0,
      Math.min(
        e.clientX - dragRef.current.offsetX,
        window.innerWidth - panelWidth
      )
    );

    const y = Math.max(
      0,
      Math.min(
        e.clientY - dragRef.current.offsetY,
        window.innerHeight - panelHeight
      )
    );

    setPosition({ x, y });
  };

  // Stop dragging
  const handlePointerUp = (e) => {
    dragRef.current = null;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-black">

      {/* FULL SCREEN SHARED CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">

        {screenTrack ? (
          <VideoTrack
            trackRef={screenTrack}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="text-center text-white">
            <p className="text-xl font-semibold">
              Waiting for instructor screen...
            </p>
          </div>
        )}

      </div>

      {/* DRAGGABLE PARTICIPANT PANEL */}
      <div
        className="absolute z-20 w-48 sm:w-56 overflow-hidden rounded-xl border border-white/30 bg-slate-900 shadow-2xl"
        style={
          position
            ? {
                left: position.x,
                top: position.y,
                right: "auto",
              }
            : {
                right: "16px",
                top: "16px",
              }
        }
      >

        {/* DRAG HANDLE */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex cursor-grab touch-none items-center justify-between bg-slate-800 px-3 py-2 active:cursor-grabbing"
        >
          <span className="text-xs font-semibold text-white">
            Participants
          </span>

          <span className="text-white text-lg leading-none">
            ⠿
          </span>
        </div>

        {/* INSTRUCTOR CAMERA */}
        <div className="relative aspect-video bg-slate-800">

          {cameraTrack ? (
            <VideoTrack
              trackRef={cameraTrack}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-white">
              Instructor camera off
            </div>
          )}

          <div className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            Instructor
          </div>

        </div>

        {/* STUDENT PLACEHOLDER */}
        <div className="relative flex aspect-video items-center justify-center border-t border-white/20 bg-slate-800">

          <div className="text-center text-white">
            <div className="text-3xl">👤</div>
            <p className="mt-1 text-xs">You</p>
          </div>

        </div>

      </div>

      {/* SCREEN LABEL */}
      <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-black/70 px-3 py-2 text-sm text-white">
        Instructor's Screen
      </div>

    </div>
  );
}




export default StudentClassroomLayout