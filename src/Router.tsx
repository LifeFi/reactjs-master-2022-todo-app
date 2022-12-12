import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 15px;
  left: 30px;
  font-size: 35px;

  span {
    margin: 5px 0;
  }
  span:hover {
    cursor: pointer;
  }
`;

function Navigation() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prevMode) => !prevMode);

  const rootMatch = useRouteMatch("/");

  return (
    <NavigationContainer>
      {isDark ? (
        <span onClick={toggleDarkAtom}>🌞</span>
      ) : (
        <span onClick={toggleDarkAtom}>🌙</span>
      )}
      {rootMatch?.isExact ? null : <Link to={"/"}>🏠</Link>}
    </NavigationContainer>
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
