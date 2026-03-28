import axios from 'axios';

import { TIME } from '@shared/constants';

export const http = axios.create({
  timeout: TIME.TEN_SECONDS,
});
