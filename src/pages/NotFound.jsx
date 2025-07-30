const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-cyber flex items-center justify-center">
          <span className="text-4xl font-bold text-foreground">404</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
            Page Not Found
          </h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <a
          href="/"
          className="btn btn-cyber"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;