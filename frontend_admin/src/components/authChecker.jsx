/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  useCookies, useNavigate, useState, useEffect, baseUrl, LoadingComponent,
} from '../import.js'

function AuthChecker({ children }) {
  const [cookies, setCookie] = useCookies(['token']);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname
    if ('token' in cookies) {
      fetch(`${baseUrl}/api/public/state`, {
        headers: {
          'Authorization': 'Bearer ' + cookies.token,
        },
        method: 'GET',
        mode: 'cors',
      }).then(response => response.json())
        .then(data => {
          if (data.type === 'admin') {
            setLoading(false)
            path === '/' ? navigate('/dashboard') : navigate(path)
          } else {
            setLoading(false)
            navigate('/')
          }
        })
        .catch((error) => {
          setLoading(false)
          setServerError(true)
          navigate('/server504error')
        });
    } else {
      setLoading(false)
      navigate('/')
    }
  }, [])

  if (loading) {
    return <LoadingComponent />
  } else {
    return children
  }
}

export default AuthChecker