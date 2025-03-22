import "@testing-library/jest-dom";

declare global {
  namespace NodeJS {
    interface Global {
      import: {
        meta: {
          env: {
            VITE_BASE_API_URL: string;
          };
        };
      };
    }
  }
}

(global as any).import = {
  meta: {
    env: {
      VITE_BASE_API_URL: "http://localhost:5172", // Replace with your test URL
    },
  },
};
