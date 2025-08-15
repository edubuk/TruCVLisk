import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CvFomContextProvider } from "./context/CvForm.context.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import {Toaster} from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";
import { Buffer } from "buffer";
import process from "process";
import { GoogleOAuthProvider } from '@react-oauth/google';
window.Buffer = Buffer;
window.process = process;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId = {GOOGLE_CLIENT_ID}>
      <CvFomContextProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
                <App />
      </BrowserRouter>
      </CvFomContextProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
export const API_BASE_URL = import.meta.env.VITE_BACKNED_URL;
