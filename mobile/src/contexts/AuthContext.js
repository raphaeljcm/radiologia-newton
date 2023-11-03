import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '../storage/storageUser';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '../storage/storageAuthToken';

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const userAndTokenUpdate = (user, token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  const storageUserAndTokenSave = async (user, token) => {
    try {
      await storageUserSave(user);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      setUser({});
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const userLogged = await storageUserGet();
        const token = await storageAuthTokenGet();

        if (userLogged && token) {
          userAndTokenUpdate(userLogged, token);
        }
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        onSignIn: handleSignIn,
        onSignOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
