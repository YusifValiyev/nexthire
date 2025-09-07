import { useEffect, useState } from "react";
import { VapiWidget } from "@vapi-ai/client-sdk-react";
import "./index.css";
import { useNavigate } from "react-router";
import Loading from "../layout/Loading";

export default function Vapi() {
    const [cvData, setCvData] = useState(null);
    const [cvGenerated, setCvGenerated] = useState(null);
    const [loading, setLoading] = useState(false);
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
                    console.log(data.content)
                    navigate("/cv-preview", {
                        state: { cvData: data.content },
                    });
                    setLoading(false);
                }

                if (data.type === "error") {
                    alert(data.message || "An error occurred");
                    setLoading(false);
                }
            } catch (err) {
                console.error("Error parsing SSE data:", err);
                alert("Error parsing server response");
                setLoading(false);
            }
        };

        evtSource.onerror = (err) => {
            console.error("SSE error:", err);
            alert("SSE connection error");
            evtSource.close();
            setLoading(false);
        };

        return () => evtSource.close();
    }, [navigate]);

    const handleCallStart = () => console.log("Voice call started");
    const handleCallEnd = () => setLoading(true);
    const handleMessage = async (message) => {};
    const handleError = (error) => console.error("Widget error:", error);

    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <VapiWidget
                publicKey="8118bbe9-dae4-40c5-b7af-30300a1539be"
                assistantId="55389fd7-ee50-4c73-9cee-7bd063c11979"
                mode="voice"
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
