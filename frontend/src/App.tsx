import React, { useState, useEffect } from "react";
import { Comments } from "./components/Comments";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {
          <Comments />
          }
        </div>
    </QueryClientProvider>
  );
};

export default App;
