import React from "react";
import { PLAN_DATA } from "../types";

interface PaymentOptionsCardProps {
    customPayPalLink: string;
    plan?: string;
    handlePayNow: () => void;
}

const PaymentOptionsCard: React.FC<PaymentOptionsCardProps> = ({
    customPayPalLink,
    plan,
    handlePayNow,
}) => {
    return (
        <div className="right-section-container">
            <div className="payment-actions-card">
                <div className="recommended-payment">
                    <p>
                        PayPal supports payment via all commonly used credit
                        cards and additional options depending on your country.
                    </p>
                    <button onClick={handlePayNow} className="pay-now-button">
                        Pay via PayPal
                    </button>
                </div>
                <div className="payment-option">
                    <h4>Option 1: Wire Transfer (USD)</h4>
                    <div className="option-details">
                        <div className="option-detail-item">
                            <span className="detail-label">Account Name:</span>
                            <span className="detail-value">
                                FLASHFIRE PRIVATE LIMITED
                            </span>
                        </div>
                        <div className="option-detail-item">
                            <span className="detail-label">Account No:</span>
                            <span className="detail-value">50200112273760</span>
                        </div>
                        <div className="option-detail-item">
                            <span className="detail-label">IFSC Code:</span>
                            <span className="detail-value">HDFC0000131</span>
                        </div>
                        <div className="option-detail-item">
                            <span className="detail-label">SWIFT Code:</span>
                            <span className="detail-value">HDFCINBB</span>
                        </div>
                    </div>
                    <p className="option-note">
                        Please let us know once Option 1 payment is completed
                    </p>
                </div>
                <div className="payment-option">
                    <h4>Option 2: Pay in INR</h4>
                    <div className="option-details">
                        <div className="option-detail-item">
                            <span className="detail-label">Account Name:</span>
                            <span className="detail-value">
                                FLASHFIRE PRIVATE LIMITED
                            </span>
                        </div>
                        <div className="option-detail-item">
                            <span className="detail-label">Account No:</span>
                            <span className="detail-value">50200112273760</span>
                        </div>
                        <div className="option-detail-item">
                            <span className="detail-label">IFSC Code:</span>
                            <span className="detail-value">HDFC0000131</span>
                        </div>
                    </div>
                    <p className="option-note">
                        Please let us know once Option 2 payment is completed
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentOptionsCard;
