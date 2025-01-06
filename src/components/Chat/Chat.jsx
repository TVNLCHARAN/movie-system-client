import React, { useState } from "react";
import "./Chat.css";
const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const apiKey = "AIzaSyA7u8ubenNdNrLBKwptm25M8b3Zs6fjt-A";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const Chat = () => {
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    async function run(query) {
        const parts = [
            { text: "input: Charan: Hi" },
            { text: "output: Hi Charan, How can I help you today!" },
            { text: "input: Charan: I want you to guide the users who visit my website regarding tech fest in my college." },
            { text: "output: Sure Charan, What can I do to guide them." },
            { text: "input: Charan: Remember that the tech fest is going to happen from 27th Feb, and is named Teckzite and the participation fee is 250rs." },
            { text: "output: Sure thing, I will not forget that." },
            { text: "input: Charan: What is the participation fee?" },
            { text: "output: The participation fee for Teckzite is ₹250. You can register and make your payment right here on the website. If you prefer offline payment, registrations will open soon at the college help desk. Don't miss the chance to be part of this exciting event! 🎉" },
            { text: "input: Charan: What events can I participate in?" },
            { text: "output: Hey Charan, Teckzite offers a mix of open-to-all events and department-specific challenges:Open-to-All: IPL Auction, Treasure Hunt, Free Fire, Crime Scene Investigation, and Project Expos.Department-Specific:CSE: SQL Break the Query, Code-o-Fiesta, Tech Enigma, Web Design.ECE: Electrospectra, Hackathons, Solve for Tomorrow.Let me know your department, and I'll guide you further! 🤖✨" },
            { text: "input: Charan: I am from CSE. What events are for me?" },
            { text: "output: As a CSE student, you have some fantastic options:SQL Break the Query: Test your SQL and database skills.Code-o-Fiesta: Solve challenging coding problems.Tech Enigma: Showcase your tech knowledge through quizzes.Web Design: Create stunning web pages to compete with others.Each event offers exciting prizes! Gear up and make your mark! 💻🏆" },
            { text: "input: Charan: What is Code-o-Fiesta?" },
            { text: "output: Code-o-Fiesta is a competitive coding event where participants solve programming problems within a time limit. It’s the ultimate test of your coding and problem-solving skills. 💡 Winners receive attractive cash prizes! Are you ready to showcase your talents? 🖥️🚀" },
            { text: "input: Charan: I don’t want to participate in any event." },
            { text: "output: Participating is the best way to make the most of Teckzite! 🎯 Even if you’re unsure, events like the Treasure Hunt, IPL Auction, or Project Expos are fun, light-hearted, and great opportunities to bond with peers. Don’t miss this chance to explore charan, learn, and enjoy! ✨💪" },
            { text: "input: Charan: What is Tech Enigma?" },
            { text: "output: Tech Enigma is a tech-based quiz competition designed to test your general tech knowledge, logical thinking, and problem-solving abilities. Compete with others and win exciting prizes! Are you ready for the challenge? 🎉🧠" },
            { text: "input: Where will Teckzite be held?" },
            { text: "output: Teckzite will take place on our college campus, with specific venues allocated for each event. The final schedule and location map will be shared soon. Stay tuned and plan your participation! 🏫📍" },
            { text: "input: Charan: Can I pay the fee offline?" },
            { text: "output: Yes, you can! Offline registrations will be available soon at our college help desk. Keep an eye on the updates section for exact dates and times. But why wait? Register online now to secure your spot and avoid the rush! 📝✨" },
            { text: "input: Charan: What is IPL Auction?" },
            { text: "output: IPL Auction is an interactive and strategic event where participants form teams and bid on players to create their dream IPL lineup. It’s a fun and thrilling experience for cricket lovers! 🏏🔥 Get ready to outbid and outsmart your competitors!" },
            { text: "input: What are the prizes for winning events?" },
            { text: "output: All winners will receive cash prizes, certificates, and trophies 🏆 to commemorate their achievements. Beyond prizes, you'll gain invaluable experience, connections, and memories that last a lifetime. Isn't that worth participating for? 🌟🎓" },
            { text: "input: Are there any workshops during the fest?" },
            { text: "output: Yes, Teckzite is hosting exclusive workshops to help you learn and upskill. Topics include AI & ML, IoT, Web Development, Cybersecurity, and Robotics. Check the workshops section for detailed schedules and fees (if applicable). Don’t miss the chance to learn from industry experts! 🛠️💡" },
            { text: "input: Is accommodation available for outstation participants?" },
            { text: "output: Absolutely! We provide on-campus accommodation for outstation participants. Rooms will be allocated on a first-come, first-served basis. Please mention your requirement during registration. For details on charges and facilities, check the Accommodation section. 🏨🛏️" },
            { text: "input: Can I participate in more than one event?" },
            { text: "output: Of course! You can register for as many events as you like, as long as the event timings don’t overlap. Explore the events section to plan your participation and make the most of Teckzite! 🏆🎯" },
            { text: "input: What is the deadline for registration?" },
            { text: "output: The registration deadline for Teckzite is 25th February 2025. Be sure to register before the deadline to confirm your spot. Why wait? Sign up now and get ready to experience an exciting fest! 🕒✨" },
            { text: "input: Are there any team events?" },
            { text: "output: Yes, many events at Teckzite are team-based, such as the Treasure Hunt, IPL Auction, and Hackathons. Team sizes vary depending on the event, so check the specific event rules for details. Team up with your friends and aim for victory! 🤝🏅" },
            { text: "input: What is teckzite?" },
            { text: "output: Teckzite is a national-level technological extravaganza that ignites young minds with its unique vision for the future of technology. Organized by the SDCAC wing of RGUKT Nuzvid, it serves as South India's largest pageant. Our vision for Teckzite is to not only impart knowledge and deepen thinking but also to explore new horizons in technology.The event this time spans over 2 days and 3 nights, packed with a wide array of competitions, exhibitions, and entertainment activities. Participants engage in various technical competitions ranging from coding challenges, robotics competitions, circuit designing, to hackathons. These events provide students with the opportunity to apply their theoretical knowledge to real-world problems, fostering innovation and critical thinking.Moreover, Teckzite often hosts workshops and seminars conducted by industry experts and academics. These sessions cover a wide range of topics including the latest technological advancements, career guidance, entrepreneurship, and emerging trends in various fields. Beyond the competitive events and workshops, fun activities, gaming zones, cultural performances, and celebrity appearances add an element of entertainment and excitement to the festival, creating a vibrant and dynamic atmosphere.Every time, the event comes with a new theme, aiming to inspire creativity and innovation among participants. The theme for this year's Teckzite is METAVERSE, a virtual reality space, where people can interact, play and work in a digital world. The theme is to impart knowledge on students to know more about Virtual Reality and Augmented Reality. The futur e of technology lies in the hands of metaverse \"Metaverse,\" embodies innovation, creativity, and the explora tion of new frontiers in technology. Participants are encouraged to envision and create their own interpretation s of the metaverse, pushing the boundaries of virtual reality, social interaction, and digital experiences. Through workshops, competitions, and discussions, Teckzite aims to inspire and empower students to contribute to the ongoing evolution of the metaverse and shape the future of digital technology." },
            { text: "input: Are there any games to play?" },
            { text: "output: Yes, there are many game stalls arranged by the students in the academic blocks. Teckzite will feature exciting game stalls in the academic blocks, including:Virtual Reality Gaming 🎮Dart and Shooting Games 🎯Fun Arcade Challenges 🕹️Mini Sports Activities 🏐These stalls are open to all attendees, so bring your friends and enjoy the fun side of Teckzite! 🎉" },
            { text: "input: What happens during the guest nights?" },
            { text: "output: Guest nights at Teckzite will be unforgettable! 🌟 We have celebrity performances, live music, stand-up comedy, and more planned. These events are the perfect way to relax and celebrate after a day of tech-filled excitement. Don’t miss the chance to witness some incredible performances! 🎤🎸" },
            { text: "input: Will there be food stalls or dining options?" },
            { text: "output: Yes, Teckzite will have food stalls serving a variety of snacks, beverages, and meals 🍔☕. These will be available near the event zones and game stalls, so you can enjoy a quick bite while exploring the fest. Delicious food and tech vibes—what more could you ask for? 🍕🎉" },
        ];

        const newElement = [
            { text: `input: ${query}` },
            { text: "output: " },
        ];

        parts.push(...newElement);

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
        });
        console.log(result.response.text());
        return result.response.text();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const newChatHistory = [...chatHistory, { question: query, response: "" }];
        setChatHistory(newChatHistory);

        try {
            const answer = await run(query) || "No response received!";
            console.log(answer);
            animateResponse(answer, newChatHistory.length - 1);
        } catch (error) {
            console.error("Error fetching response:", error);
            const errorMessage =
                error.response?.status === 401
                    ? "Unauthorized: Please check your API key."
                    : "An error occurred while fetching the response!";

            setChatHistory((prevHistory) =>
                prevHistory.map((item, index) =>
                    index === prevHistory.length - 1 ? { ...item, response: errorMessage } : item
                )
            );
        }

        setQuery("");
    };
    const animateResponse = (responseText, chatIndex) => {
        const words = responseText.split(" ");
        let animatedText = "";

        words.forEach((word, index) => {
            setTimeout(() => {
                animatedText += `${word} `;
                setChatHistory((prevHistory) =>
                    prevHistory.map((item, i) =>
                        i === chatIndex ? { ...item, response: animatedText.trim() } : item
                    )
                );
            }, index * 100);
        });
    };

    return (
        <div className="chat-container">
            <h1 className="chat-title">AI Chatbot</h1>
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    className="chat-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your query here..."
                />
                <button type="submit" className="chat-submit">
                    Send
                </button>
            </form>
            <div className="chat-history">
                {chatHistory.map((item, index) => (
                    <div key={index} className="chat-message">
                        <div className="chat-question">
                            <strong>Q:</strong> {item.question}
                        </div>
                        <div className="chat-response">
                            <strong>A:</strong> {item.response}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chat;
