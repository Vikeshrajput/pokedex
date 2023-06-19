import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./features/Search/Search";
import DetailPage from './Pages/DetailPage';
import Root from "./Pages/Root";

import './App.css'
import ListingPage from "./Pages/ListingPage";
import BookmarksPage from "./Pages/BookmarksPage";

function App() {

  const router = createBrowserRouter([
    {
      path: '/pokedex', element: <Root />, children: [
        { path: '/pokedex/', element: <Search /> },
        { path: '/pokedex/listing', element: <ListingPage /> },
        { path: '/pokedex/bookmarks', element: <BookmarksPage /> },
        { path: '/pokedex/detail/:id', element: <DetailPage /> },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
