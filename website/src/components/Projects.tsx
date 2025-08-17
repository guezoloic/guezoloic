import React, { useEffect, useState } from "react";

export interface ProjectProps {
    name: string;
    description: string;
    html_url: string;
    language: string | null;
}

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<ProjectProps[]>([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const res = await fetch(`https://api.github.com/users/guezoloic/repos?per_page=100`);
                const data = await res.json();

                const sorted = data
                    .filter((repo: any) => !repo.fork)
                    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 6)
                    .map((repo: any) => ({
                        name: repo.name,
                        description: repo.description,
                        html_url: repo.html_url,
                        language: repo.language,
                    }));

                setRepos(sorted);
            } catch (err) {
                console.error("Erreur en récupérant les repos:", err);
            }
        };

        fetchRepos();
    }, []);

    return (
        <section
            id="projects"
            className="min-h-screen px-6 md:px-24 py-10 flex flex-col items-center gap-10"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">
                My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {repos.map((repo) => (
                    <a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/30 border border-white/20 rounded-xl shadow-md p-6 hover:scale-105 transition-transform duration-300 flex flex-col justify-between"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">{repo.name}</h3>
                        <p className="text-gray-300 mb-4">{repo.description || "No description"}</p>
                        {repo.language && (
                            <span className="text-sm font-medium text-gray-400">{repo.language}</span>
                        )}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Projects;