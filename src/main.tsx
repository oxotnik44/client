import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./app/styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "./shared/utils/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
