import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return (
    <div
      style={{
        backgroundColor: "#d4edda",
        color: "#155724",
        padding: "1rem",
        borderRadius: "0.25rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <FaCheckCircle style={{ marginRight: "0.5rem" }} />
      <span>{message}</span>
    </div>
  );
};

export default SuccessMessage;