import Alert from "./components/Alert";
import DBank from "./components/DBank";
import { StoreProvider } from "./store/context";

export default function App() {
  return (
    <StoreProvider>
      <Alert />
      <DBank />
    </StoreProvider>
  );
}
