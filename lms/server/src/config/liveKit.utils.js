
import { AccessToken } from "livekit-server-sdk";
import config from "./config.js";

export const generateLiveKitToken = async ({
  roomId,
  participantId,
  participantName,
  canPublish,
}) => {
  const token = new AccessToken(
    config.LIVEKIT_API_KEY,
    config.LIVEKIT_API_SECRET,
    {
      identity: participantId.toString(),
      name: participantName,
      ttl: "10m",
    }
  );

  token.addGrant({
    roomJoin: true,
    room: roomId,
    canPublish,
    canSubscribe: true,
  });

  return await token.toJwt();
};
