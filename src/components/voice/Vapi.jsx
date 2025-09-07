import { useEffect, useState } from "react";
import { VapiWidget } from "@vapi-ai/client-sdk-react";
import "./index.css";
import { useNavigate } from "react-router";
import Loading from "../layout/Loading";
import { toast } from "react-toastify";

export default function Vapi() {
    const [cvData, setCvData] = useState(null);
    const [cvGenerated, setCvGenerated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const endedMessages = [
        "please end call",
        "please end the call",
        "end call",
    ];

    function isEndedMessage(message) {
        for (let item of endedMessages) {
            if (message.includes(item)) {
                return true;
            }
        }
        return false;
    }

    const navigate = useNavigate();

    useEffect(() => {
        const evtSource = new EventSource(
            "https://nexthirebackend.vercel.app/events"
        );

        evtSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === "cv-generated") {
                    setCvGenerated(data.content);
                    console.log(data.content);
                    toast.success("CV generated successfully");
                    navigate("/cv-preview", {
                        state: { cvData: data.content },
                    });
                    setLoading(false);
                }

                if (data.type === "error" && data.errorType === "user-error") {
                    toast.error(data.message);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error parsing SSE data:", err);
                toast.error("Something went wrong");
                setLoading(false);
            }
        };

        evtSource.onerror = (err) => {
            console.error("SSE error:", err);
            evtSource.close();
            setLoading(false);
        };

        return () => evtSource.close();
    }, [navigate]);

    const handleCallStart = () => console.log("Voice call started");
    const handleCallEnd = () => setLoading(true);
    const handleMessage = async (message) => {
        setMessages((prev) => [...prev, message]);

        // Mesaj bitişini yoxla
        if (
            message.role === "assistant" &&
            typeof message.content === "string" &&
            isEndedMessage(message.content)
        ) {
            // Call bitdi → bütün user mesajlarını backend-ə göndər
            try {
                setLoading(true);
                const userMessages = messages
                    .filter(
                        (m) =>
                            m.role === "user" && typeof m.content === "string"
                    )
                    .map((m) => ({ role: "user", message: m.content }));

                await fetch("https://nexthirebackend.vercel.app/webhook-chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: userMessages }),
                });
            } catch (err) {
                console.error("Failed to send chat messages:", err);
                toast.error("Failed to send messages to server");
                setLoading(false);
            }
        }
    };
    const handleError = (error) => console.error("Widget error:", error);

    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <VapiWidget
                publicKey="8118bbe9-dae4-40c5-b7af-30300a1539be"
                assistantId="55389fd7-ee50-4c73-9cee-7bd063c11979"
                mode="hybrid"
                onMessage={handleMessage}
                onVoiceEnd={handleCallEnd}
                onVoiceStart={handleCallStart}
                onError={handleError}
                ctaButtonColor="#000"
                voiceShowTranscript={true}
                accentColor="#a282ff"
            />
        </div>
    );
}
