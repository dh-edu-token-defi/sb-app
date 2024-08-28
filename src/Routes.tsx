import {
  Routes as Router,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";

import Summon from "./pages/Summon";
import Success from "./pages/Success";
import { LayoutContainer } from "./components/LayoutContainer";
import Landing from "./pages/Landing";
import { useEffect } from "react";
import { ReactSetter } from "@daohaus/utils";
import { TARGET_DAO } from "./targetDao";
import { MULTI_DAO_ROUTER } from "@daohaus/moloch-v3-hooks";
import { DaoContainer } from "./components/DaoContainer";
import { Yeet } from "./pages/Yeet";
import About from "./pages/About";
import Temp from "./pages/temp";
import { JoinForm } from "./components/forms/JoinForm";
import { ShareForm } from "./components/forms/ShareForm";
import { CommentForm } from "./components/forms/CommentForm";
import { CaptainNewBidForm } from "./components/forms/CaptainNewBid";
import { CaptainDelegateForm } from "./components/forms/CaptainDelegate";

export const Routes = ({
  setDaoChainId,
}: {
  setDaoChainId: ReactSetter<string | undefined>;
}) => {
  const location = useLocation();
  const pathMatch = matchPath("molochv3/:daochain/:daoid/*", location.pathname);

  useEffect(() => {
    console.log("pathMatch", pathMatch);
    if (TARGET_DAO[import.meta.env.VITE_TARGET_KEY]?.CHAIN_ID) {
      setDaoChainId(TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID);
    }
    if (pathMatch?.params?.daochain) {
      setDaoChainId(pathMatch?.params?.daochain);
    }
    if (!pathMatch?.params?.daochain) {
      setDaoChainId(undefined);
    }
  }, [pathMatch?.params?.daochain, setDaoChainId]);

  return (
    <Router>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<Landing />} />
        <Route path={`summon/:tag`} element={<Summon />} />
        <Route path={`success/:daoId`} element={<Success />} />
        <Route path={`about`} element={<About />} />
        <Route path={`temp`} element={<Temp />} />
      </Route>
      <Route path={MULTI_DAO_ROUTER} element={<DaoContainer />}>
        <Route path={`:yeeterId`} element={<Yeet />} />
        <Route path={`:yeeterId/join`} element={<JoinForm />} />
        <Route path={`:yeeterId/share`} element={<ShareForm />} />
        <Route path={`:yeeterId/comment`} element={<CommentForm />} />
        <Route path={`:yeeterId/bid`} element={<CaptainNewBidForm />} />
        <Route path={`:yeeterId/delegate`} element={<CaptainDelegateForm />} />





      </Route>
    </Router>
  );
};
