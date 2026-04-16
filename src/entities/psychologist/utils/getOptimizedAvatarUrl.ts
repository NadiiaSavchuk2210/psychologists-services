const avatarIdPattern = /\/avatars\/(\d+)(?:\.[a-z]+)?(?:\?.*)?$/i;

export const getOptimizedAvatarUrl = (avatarUrl: string) => {
  const avatarId = avatarUrl.match(avatarIdPattern)?.[1];

  if (!avatarId) {
    return avatarUrl;
  }

  return `/avatars/${avatarId}.jpg`;
};
