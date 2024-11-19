// import React, { useState } from "react";
// import { Navbar } from "../components/navbar";
// import api from "../../api";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Form, Input, Button } from "antd";
// import {
//   EyeInvisibleOutlined,
//   EyeTwoTone,
//   LockOutlined,
//   MailOutlined,
// } from "@ant-design/icons";

// export const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [users, setUsers] = useState({});
//   const navigate = useNavigate();

//   const handleLogin = async (values) => {
//     try {
//       const res = await api.post("/user/login", values);
//       if (res && res.data.success) {
//         if (res.data.role !== "admin") {
//           localStorage.setItem("access_token", res.data.token);
//           localStorage.setItem("_id", res.data.user._id);
//           localStorage.setItem("login", true);

//           navigate("/");
//           window.location.reload();
//           setUsers(res.data);
//         } else {
//           toast.error("Only users can login");
//         }
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Username Already Exists");
//     }
//   };

//   return (
//     <>
//       <Navbar userData={users} />

//       <section style={{ marginLeft: "260px" }} className="text-center">
//         <div className="row">
//           <div className="col-10">
//             <div
//               className="card mx-4 mx-md-5 shadow-4-light"
//               style={{
//                 marginTop: "100px",
//                 background: "rgba(255, 255, 255, 0.8)",
//                 borderRadius: "8px",
//                 boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <div className="card-body py-5 px-md-5">
//                 <div className="row d-flex justify-content-center">
//                   <div className="col-lg-8">
//                     <h2 className="fw-bold mb-5">Login Now</h2>
//                     <Form onFinish={handleLogin}>
//                       <Form.Item
//                         name="email"
//                         rules={[
//                           {
//                             required: true,
//                             type: "email",
//                             message: "Please enter a valid email address.",
//                           },
//                         ]}
//                       >
//                         <Input
//                           prefix={<MailOutlined />}
//                           placeholder="Email address"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                         />
//                       </Form.Item>
//                       <Form.Item
//                         name="password"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Please enter your password.",
//                           },
//                         ]}
//                       >
//                         <Input.Password
//                           prefix={<LockOutlined />}
//                           placeholder="Password"
//                           iconRender={(visible) =>
//                             visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                           }
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                       </Form.Item>
//                       <Form.Item>
//                         <Button
//                           type="primary"
//                           htmlType="submit"
//                           className="btn-primary primary rounded"
//                         >
//                           Sign in
//                         </Button>
//                       </Form.Item>
//                       <div className="text-center">
//                         <p>
//                           forgot password?{" "}
//                           <a className="rounded" href="/forgot">
//                             Login
//                           </a>
//                         </p>
//                       </div>
//                     </Form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div
//         className="p-12 bg-image"
//         style={{
//           backgroundImage:
//             "url('https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg=')",
//           height: "100vh",
//           position: "fixed",
//           backgroundSize: "cover",
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: -1,
//         }}
//       ></div>
//     </>
//   );
// };

import React, { useState } from "react";
import { Navbar } from "../components/navbar";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Button } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const res = await api.post("/user/login", values);
      if (res && res.data.success) {
        if (res.data.role !== "admin") {
          localStorage.setItem("access_token", res.data.token);
          localStorage.setItem("_id", res.data.user._id);
          localStorage.setItem("login", true);

          navigate("/");
          window.location.reload();
          setUsers(res.data);
        } else {
          toast.error("Only users can login");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Username Already Exists");
    }
  };

  return (
    <>
      <Navbar userData={users} />

      <section style={{ marginLeft: "260px" }} className="text-center">
        <div className="row">
          <div className="col-10">
            <div
              className="card mx-4 mx-md-5 shadow-4-light"
              style={{
                marginTop: "100px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="card-body py-5 px-md-5">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <h2 className="fw-bold mb-5">Login Now</h2>
                    <Form onFinish={handleLogin}>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email address.",
                          },
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your password.",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          placeholder="Password"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btn-primary primary rounded"
                        >
                          Sign in
                        </Button>
                      </Form.Item>
                      <div className="text-center">
                        <p>
                          Forgot password?{" "}
                          <a className="rounded" href="/forgot">
                            Reset Password
                          </a>
                        </p>
                        <p>
                          Don't have an account?{" "}
                          <a className="rounded" href="/register">
                            Register Here
                          </a>
                        </p>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="p-12 bg-image"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg=')",
          height: "100vh",
          position: "fixed",
          backgroundSize: "cover",
          top: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}
      ></div>
    </>
  );
};
