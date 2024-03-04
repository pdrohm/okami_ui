import React, { useContext } from "react";
import studentService from "../services/studentService";
import StudentContext from "../context/StudentContext";

const ModalDelete = ({ student, modalOpen, setModalOpen }) => {
  const { fetchStudents } = useContext(StudentContext);

  const handleDeleteClick = async (id) => {
    await studentService.deleteStudent(id);
    fetchStudents();
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        modalOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="flex w-full justify-around gap-x-5">
              <div className="mt-3 text-center sm:mt-5 flex flex-col justify-center items-center w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Deseja excluir o usuário {student.name}?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Esta ação não pode ser desfeita.
                  </p>
                </div>
              </div>
              <div
                className="group mx-auto flex items-center justify-center h-10 w-12 rounded-full bg-orange-lightest cursor-pointer hover:bg-orange"
                onClick={() => handleCancelClick()}
              >
                <svg
                  className="h-6 w-6 text-orange group-hover:text-orange-lightest"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={() => handleDeleteClick(student.id)}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange text-base font-medium text-white hover:bg-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
            >
              Sim
            </button>
            <button
              onClick={handleCancelClick}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
