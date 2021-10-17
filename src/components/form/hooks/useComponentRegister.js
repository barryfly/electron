import { add, del } from '../componentMap';

export function useComponentRegister(compName, comp) {
  add(compName, comp);
  del(compName);
}
