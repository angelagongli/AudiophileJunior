import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Navigation } from "./components/Navigation";
import { fromEvent, animationFrameScheduler } from 'rxjs';
import { map, switchMap, takeUntil, subscribeOn } from 'rxjs/operators';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useSearchParams
} from "react-router-dom";
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import AuthRoute from './components/AuthRoute';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';

initializeApp(config.firebaseConfig);

export interface IAppProps {};

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

// function App() {
//   // From Nicholas Cunningham's guide to Drag and Drop on Medium
//   const box = document.querySelector<HTMLDivElement>('.draggableBox');

//   const mousedown$ = fromEvent(box, 'mousedown');
//   const mousemove$ = fromEvent(document, 'mousemove');
//   const mouseup$ = fromEvent(box, 'mouseup');

//   const drag$ = mousedown$.pipe(
//     switchMap(
//       (start: MouseEvent) => {
//         return mousemove$.pipe(map((move: MouseEvent) => {
//           move.preventDefault();
//           return {
//             left: move.clientX - start.offsetX,
//             top: move.clientY - start.offsetY
//           }
//         }),
//         takeUntil(mouseup$));
//       }));

//   const position$ = drag$.pipe(subscribeOn(animationFrameScheduler));

//   position$.subscribe((pos: { top: number; left: number; }) => {
//     box!.style.top = `${pos.top}px`
//     box!.style.left = `${pos.left}px`
//   });

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//       </header>
//       <Router>
//         <div>
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/about">About</Link>
//               </li>
//               <li>
//                 <Link to="/users">Users</Link>
//               </li>
//             </ul>
//           </nav>

//           <Routes>
//             <Route path="/about">
//               <About />
//             </Route>
//             <Route path="/users">
//               <Users />
//             </Route>
//             <Route path="/">
//               <Home />
//             </Route>
//           </Routes>
//         </div>
//       </Router>
//       <Navigation />
//     </div>
//   );
// }

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Router>
      <Routes>
        {/* Once we need routing I will need to go back to the Nerdy Canuck's
        Video tutorial on useSearchParams in React Router */}
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
