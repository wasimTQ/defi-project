import { useEffect } from "react";
import Alert from "./components/Alert";
import DBank from "./components/DBank";
import { StoreProvider } from "./store/context";

export default function App() {
  useEffect(()=>{
    document.title = "DBank Defi app"
  },[])
  return (
    <StoreProvider>
      <Alert />
      <DBank />
    </StoreProvider>
  );
}
