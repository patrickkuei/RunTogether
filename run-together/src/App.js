import "./style/css/index.css";
import Main from "./components/Main";
import { ChatroomListProvider } from "./redux/store";

function App() {
  return (
    <ChatroomListProvider>
      <Main />
    </ChatroomListProvider>
  );
}

export default App;
