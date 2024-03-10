import React, { useContext, useState } from "react";
import Layout from "../components/Layout";

import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import TrainingTable from "../components/Training/TrainingTable/TrainingTable";
import TrainingContext from "../context/TrainingContext";

const Training = () => {
  const { trainings } = useContext(TrainingContext);



  console.log('training', trainings)



  return (
    <Layout>
      <div className="p-10">
        <div className="flex gap-x-3">
          <div className="flex justify-center items-end text-orange">
            <SportsKabaddiIcon fontSize="large" />
          </div>
          <h1 className="text-4xl">Treinos</h1>
        </div>

        <TrainingTable trainings={trainings}/>
      </div>
    </Layout>
  );
};

export default Training;
