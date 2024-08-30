import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NotesContext";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Analytics } from "@vercel/analytics/react";

function App() {
    return (
        <div id="app">

<SignedIn>
            <NotesProvider>
                <UserButton />
                <NotesPage />
            </NotesProvider>
            </SignedIn>
            <SignedOut>
                <h1>Please sign in to use this app</h1>
                <SignInButton />
            </SignedOut>
 
            
        </div>
    );
}

export default App;
