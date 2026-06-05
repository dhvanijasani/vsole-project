import { FaUserCircle,FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";


function Topbar() {
    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const visitor =
        JSON.parse(
            localStorage.getItem("visitor")
        );

    const [time, setTime] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().toLocaleTimeString();
            setTime(currentTime);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="topbar">
            {
                visitor ? (
                    <>
                        <h2> Welcome {" "} {visitor?.visitor_name} </h2>
                        <h4><FaUserCircle />{" "} Visitor</h4>
                    </>
                ) : (
                    <>
                        <h2>Welcome {" "} {user?.name}</h2>
                        <h4><FaUserCircle />{" "} {user?.role} </h4>
                    </>
                )
            }
            <div className="live-clock">
                <FaClock /><span>{time}</span>
            </div>
        </div>
    );
}

export default Topbar;