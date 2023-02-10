import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "../Components/Form/Form";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};
