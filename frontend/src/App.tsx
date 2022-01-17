import React, { useState, useEffect } from "react";
import { Comments } from "./components/Comments";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";
// import 'bulma/css/bulma.min.css'
import "bulma/css/bulma.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
      {/* <div className="columns is-multiline is-centered is-mobile is-black"> */}
        {/* <div className="column is-full "> */}
          <div className="hero is-primary"><h6 className="title is-6">Комментарии</h6></div>
          {/* <div className="block is-primary">Комментарии</div> */}
          <div className="columns is-multiline is-centered is-mobile is-gapless">
            {/* <div className="column is-vcentered">
              <div className="content ">Комментарии</div>
            </div> */}
            <div className="column is-four-fifths is-black">
              <div className="box"><Comments /></div>
            </div>
          </div>
        </div>
        {/* </div> */}
      {/* </div> */}
    </QueryClientProvider>
  );
};

export default App;
