import React, { useState, Fragment, useEffect } from "react";

/* COMPONENT Import */
import Backdrop from "../../../hoc-components/UI/backdrop/Backdrop";

/* CSS Import */
import "./PetAdopt.css";
import { getUnadoptedPets } from "../../../services/http.services";
import AdminLayout from "../../../hoc-components/UI/adminlayout/AdminLayout";

const PetAdopt: React.FC = () => {
  const [pets, setPets] = useState<Array<any>>([]);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    async function getUnadoptedPet() {
      try {
        const cli: any = await getUnadoptedPets();
        setPets(cli);
        setIsVerifying(false);
      } catch (err) {
        setIsVerifying(false);
      } finally {
        setIsFetched(true);
      }
    }

    if (pets.length === 0 && !isFetched) {
      getUnadoptedPet();
    }
  });

  const getMonths = (dob: string) => {
    let diff = (new Date().getTime() - new Date(dob).getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7 * 4;
    return Math.abs(Math.round(diff));
  };

  // const doUpdateFields = (
  //   ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   updateFn: React.Dispatch<React.SetStateAction<string>>
  // ) => {
  //   updateFn(ev.target.value);
  // };

  return (
    <Fragment>
      {isVerifying && <Backdrop message="Please wait for a while..." />}
      <div className="col-12 my-4">
        <div className="form-group">
          <div className="d-flex justify-content-between">
            <h3>Unadopted Pets</h3>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Pet Name</th>
                <th scope="col">Weight (in grams)</th>
                <th scope="col">Gender</th>
                <th scope="col">Pet Type</th>
                <th scope="col">Age (in months)</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((t, i) => (
                <tr key={t.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{t.petName}</td>
                  <td>{t.weight}</td>
                  <td>{t.gender}</td>
                  <td className="text-capitalize">{t.petCategory.name}</td>
                  <td>{getMonths(t.dob)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminLayout(PetAdopt);
