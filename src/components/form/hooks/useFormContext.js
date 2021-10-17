import { createContext, useContext } from 'hooks/useContext';

const key = Symbol();

export function createFormContext(context) {
  return createContext(context, key);
}

export function useFormContext() {
  return useContext(key);
}
