// src/App.jsx
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import router from "./router";
import store from "./store";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingChatButton from "./components/FloatingChatButton";
import BasicSpeedDial from "./components/BasicSpeedDial";


function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
        <FloatingChatButton />

      </Provider>
    </ErrorBoundary>
  );
}
export default App;
