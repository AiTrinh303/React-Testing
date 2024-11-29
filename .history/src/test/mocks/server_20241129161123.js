import {setupServer} from 'msw/node';
import {handlers} from './handlers';


setupServer(...handlers);