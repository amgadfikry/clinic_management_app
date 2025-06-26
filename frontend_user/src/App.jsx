import {
  Router, Routes, Route, CookiesProvider, LandingPage, AuthChecker, Dashboard, NotFound, ServerError, GetStart
} from './import'

function App() {

  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Router>
          <Routes>
            <Route exact path='/' element={<LandingPage />} ></Route>
            <Route exact path='/getstart/*' element={<AuthChecker> <GetStart /> </AuthChecker>} ></Route>
            <Route exact path='/dashboard/*' element={<AuthChecker> <Dashboard /> </AuthChecker>} ></Route>
            <Route exact path='/server504error' element={<ServerError />} ></Route>
            <Route exact path='*' element={<NotFound />} ></Route>
          </Routes>
        </Router>
      </CookiesProvider>
    </>
  )
}

export default App
