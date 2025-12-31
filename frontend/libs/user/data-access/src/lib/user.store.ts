import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { UserDto } from './user.model';

type UserState = {
  user: UserDto | null;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    isAuthenticated: computed(() => store.user()),
  })),

  withMethods((store) => ({
    setUser(user: UserDto | null): void {
      patchState(store, { user });
    },
  })),
);

export type UserStoreInstance = InstanceType<typeof UserStore>;
