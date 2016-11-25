import { DAYS_OF_WEEK } from './constants';

export function daySorter(a, b) {
  return DAYS_OF_WEEK.indexOf(a) > DAYS_OF_WEEK.indexOf(b);
}
