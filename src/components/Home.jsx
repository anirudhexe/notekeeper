import React, { useContext } from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";

export const Home = (props) => {
  const{showAlert}=props;
  return (
    <div>
      <AddNotes showAlert={showAlert}/>
      <Notes showAlert={showAlert}/> 
    </div>
  );
};
