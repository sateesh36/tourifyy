import React, { useEffect, useState } from "react";
import { Sidemenu } from "../../components/sidemenu/sidemenu";
import { Header } from "../../components/header/header";
import api from "../../api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const UpdatePackage = () => {
  const navigate = useNavigate();
  const [detailItem, setDetailItem] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    desc: "",
    price: "",
    maxGroupSize: "",
    category: "", // Added category property to detailItem state
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`tour/${id}`);
        if (res) {
          setDetailItem(res.data.data);
          setExistingPhotoUrl(res.data.data.photo.url);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [id]);

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append data to the FormData object
      formData.append("title", detailItem.title);
      formData.append("city", detailItem.city);
      formData.append("address", detailItem.address);
      formData.append("distance", detailItem.distance);
      formData.append("desc", detailItem.desc);
      formData.append("price", detailItem.price);
      formData.append("maxGroupSize", detailItem.maxGroupSize);
      formData.append("category", detailItem.category);
      formData.append("photo", selectedFile);
      // Conditionally append the existing photo URL if it exists
      if (existingPhotoUrl) {
        formData.append("existingPhotoUrl", existingPhotoUrl);
      }

      const res = await axios.put(
        `http://localhost:5000/api/tour/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res) {
        setDetailItem(res.data);
        // navigate("/package");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update tour. Please try again.");
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setDetailItem((prevDetailItem) => ({
  //     ...prevDetailItem,
  //     [name]: value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setDetailItem((prevDetailItem) => ({
        ...prevDetailItem,
        [name]: value,
      }));
    } else {
      setDetailItem((prevDetailItem) => ({
        ...prevDetailItem,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Getting category list
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api
      .get("category/Get")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      <Sidemenu />
      <Header />

      <section style={{ marginLeft: "360px" }}>
        <div className="row ">
          <div className="col-10 ">
            <div className="card ">
              <div className="card-body ">
                <h4 className="card-title">Update Tour Details</h4>

                <form onSubmit={Submit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={detailItem.title || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={detailItem.city || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={detailItem.address || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="distance" className="form-label">
                      Distance
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="distance"
                      name="distance"
                      value={detailItem.distance || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="photo">Photo</label>
                    {existingPhotoUrl && (
                      <img
                        className="img img-fluid rounded"
                        style={{ height: "90px", width: "100px" }}
                        src={existingPhotoUrl}
                        alt="Existing Photo"
                      />
                    )}
                    <input type="file" onChange={handleFileChange} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="desc" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="desc"
                      name="desc"
                      value={detailItem.desc || ""}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={detailItem.price || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="maxGroupSize" className="form-label">
                      Max Group Size
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="maxGroupSize"
                      name="maxGroupSize"
                      value={detailItem.maxGroupSize || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                      value={detailItem.category || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>

                      {categories?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
