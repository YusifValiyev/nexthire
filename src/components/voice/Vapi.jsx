import { VapiWidget } from "@vapi-ai/client-sdk-react";
import { useEffect } from "react";

export default function Vapi() {
    useEffect(() => {
        async function getData() {
            const response = await fetch(
                "https://primary-production-ccc3.up.railway.app/webhook-test/blueone",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }
        getData();
    }, []);
    const handleCallStart = () => {
        console.log("Voice call started");
    };

    const handleCallEnd = () => {
        console.log("Voice call ended");
    };

    const handleMessage = (message) => {
        console.log("Message received:", message);
    };

    const handleError = (error) => {
        console.error("Widget error:", error);
    };

    return (
        <VapiWidget
            publicKey="8118bbe9-dae4-40c5-b7af-30300a1539be"
            assistantId="55389fd7-ee50-4c73-9cee-7bd063c11979"
            assistantOverrides={{
                variableValues: { name: "John" },
            }}
            mode="hybrid"
            consentRequired={true}
            consentTitle="Privacy Agreement"
            consentContent="By using this service, you agree to our terms..."
            title="Support Assistant"
            hybridEmptyMessage="Start a conversation with voice or text"
            onMessage={handleMessage}
            onError={handleError}
        />
    );
}
