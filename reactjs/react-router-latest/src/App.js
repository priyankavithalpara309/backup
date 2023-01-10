import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

import Welcome from "./Pages/Welcome";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import MainHeader from "./Components/MainHeader";

import BlogLayout from "./Prectices/pages/BlogLayout";
import BlogPostsPage from "./Prectices/pages/BlogPosts";
import NewPostPage from "./Prectices/pages/NewPost";
import PostDetailPage from "./Prectices/pages/PostDetail";
import RootLayout from "./Prectices/Components/RootLayout";
import WelcomePage from "./Prectices/pages/Welcome";

function App() {
  return (

    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<BlogPostsPage />} />
            <Route path=":id" element={<PostDetailPage />} />
          </Route>
          <Route path="/blog/new" element={<NewPostPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
    
    // <div>
    //   <MainHeader />
    //   <main>
    //     <Routes>
    //       <Route path="/" element={<Navigate to="/welcome" />} />
    //       <Route path="/welcome/*" element={<Welcome />}>
    //         <Route path='new-user' element={<p>Welcome new user</p>} />
    //       </Route>
    //       <Route path="/product" exact element={<Products />}>
    //       </Route>
    //       <Route path="/product/:productId" element={<ProductDetail />}>
    //       </Route>
    //     </Routes>
    //   </main>
    // </div>
  );
}

export default App;