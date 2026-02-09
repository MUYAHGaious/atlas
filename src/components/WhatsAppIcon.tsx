import React from "react";
import WhatsAppLogo from "@/assets/whatsapp.svg";

interface WhatsAppIconProps {
    className?: string;
}

const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className }) => {
    return (
        <img
            src={WhatsAppLogo}
            alt="WhatsApp"
            className={className}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
    );
};

export default WhatsAppIcon;
