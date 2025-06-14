import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsList from "./pages/PostsList";
import PostEdit from "./pages/PostEdit";
import PostNew from "./pages/PostNew";

const API_URL = "https://684adec9165d05c5d35aa5a4.mockapi.io/Pixacom/api";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<PostsList API_URL={API_URL} />} />
          <Route path="/posts/:postId" element={<PostEdit API_URL={API_URL} />} />
          <Route path="/posts/new" element={<PostNew API_URL={API_URL} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
