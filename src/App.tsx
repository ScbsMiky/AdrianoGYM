import { BrowserRouter, Route, Routes } from "react-router-dom";

import Container from "./components/Container/Container";

import NotFoundScreen from "./screens/NotFound/NotFound";
import DashboardScreen from "./screens/Dashboard/Dashboard";
import CustumersScreen from "./screens/Custumers/Custumers";
import CustumerEditorScreen from "./screens/CustumerEditor/CustumerEditor";
import CustumerCreatorScreen from "./screens/CustumerCreator/CustumerCreator";

import TrainsScreen from "./screens/Trains/Trains";

export default function App( ) {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/custumers" element={<CustumersScreen />} />
          <Route path="/custumers/editor" element={<CustumerEditorScreen />} />
          <Route path="/custumers/creator" element={<CustumerCreatorScreen />} />

          <Route path="/trains" element={<TrainsScreen />} />
          
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};