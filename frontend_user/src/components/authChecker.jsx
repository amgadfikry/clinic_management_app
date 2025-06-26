/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  useCookies, useNavigate, useState, useEffect, baseUrl, LoadingComponent,
} from '../import.js'

function AuthChecker({ children }) {
  const [cookies, setCookie] = useCookies(['token_user']);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname
    if ('token_user' in cookies) {
      fetch(`${baseUrl}/api/public/state`, {
        headers: {
          'Authorization': 'Bearer ' + cookies.token_user,
        },
        method: 'GET',
        mode: 'cors',
      }).then(response => response.json())
        .then(data => {
          if (data.type === 'user') {
            setLoading(false)
            path === '/getstart' || path === '/getstart/signup' || path === '/getstart/'
              ? navigate('/dashboard/') : navigate(path)
          } else {
            path === '/getstart/signup' ? navigate(path) : navigate('/getstart/')
            setLoading(false)
          }
        })
        .catch((error) => {
          setLoading(false)
          setServerError(true)
          navigate('/server504error')
        });
    } else {
      setLoading(false)
      path === '/getstart/signup' ? navigate(path) : navigate('/getstart/')
    }
  }, [])

  if (loading) {
    return <LoadingComponent />
  } else {
    return children
  }
}

export default AuthChecker