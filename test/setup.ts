// setup file.
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as module from '../src/warning';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
configure({adapter: new Adapter()});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.__DEV__ = true;

// eslint-disable-next-line no-console
const consoleError = console.error;
// Noop function.
const noop = (): null => null;
const {warning} = module;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module.warning = jest.fn((message: string) => {
  // eslint-disable-next-line no-console
  if (console) console.error = noop;
  warning(message);
  // eslint-disable-next-line no-console
  if (console) console.error = consoleError;
});
