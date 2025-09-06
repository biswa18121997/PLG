import React from "react";
import { PaymentDetails, PLAN_DATA } from "../types";

interface PaymentDetailsCardProps {
    formData: Partial<PaymentDetails>;
    timeRemaining: number;
    expirationTime: number | null;
}

const PaymentDetailsCard: React.FC<PaymentDetailsCardProps> = ({
    formData,
    timeRemaining,
    expirationTime,
}) => {
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <div className="payment-details-card">
            <h2>Payment Details</h2>
            <div className="amount-section">
                <div className="amount-display">${formData.finalAmount}</div>
                <div className="customer-info">
                    <div className="customer-name">{formData.name}</div>
                    <div className="customer-contact">
                        <div className="contact-item">📧 {formData.email}</div>
                    </div>
                </div>
            </div>
            {!timeRemaining && expirationTime && (
                <div className="expiration-info">
                    <div className="expiration-text">
                        Expires at: {new Date(expirationTime).toLocaleString()}
                    </div>
                    <div className="timer-display">
                        Link expires in {formatTime(timeRemaining)}
                    </div>
                </div>
            )}
            <div className="due-date-section">
                <div className="due-date-label">Due Date:</div>
                <div className="due-date-value">{formData.dueDate}</div>
            </div>
            <div className="service-details-section">
                <div className="service-description">
                    {formData.description ||
                        `Enrollment in FlashFire ${formData.plan} Career Services`}
                </div>
                <div className="service-credits">Payment Credits: 1</div>
                <div className="payment-status">Payment Status: Pending</div>
                <div className="payment-id">
                    Payment Id: {Math.random().toString(36).substr(2, 9)}-
                    {Math.random().toString(36).substr(2, 4)}-
                    {Math.random().toString(36).substr(2, 4)}-
                    {Math.random().toString(36).substr(2, 4)}-
                    {Math.random().toString(36).substr(2, 12)}
                </div>
            </div>
            <div className="service-plan-section">
                <h3>Service Plan Details</h3>
                <div className="plan-info">
                    <div className="plan-name">
                        FlashFire {formData.plan} Plan
                    </div>
                    {formData.discount && (
                        <div className="discount-info">
                            <div className="discount-percentage">
                                Discount Provided:{" "}
                                {Math.round(
                                    (formData.discount /
                                        (formData.plan
                                            ? PLAN_DATA[formData.plan].price
                                            : 1)) *
                                        100
                                )}
                                %
                            </div>
                            <div className="original-price">
                                Original Price: $
                                {formData.plan
                                    ? PLAN_DATA[formData.plan].price
                                    : 0}
                            </div>
                        </div>
                    )}
                    <div className="final-price">
                        Total Amount: ${formData.finalAmount}
                    </div>
                    <div className="service-type">
                        Service Type: FlashFire {formData.plan} Career Services
                    </div>
                    <div className="payment-option">
                        Payment Option: One-time payment
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsCard;
