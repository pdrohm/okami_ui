import React from "react";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm/StudentForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useLocation } from "react-router-dom";
import TrainingForm from "../components/Training/TrainingForm";
import GetBack from "../components/GetBack";

const CreateTraining = () => {
  const location = useLocation();
  const { trainingData } = location.state || {};

  console.log('trainingData', trainingData)

  return (
    <Layout>
      <div className="p-10 flex flex-col gap-y-10 justify-center items-center">

        <div className="flex gap-x-2 w-full">
        <GetBack />

          <div className="flex justify-center items-end text-orange">
            <PersonAddAlt1Icon fontSize="large" />
          </div>
          <h1 className="text-4xl">Criar novo treino</h1>
        </div>
        <TrainingForm trainingData={trainingData} />
      </div>
    </Layout>
  );
};

export default CreateTraining;
