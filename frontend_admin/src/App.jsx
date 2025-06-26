import {
  Router, Routes, Route, CookiesProvider, AuthChecker, Signin, Dashboard, NotFound, ServerError
} from './import'


function App() {

  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Router>
          <Routes>
            <Route exact path='/' element={<AuthChecker> <Signin /> </AuthChecker>} ></Route>
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
