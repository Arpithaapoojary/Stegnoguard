import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/userDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route - Only shown when signed out */}
        <Route 
          path="/" 
          element={
            <>
              <SignedOut>
                <LandingPage />
              </SignedOut>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
            </>
          } 
        />
        
        {/* Dashboard Route - Only shown when signed in */}
        <Route 
          path="/dashboard" 
          element={
            <>
              <SignedIn>
                <UserDashboard />
              </SignedIn>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            </>
          } 
        />
        
        {/* Catch all route - redirect to appropriate page */}
        <Route 
          path="*" 
          element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <Navigate to="/" replace />
              </SignedOut>
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;