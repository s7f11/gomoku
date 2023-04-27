import { createRoot } from "react-dom/client";
import { Login } from "./components/Login";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(<Login />);

