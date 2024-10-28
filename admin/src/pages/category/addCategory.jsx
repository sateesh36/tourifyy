import React, { useEffect, useState } from "react";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import { Header } from "../../components/header/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../api";
import { Button } from "antd";
import { AddCat1 } from "./AddCat1";

export const AddCategory = () => {
  //to get category data//

  const [category, getCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const res = await api.get("/category/Get");
      if (res) {
        getCategory(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  //to delete category data//
  const DeleteCategory = async (id) => {
    try {
      const Del = await api.delete(`/category/${id}`);
      if (Del.data) {
        toast.success(Del.data.message);
        fetchCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <Sidemenu />

      <section style={{ marginLeft: "360px" }}>
        <div className="row ">
          <div className="col-10 ">
            <div className="card ">
              <div className="card-body ">
                <h4 className="card-title">Category details</h4>
                <div>
                  <Button
                    type="primary"
                    className="btn btn-primary"
                    onClick={handleOpenModal}
                  >
                    Add Category
                  </Button>
                  <AddCat1 visible={modalVisible} onClose={handleCloseModal} />
                </div>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.length > 0 &&
                        category?.map((categoryData, id) => {
                          //   console.log(categoryData, "22");

                          return (
                            <>
                              <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{categoryData?.name}</td>
                                <td>{categoryData?._id}</td>
                                <td>
                                  <button
                                    className="btn btn-danger  custom-medium-btn"
                                    style={{
                                      fontSize: "12px",
                                      padding: " 4px 8px",
                                    }}
                                    onClick={() => {
                                      DeleteCategory(categoryData?._id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
