import { VapiWidget } from "@vapi-ai/client-sdk-react";
import { useEffect } from "react";
import "./index.css";

export default function Vapi() {
    const handleCallStart = () => {
        console.log("Voice call started");
    };

    const handleCallEnd = () => {
        console.log("Voice call ended");
    };

    const handleMessage = async (message) => {};

    const handleError = (error) => {
        console.error("Widget error:", error);
    };

    return (
        <VapiWidget
            publicKey="8118bbe9-dae4-40c5-b7af-30300a1539be"
            assistantId="55389fd7-ee50-4c73-9cee-7bd063c11979"
            mode="voice"
            onMessage={handleMessage}
            onError={handleError}
            ctaButtonColor="#000"
            voiceShowTranscript={true}
            accentColor="#a282ff"
        />
    );
}
