import React from 'react'
import { Comments } from './components/Comments'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import 'bulma/css/bulma.css' // 'bulma/css/bulma.min.css'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="hero is-primary mb-5">
          <h6 className="title is-6 my-4">
            Вложенные комментарии (useInfiniteQuery)
          </h6>
        </div>
        <div className="columns is-multiline is-centered is-mobile is-gapless">
          <div className="column is-four-fifths is-black">
            <div className="box mb-6">
              <Comments />
            </div>
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
