import * as React from "react";
import { createRoot } from "react-dom/client";
import
{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./screens/Home";
import BookAnalysis from "./screens/BookAnalysis";
import BookOrActorAnalysisResult from "./screens/BookOrActorAnalysisResult";
import BookComparisonResult from "./screens/BookComparisonResult";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book-analysis",
    element: <BookAnalysis />,
  },
  {
    path: "/book-or-actor-analysis-retsult",
    element: <BookOrActorAnalysisResult />,
  },
  {
    path: "/book-comparison-result",
    element: <BookComparisonResult />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
