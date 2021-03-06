import { AppActionTypes } from './App';
import { HeaderActionTypes } from './Header';
import { SidebarActionTypes } from './Sidebar';

export type ActionTypes = HeaderActionTypes | SidebarActionTypes | AppActionTypes;
