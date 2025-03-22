import '@testing-library/jest-dom';

declare global {
  interface ImportMetaEnv {
    VITE_BASE_API_URL: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare module globalThis {
  interface MyImport {
    meta: {
      env: ImportMetaEnv;
    };
  }
  const myImport: MyImport;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).myImport = {
  meta: {
    env: {
      VITE_BASE_API_URL: 'http://localhost:5172', // Replace with your test URL
    },
  },
};
