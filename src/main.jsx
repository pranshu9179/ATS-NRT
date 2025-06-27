// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import { LayoutProvider } from "./providers/LayoutProvider.jsx"; // import provider
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <LayoutProvider>
//         {" "}
//         {/* Wrap your App inside LayoutProvider */}
//         <App />
//       </LayoutProvider>
//     </BrowserRouter>
//     </React.StrictMode>
// )

//  main.jsx *

//  import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import "./index.css";
// import { ThemeProvider } from "./components/theme-provider.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </ThemeProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx";
import "./index.css";
import { LayoutProvider } from "./providers/LayoutProvider.jsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apoloClient/apolloClient.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <LayoutProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LayoutProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
