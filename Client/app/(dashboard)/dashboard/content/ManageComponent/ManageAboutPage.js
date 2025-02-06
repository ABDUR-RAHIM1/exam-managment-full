import Link from 'next/link';
import React from 'react';
import AboutActions from '../about/AboutActions';
import Image from 'next/image';

export default function ManageAboutPage({ aboutData }) {
    const { heading, subHeading, aboutPhoto, missionTitle, missionDesc, vissionTitle, vissionDesc, whyHeading, aboutWhy, teamMembers } = aboutData;
 

    return (
        <>
            <AboutActions
                aboutData={aboutData}
            />

            <div className="about-page-container my-10 px-4">

                {/* Heading and SubHeading */}
                <section className="heading-section text-center mb-12">
                    <h1 className="text-4xl font-bold">{heading}</h1>
                    <p className="text-lg mt-2">{subHeading}</p>
                </section>

                {/* About Photo (Full Width) */}
                <section className="about-photo">
                    <Image width={1000} height={500} src={aboutPhoto} alt={`tickmarkq ${subHeading}`} className="w-full h-96 object-cover rounded-lg" />
                </section>

                {/* Mission & Vision (Two Cards) */}
                <section className="mission-vision mt-16 flex justify-between space-x-4">
                    {/* Mission Card */}
                    <div className="mission w-full lg:w-1/2 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold">{missionTitle}</h2>
                        <p className="mt-4 text-gray-700">{missionDesc}</p>
                    </div>

                    {/* Vision Card */}
                    <div className="vision w-full lg:w-1/2 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold">{vissionTitle}</h2>
                        <p className="mt-4 text-gray-700">{vissionDesc}</p>
                    </div>
                </section>

                {/* Why Section */}
                <section className="why mt-16 text-center">
                    <h2 className="text-3xl font-bold">{whyHeading}</h2>
                    <div className="why-cards mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {aboutWhy.map((item, index) => (
                            <div key={index} className="why-item p-6 bg-white shadow-lg rounded-lg text-left">
                                <h3 className="text-xl font-semibold">{item.whyTitle}</h3>
                                <p className="mt-2 text-gray-600">{item.whyDesc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="team mt-16 text-center">
                    <h2 className="text-3xl font-bold">Our Team</h2>
                    <div className="team-members mt-8  flex justify-between flex-wrap px-4">
                        {teamMembers.map((member, index) => (
                            <div key={index} className=" w-full md:w-[22%]  bg-white rounded-lg shadow-lg p-6 text-center">
                                <Image width={100} height={100} src={member.photo} alt={member.name} className="w-16 h-16 mx-auto rounded-full" />
                                {member.link &&
                                    <a href={member.link} target='_blank' className="text-lg font-semibold mt-4 text-blue-500  my-2 inline-block">{member.name}</a>}
                                <p className="text-sm text-gray-600">{member.position}</p>

                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </>
    );
}
