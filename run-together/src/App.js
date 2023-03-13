import "./style/index.scss";
import Main from "./components/Main";
import { StoreProvider } from "./redux/store";

function App() {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
}

export default App;
