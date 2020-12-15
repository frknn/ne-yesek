import { useReducer, createContext } from 'react'

export const CurrentUserContext = createContext()

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGGED IN REDUCER FUNC.')
      return {
        currentUser: action.currentUserInfo,
        accessToken: action.currentUserAccessToken
      }
    case 'LOGOUT':
      console.log('LOGGED OUT REDUCER FUNC.')
      return null
    default:
      break;
  }
}

export const CurrentUserContextProvider = ({ children }) => {

  const [currentUserInfo, setCurrentUserInfo] = useReducer(userReducer, null)
  // if (localStorage.getItem('currentUser') && localStorage.getItem('accessToken')) {
  //   setCurrentUserInfo({
  //     type: 'LOGIN',
  //     currentUser: localStorage.getItem('currentUser'),
  //     accessToken: localStorage.getItem('accessToken')
  //   })
  // }

  return (
    <CurrentUserContext.Provider value={{ currentUserInfo, setCurrentUserInfo }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
