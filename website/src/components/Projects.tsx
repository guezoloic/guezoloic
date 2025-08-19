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
                console.error("Error while loading repos", err);
            }
        };

        fetchRepos();
    }, []);

    return (
        <section
            className="w-full max-w-5xl mx-auto px-4"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
                Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                    <a
                        key={repo.name}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/30 bg-opacity-70 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-white">{repo.name}</h3>
                        <p className="text-gray-200 text-sm">{repo.description || "No description"}</p>
                        
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