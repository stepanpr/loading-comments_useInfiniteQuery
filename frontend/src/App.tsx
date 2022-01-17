import React from 'react'
import { Comments } from './components/Comments'
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
// import 'bulma/css/bulma.min.css'
import 'bulma/css/bulma.css'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="hero is-primary">
          <h6 className="title is-6">Комментарии</h6>
        </div>
        <div className="columns is-multiline is-centered is-mobile is-gapless">
          <div className="column is-four-fifths is-black">
            <div className="box">
              <Comments />
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
