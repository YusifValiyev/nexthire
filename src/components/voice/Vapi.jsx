import { useEffect, useState, useRef } from "react";
import { VapiWidget } from "@vapi-ai/client-sdk-react";
import "./index.css";
import { useNavigate } from "react-router";
import Loading from "../layout/Loading";
import { toast } from "react-toastify";

export default function Vapi() {
    const [cvGenerated, setCvGenerated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const evtSourceRef = useRef(null); // 👈 EventSource-u yadda saxlayırıq

    const endedMessages = [
        "please end call",
        "please end the call",
        "end call",
    ];

    function isEndedMessage(message) {
        return endedMessages.some((item) => message.includes(item));
    }

    const navigate = useNavigate();

    // SSE-dən gələn mesajları handle edən funksiya
    const initEventSource = () => {
        if (evtSourceRef.current) return; // artıq açılıbsa təkrar açma

        const evtSource = new EventSource(
            "https://nexthirebackend.vercel.app/events"
        );
        evtSourceRef.current = evtSource;

        evtSource.onmessage = (event) => {
            console.log(event);
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
                    closeEventSource(); // işimiz bitdi → bağla
                }

                if (data.type === "error" && data.errorType === "user-error") {
                    toast.error(data.message);
                    setLoading(false);
                    closeEventSource(); // error olsa da bağla
                }
            } catch (err) {
                console.error("Error parsing SSE data:", err);
                toast.error("Something went wrong");
                setLoading(false);
                closeEventSource();
            }
        };

        evtSource.onerror = (err) => {
            console.error("SSE error:", err);
            setLoading(false);
            closeEventSource();
        };
    };

    const closeEventSource = () => {
        if (evtSourceRef.current) {
            evtSourceRef.current.close();
            evtSourceRef.current = null;
        }
    };

    // komponent unmount olarsa SSE-ni bağla
    useEffect(() => {
        return () => closeEventSource();
    }, []);

    const handleCallStart = () => {
        console.log("Voice call started");
        initEventSource(); // 👈 Call start olanda SSE-ni açırıq
    };

    const handleCallEnd = () => {
        setLoading(true);
        // Call bitəndə də istəsən bağlaya bilərsən (yuxarıda closeEventSource çağırmaq olar)
    };

    const handleMessage = async (message) => {
        setMessages((prev) => [...prev, message]);

        if (
            message.role === "assistant" &&
            typeof message.content === "string" &&
            isEndedMessage(message.content)
        ) {
            try {
                setLoading(true);
                const userMessages = messages
                    .filter(
                        (m) =>
                            m.role === "user" && typeof m.content === "string"
                    )
                    .map((m) => ({ role: "user", message: m.content }));

                const response = await fetch(
                    "https://nexthirebackend.vercel.app/webhook-chat",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ messages: userMessages }),
                    }
                );
                const data = await response.json();
                setCvGenerated(data);
                navigate("/cv-preview", {
                    state: { cvData: data.cv },
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
                publicKey="4444ee11-96a0-4bac-a85a-e688eb1dc986"
                assistantId="4546a733-7705-4110-a501-36ca14aed740"
                mode="hybrid"
                onMessage={handleMessage}
                onVoiceEnd={handleCallEnd}
                onVoiceStart={handleCallStart} // 👈 burada SSE start
                onError={handleError}
                ctaButtonColor="#000"
                voiceShowTranscript={true}
                accentColor="#a282ff"
            />
        </div>
    );
}
