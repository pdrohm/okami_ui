import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/Layout";
import TrainingContext  from "../context/TrainingContext";
import StudentContext from "../context/StudentContext";

const Checkin = () => {
  const { trainings } = useContext(TrainingContext);
  const { students } = useContext(StudentContext);
  const [modality, setModality] = useState("jiujitsu");
  const [training, setTraining] = useState("");
  const [participantes, setParticipantes] = useState([]);

  console.log(trainings)

  // Função para carregar os participantes do training selecionado
  useEffect(() => {
    const fetchParticipantes = async () => {
      // Aqui você precisa obter os participantes do training selecionado
      // Substitua esta lógica pela chamada ao serviço adequado
    };

    if (training !== "") {
      fetchParticipantes();
    }
  }, [training]);

  // Função para lidar com o check-in do aluno
  const handleCheckin = async () => {
    // Lógica para fazer o check-in do aluno
    // Você precisa implementar essa parte
  };

  return (
    <Layout>
      <div className="p-10">
      <div className="flex items-center justify-center gap-x-4 ">
        <div>
          <label htmlFor="modality">Modalidade:</label>
          <select id="modality" value={modality} onChange={(e) => setModality(e.target.value)} className="student-form-input">
            <option value="jiujitsu">Jiu Jitsu</option>
            <option value="yoga">Yoga</option>
            <option value="muaythai">Muay Thai</option>
          </select>
        </div>

        
          <div>
            <label htmlFor="training">Treino:</label>
            <select id="training" value={training} onChange={(e) => setTraining(e.target.value)} className="student-form-input">
              <option value="">Selecione um training</option>
              {trainings
                .filter((training) => training.modality === modality)
                .map((training) => (
                  <option key={training.id} value={training.id}>{training.training_name}</option>
                ))}
            </select>
          </div>
     

        {training && (
          <button onClick={handleCheckin}>Fazer Check-in</button>
        )}
      </div>

      <div>
        <h2>Participantes do Treino</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {participantes.map((participante) => (
              <tr key={participante.id}>
                <td>{participante.nome}</td>
                <td>{participante.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </Layout>
  );
};

export default Checkin;
