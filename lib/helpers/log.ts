import { DEBUG } from '../config';

export function logHelper(logLevel: keyof Console, message: string, ...optionalParams: any[]) {
  if (DEBUG === 'true') {
    (console as any)[logLevel](message, ...optionalParams);
  }
}
