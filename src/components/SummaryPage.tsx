import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PaymentDetails, PLAN_DATA } from "../types";
import Header from "./Header";
import PaymentDetailsCard from "./PaymentDetailsCard";
import PaymentOptionsCard from "./PaymentOptionsCard";
import axios from "axios";

const SummaryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<Partial<PaymentDetails>>({});
    const [customPayPalLink, setCustomPayPalLink] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isExpired, setIsExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState<number>(0); // For due date countdown

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/payments/${id}`
                );
                const data = response.data;
                setFormData(data);
                setCustomPayPalLink(data.paymentLink || "");
                const dueDateTime = new Date(data.dueDate).getTime();
                const now = Date.now();
                if (dueDateTime < now) {
                    setIsExpired(true);
                } else {
                    // Start countdown for due date
                    const interval = setInterval(() => {
                        const remaining = Math.max(
                            0,
                            Math.floor((dueDateTime - Date.now()) / 1000)
                        );
                        setTimeRemaining(remaining);
                        if (remaining <= 0) {
                            setIsExpired(true);
                            clearInterval(interval);
                        }
                    }, 1000);
                    return () => clearInterval(interval);
                }
            } catch (error) {
                console.error("Error fetching payment:", error);
                setIsExpired(true); // Treat as expired if not found
            } finally {
                setIsLoading(false);
            }
        };
        fetchPayment();
    }, [id]);

    const handlePayNow = () => {
        const paymentLink =
            customPayPalLink ||
            (formData.plan ? PLAN_DATA[formData.plan].link : "");
        if (paymentLink) {
            window.open(paymentLink, "_blank");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isExpired) {
        return (
            <div className="payment-summary-container">
                <Header dueDate={formData.dueDate} />
                <div className="payment-content">
                    <div
                        className="payment-details-card"
                        style={{ gridColumn: "1 / -1", textAlign: "center" }}
                    >
                        <h2>⏰ Payment Link Expired</h2>
                        <p
                            style={{
                                fontSize: "1.1rem",
                                color: "#6c757d",
                                margin: "1rem 0",
                            }}
                        >
                            This payment link has expired.
                        </p>
                        <p style={{ color: "#6c757d", marginBottom: "2rem" }}>
                            Please contact FlashFire Jobs to request a new
                            payment link.
                        </p>
                        <button
                            onClick={() =>
                                (window.location.href = window.location.origin)
                            }
                            className="pay-now-button"
                            style={{ maxWidth: "300px" }}
                        >
                            🏠 Return to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-summary-container">
            <Header dueDate={formData.dueDate} />
            <div className="payment-content">
                <PaymentDetailsCard
                    formData={formData}
                    timeRemaining={timeRemaining}
                    expirationTime={new Date(formData.dueDate || "").getTime()}
                />
                <PaymentOptionsCard
                    customPayPalLink={customPayPalLink}
                    plan={formData.plan}
                    handlePayNow={handlePayNow}
                />
            </div>
        </div>
    );
};

export default SummaryPage;
