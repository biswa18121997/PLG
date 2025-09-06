import React, { useState, useEffect } from "react";

interface HeaderProps {
    dueDate?: string;
}

const Header: React.FC<HeaderProps> = ({ dueDate }) => {
    const [dueDateTimeRemaining, setDueDateTimeRemaining] = useState<number>(0);

    const formatTime = (seconds: number): string => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${days}d ${hours}h ${minutes}m ${secs}s`;
    };

    useEffect(() => {
        if (!dueDate) return;

        const dueDateTimestamp = new Date(dueDate).getTime();
        const timer = setInterval(() => {
            const now = Date.now();
            const remaining = Math.max(
                0,
                Math.floor((dueDateTimestamp - now) / 1000)
            );

            setDueDateTimeRemaining(remaining);
        }, 1000);

        return () => clearInterval(timer);
    }, [dueDate]);

    return (
        <header className="payment-header">
            <div className="payment-header-content">
                <div className="company-header">
                    <div className="company-logo">🔥</div>
                    <div className="company-header-info">
                        <h1>FlashFire Jobs</h1>
                        <p>Where careers ignite</p>
                    </div>
                </div>
                {dueDate && (
                    <div className="due-date-timer">
                        <div className="timer-text">
                            Due in: {formatTime(dueDateTimeRemaining)}
                        </div>
                    </div>
                )}
                <div className="payment-options-header">
                    <div className="payment-icon">💳</div>
                    <div className="payment-header-text">
                        <h3>Authorized payment options by FlashFire Jobs</h3>
                        <p className="payment-instruction">
                            Please use any of the following options for the
                            payment.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
