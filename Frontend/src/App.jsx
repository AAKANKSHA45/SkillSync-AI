import { RouterProvider } from "react-router"
import {router} from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"

function App() {
 

  return (
   //here we are wrapping our entire app with the AuthProvider so that we can use the context api(shared data) in any component of our app
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
    
  )
}

export default App
