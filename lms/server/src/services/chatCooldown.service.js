import ChatCooldown from "../models/chatCooldown.models.js";

export const CHAT_COOLDOWN_OPTIONS = [0, 5, 10, 15, 30, 60, 300];

export const createChatCooldownService = ({
  cooldownModel = ChatCooldown,
  now = () => Date.now(),
} = {}) => {
  const getCooldownId = (liveSessionId, userId) =>
    `${liveSessionId}:${userId}`;

  const getRemainingMs = async ({ liveSessionId, userId }) => {
    const state = await cooldownModel
      .findOne({
        _id: getCooldownId(liveSessionId, userId),
      })
      .select("expiresAt")
      .lean();live

    return Math.max(
      0,
      new Date(state?.expiresAt || 0).getTime() - now()
    );
  };

  const claim = async ({
    liveSessionId,
    userId,
    cooldownSeconds,
  }) => {
    if (!CHAT_COOLDOWN_OPTIONS.includes(cooldownSeconds)) {
      throw new TypeError("Invalid chat cooldown duration");
    }

    if (!cooldownSeconds) {
      return { accepted: true, remainingMs: 0 };
    }

    for (let attempt = 0; attempt < 2; attempt += 1) {
      const currentTime = now();
      const expiresAt = new Date(
        currentTime + cooldownSeconds * 1000
      );

      try {
        const state = await cooldownModel.findOneAndUpdate(
          {
            _id: getCooldownId(liveSessionId, userId),
            liveSession: liveSessionId,
            user: userId,
            $or: [
              { expiresAt: { $lte: new Date(currentTime) } },
              { expiresAt: { $exists: false } },
            ],
          },
          { $set: { expiresAt } },
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
          }
        );

        if (state) {
          return {
            accepted: true,
            expiresAt: state.expiresAt,
            remainingMs: cooldownSeconds * 1000,
          };
        }
      } catch (error) {
        if (error.code !== 11000) {
          throw error;
        }
      }

      const remainingMs = await getRemainingMs({
        liveSessionId,
        userId,
      });

      if (remainingMs > 0) {
        return { accepted: false, remainingMs };
      }
    }

    // An expired ledger entry may be removed by MongoDB's TTL monitor
    // between the conditional update and the state read.
    throw new Error("Unable to establish chat cooldown");
  };

  return {
    claim,
    getRemainingMs,
  };
};

const chatCooldownService = createChatCooldownService();

export const claimChatCooldown = chatCooldownService.claim;
export const getChatCooldownRemainingMs =
  chatCooldownService.getRemainingMs;
