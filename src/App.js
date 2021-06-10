import logo from './logo.svg';
import './App.css';
import styled from "styled-components"
import AccountBox, {AccountContext} from "./components/accountBox";
import Home from "./pages/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;

function App() {
    return (
        <AppContainer className="App">
            <Router>
                <div className="m-20">
                    <Link className="m-20" to="/login">Login</Link>
                    <Link className="m-20" to="/home">Home</Link>
                </div>

                <Switch>
                    <Route exact path="/login">
                        <AccountBox/>
                    </Route>
                    <Route path="/home">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </AppContainer>
    );
}

export default App;
