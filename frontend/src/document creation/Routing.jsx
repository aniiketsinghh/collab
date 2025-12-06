import { Routes, Route, Navigate } from "react-router";
import TextEditor from "./TextEditor";
import { v4 as uuidV4 } from "uuid";

const Routing = () => {
  return (
    <Routes>
      {/* When opening '/', redirect to random new document */}
      <Route
        path="/"
        element={<Navigate to={`/documents/${uuidV4()}`} replace />}
      />

      {/* Open document by ID */}
      <Route path="/documents/:id" element={<TextEditor />} />
    </Routes>
  );
};

export default Routing;
