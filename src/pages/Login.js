import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { GoEllipsis } from "react-icons/go";
import { IoIosEyeOff } from "react-icons/io";
import Headline from "../components/Headline";
import InputField from "../components/InputField";
import Logo from "../components/Logo";
import "../styles/login.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [User, setUser] = useState({});

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    console.log(unsubscribe);
    return unsubscribe;
  }, []);

  const loginUser = async (e) => {
    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res._tokenResponse.idToken);
        localStorage.setItem("FbIdToken", res._tokenResponse.idToken);
        navigate("/subcategory");
      })
      .catch((err) => {
        let eroors = err.toString().split(" ");
        console.log(err);
        if (eroors[3] === "(auth/invalid-email).") {
          setErr(true);
        } else if (eroors[3] === "(auth/internal-error).") {
          setErr(true);
        } else if (eroors[3] === "(auth/wrong-password).") {
          setErr(true);
        }
      });
  };

  return (
    <div className="login">
      <div>
        <div className="container">
          <Logo />
        </div>

        <Headline text="Back" line="Login to continue using account" />

        <div className="container">
          <InputField
            icon={FaEnvelope}
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            changeHandler={updateEmail}
          />
          <InputField
            icon={GoEllipsis}
            icon2={IoIosEyeOff}
            name="password"
            type="password"
            placeholder="password"
            value={password}
            changeHandler={updatePassword}
            fieldStyle={{ width: "70%" }}
          />
          <span className="forgot-password">Forget Pasword?</span>
        </div>
        {err ? <p className="error">Invalid Credentials!</p> : ""}

        <div className="button-container">
          <button className="login-button" onClick={loginUser}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
