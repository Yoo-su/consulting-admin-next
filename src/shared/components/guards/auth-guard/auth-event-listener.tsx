type AuthEventType = 'UNAUTHORIZED' | 'LOGIN' | 'LOGOUT';

interface AuthEvent {
  type: AuthEventType;
  payload?: any; //
}

type AuthEventListener = (event: AuthEvent) => void;

export const AuthEvents = {
  listeners: new Set<AuthEventListener>(),

  emit(event: AuthEvent): void {
    this.listeners.forEach((listener) => listener(event));
  },

  subscribe(listener: AuthEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
};
