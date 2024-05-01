import { Routes as Router, Route } from "react-router-dom";

import Summon from "./pages/Summon";
import Success from "./pages/Success";
import { LayoutContainer } from "./components/LayoutContainer";
import Landing from "./pages/Landing";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Landing />} />
        <Route path={`summon/:tag`} element={<Summon/>} />
        <Route path={`success/:daoId`} element={<Success />} />
      </Route>
    </Router>
  );
};
