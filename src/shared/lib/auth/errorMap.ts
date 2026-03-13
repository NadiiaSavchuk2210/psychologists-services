export const getFirebaseErrorMap = (
  tCommon: (key: string) => string
): Record<string, string> => ({
  'auth/email-already-in-use': tCommon('auth.email_exists'),
  'auth/weak-password': tCommon('auth.weak_password'),
  'auth/invalid-email': tCommon('auth.invalid_email'),
  'auth/user-not-found': tCommon('auth.user_not_found'),
  'auth/wrong-password': tCommon('auth.wrong_password'),
  'auth/too-many-requests': tCommon('auth.too_many_requests'),
  'auth/network-request-failed': tCommon('auth.network_error'),

  default: tCommon('error'),
});
