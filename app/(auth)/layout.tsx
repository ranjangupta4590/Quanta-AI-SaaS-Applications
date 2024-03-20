const AuthLayout = ({children}: {children: React.ReactNode;}) => {
    
    return (
        <div  className="flex bg-blue-200 h-screen items-center justify-center">
          {children}
        </div>
     );
  }
   
  export default AuthLayout;