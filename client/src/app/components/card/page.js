"use client";
import React from 'react';

export default function Card({ name, title, imageUrl, expertise, linkedinUrl = "#" }) {
    const defaultExpertise = ['Expert Teacher'];
    const displayExpertise = expertise && expertise.length > 0 ? expertise : defaultExpertise;

    return (
        <div className="w-80 flex-shrink-0 bg-white rounded-xl shadow-lg border border-gray-100 p-6 m-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
            <div className="flex flex-col items-center text-center flex-grow">
                <img
                    src={imageUrl || 'https://placehold.co/100x100/fcf6f1/111827?text=Mentor'}
                    alt={`Photo of ${name || 'Teacher'}`}
                    width="100"
                    height="100"
                    className="rounded-full border-4 border-accent/30 object-cover mb-4"
                />
                <h3 className="text-xl font-bold text-primary-text">{name || 'Teacher Name'}</h3>
                <p className="text-gray-500 text-sm mb-5 h-10">{title || 'Educator Title'}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {displayExpertise.map((skill, index) => (
                        <span key={index} className="px-3 py-1 text-xs font-medium text-gray-700 bg-accent/20 rounded-full">
              {skill}
            </span>
                    ))}
                </div>
            </div>

            <div className="mt-auto">
                <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-accent text-primary-text px-5 py-2.5 rounded-md font-medium shadow-md hover:bg-yellow-300 transition-colors duration-200"
                >
                    View Profile
                </a>
            </div>
        </div>
    );
}
