import { DatabaseReference } from '../interfaces';
import { DataSnapshot, Reference } from '@firebase/database-types';
export declare function createRemoveMethod(ref: DatabaseReference): (item?: string | Reference | DataSnapshot | undefined) => any;
