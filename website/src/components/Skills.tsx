import React from "react";

const skillsData = [
    {
        title: "Embedded Systems",
        description: "Linux (Jetson), Device Tree, driver development, real-time integration, Raspberry Pi / STM32 / ATtiny85."
    },
    {
        title: "Low-level & Performance",
        description: "C / C++, Rust, SIMD optimization (SSE / NEON), custom math libraries."
    },
    {
        title: "AI & Computer Vision",
        description: "Neural networks, real-time video processing, edge deployment on NVIDIA Jetson."
    },
    {
        title: "Software Engineering",
        description: "Git, CMake, Docker, Linux environments, Zsh automation, modern C++ practices."
    },
    {
        title: "Servers",
        description: "Proxmox virtualization, Linux server setup and management, Docker orchestration, automation scripts."
    },
    {
        title: "Extra",
        description: "3D prototyping & visualization (Three.js) for interactive demos and portfolio, Proxmox and Ubuntu server."
    }
];

const Skills: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
                Skills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsData.map((skill, index) => (
                    <div
                        key={index}
                        className="bg-black/30 bg-opacity-70 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-white">{skill.title}</h3>
                        <p className="text-gray-200 text-sm">{skill.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;