import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useEffect,useContext } from "react";
const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    console.log(success, orderId, response.data);
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/myorders");
    }
  };
  useEffect(() => {
    verifyPayment();
  },[]);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
