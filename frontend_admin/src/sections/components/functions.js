/* eslint-disable no-unused-vars */
export const handleDeleteItem = (options) => {
  const { baseUrl, apiUrl, id, cookies, dataState, setDataState, setConfirmDelete, navigate, setServerError } = options
  fetch(`${baseUrl}/api/admin/${apiUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + cookies.token,
    },
    mode: 'cors'
  }).then(response => response.json())
    .then(data => {
      const filterList = dataState.filter(el => el.id !== id)
      setConfirmDelete("")
      setDataState(filterList)
    })
    .catch((error) => {
      setServerError(true)
      navigate('/server504error')
    });
}


export const handleCreate = (options) => {
  const { baseUrl, url, cookies, newState, setState, emptyState, setErrorMsg, setSuccessChanges,
    navigate, setServerError, checkDataError, specialityList, exceptionList } = options
  setErrorMsg({});
  const errors = checkDataError(newState, exceptionList)
  if (Object.keys(errors).length > 0) {
    setErrorMsg({ ...errors })
    return;
  }
  fetch(`${baseUrl}/api/admin/${url}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + cookies.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newState),
    mode: 'cors'
  }).then(response => response.json())
    .then(data => {
      if ('error' in data) {
        setErrorMsg({ ...data.error })
      } else {
        setSuccessChanges(true)
        setErrorMsg({});
        setState({ ...emptyState })
        if (specialityList) {
          specialityList("")
        }
        setTimeout(() => {
          setSuccessChanges(false)
        }, 2000)
      }
    })
    .catch((error) => {
      setServerError(true)
      navigate('/server504error')
    });
}

export const handleGet = (options) => {
  const { baseUrl, apiUrl, cookies, dataState, setLoading, setServerError, navigate } = options
  fetch(`${baseUrl}/api/admin/${apiUrl}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + cookies.token,
    },
    mode: 'cors'
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      dataState(data)
      setLoading(false)
    })
    .catch((error) => {
      setServerError(true)
      navigate('/server504error')
    });
}
export const handleUpdate = (options) => {
  const { baseUrl, apiUrl, cookies, changeState, setChangeState, setErrorMsg, state, navigate, setServerError,
    checkDataError, samilarData, exception, path } = options
  setErrorMsg({});
  const errors = checkDataError(changeState, exception)
  if (Object.keys(errors).length > 0) {
    setErrorMsg({ ...errors })
    return;
  }
  const errorSame = samilarData(changeState, state)
  if (Object.keys(errorSame).length > 0) {
    setErrorMsg({ ...errorSame })
    return;
  }
  fetch(`${baseUrl}/api/admin/${apiUrl}/${state.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + cookies.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(changeState),
    mode: 'cors'
  }).then(response => response.json())
    .then(data => {
      setErrorMsg({});
      setChangeState({ ...data })
      navigate(`/dashboard/${path}`)
    })
    .catch((error) => {
      setServerError(true)
      navigate('/server504error')
    });
}