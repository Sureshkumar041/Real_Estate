import React from "react";
import AppRoutes from "./route";
import AppProvider from "./providers/AppProviders";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <React.Fragment>
      <Toaster />
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </React.Fragment>
  );
}

export default App;
