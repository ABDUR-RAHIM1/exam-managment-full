"use client"
import React, { useEffect, useState } from 'react';
import Form_title_button from '@/app/helpers/Form_title_button';
import Spinner from '@/app/helpers/Spinner';
import { getFileStatusClass } from '@/app/helpers/GetFileStatusStyle';
import useFileUploader from '@/app/helpers/fileUploader';
import { toast } from 'react-toastify';
import { postDataHandler } from '@/app/actions/admin/postData';
import { aboutPageMethods } from '@/app/constans/constans';
import { useRouter } from 'next/navigation';

export default function AddAbout() {
    const router = useRouter()
    const [posting, setPosting] = useState(false);
    const [imageType, setImageType] = useState("")
    const { uploader, uploadResponse, imgUrl } = useFileUploader();
    const { status, message } = uploadResponse;
    const [aboutPageData, setAboutPageData] = useState({
        heading: '',
        subHeading: '',
        aboutPhoto: '',
        missionTitle: '',
        missionDesc: '',
        vissionTitle: '',
        vissionDesc: '',
        whyHeading: "",
        aboutWhy: [],
        teamMembers: []
    })

    //  image url set in the State after image uploaded
    useEffect(() => {
        if (imgUrl) {

            if (imageType === "aboutPageData") {
                setAboutPageData((prev) => ({
                    ...prev,
                    aboutPhoto: imgUrl
                }))
            } else if (imageType === "members") {
                setTeamMembersInput((prev) => ({
                    ...prev,
                    photo: imgUrl
                }))
            }

        }
    }, [imgUrl, imageType])




    const [aboutWhyInput, setAboutWhyInput] = useState({
        whyTitle: '',
        whyDesc: ''
    });

    const [teamMembersInput, setTeamMembersInput] = useState({
        name: '',
        position: '',
        link: '',
        photo: ''
    });
 


    // Handlers for each category
    const handleAboutPageDataChange = (e) => {
        const { type, name, value, files } = e.target;

        if (type === "file") {
            uploader(files[0]);
            setImageType("aboutPageData")
        } else {
            setAboutPageData(prev => ({
                ...prev,
                [name]: value
            }));
        }


    };


    const handleAboutWhyChange = (e) => {
        const { name, value } = e.target;
        setAboutWhyInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // handle multiple about why Data set in Main State
    const handleMultipleWhyAdd = () => {
        setAboutPageData((prev) => ({
            ...prev,
            aboutWhy: [...prev.aboutWhy, aboutWhyInput]
        }));

        setAboutWhyInput({
            whyTitle: '',
            whyDesc: ''
        })
    }

    const handleTeamMembersChange = (e) => {
        const { type, name, value, files } = e.target;

        if (type === "file") {
            uploader(files[0]);
            setImageType("members")
        } else {
            setTeamMembersInput(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    //   handle multiple team members add in main state
    const handleMultipleMembersAdd = () => {
        setAboutPageData((prev) => ({
            ...prev,
            teamMembers: [...prev.teamMembers, teamMembersInput]
        }));

        setTeamMembersInput({
            name: '',
            position: '',
            link: '',
            memberPhoto: ''
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setPosting(true)
        try {

            const { status, result } = await postDataHandler(aboutPageData, "POST", aboutPageMethods);

            if (status === 200 || status === 201) {
                toast.success(result.message);
                router.refresh()
            } else {
                toast.error(result.message)
            }

        } catch (error) {
            toast.error("Failed to Post")
        } finally {
            setPosting(false)
        }

    };


    // const isRequiredWhyField = aboutPageData.aboutWhy?.length <= 0
    // const isRequiredMemberField = aboutPageData.teamMembers?.length <= 0

    return (
        <div className="w-full bg-gray-100 p-5">
            <div className="bg-white py-5 px-2 w-full m-auto">
                <Form_title_button text={"About Page"} />
                <form onSubmit={handleSubmit}>

                    {/* About Header Part */}
                    <h4 className='aboutFormCardTitle'>Header</h4>
                    <div className='aboutFormCard'>
                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="heading">
                                Heading
                            </label>
                            <input
                                type="text"
                                id="heading"
                                name="heading"
                                className="input"
                                placeholder="Write a Heading"
                                value={aboutPageData.heading}
                                onChange={handleAboutPageDataChange}
                                required
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="subHeading">Sub Heading</label>
                            <input
                                type="text"
                                id="subHeading"
                                name="subHeading"
                                className="input"
                                placeholder="Write a Sub Heading"
                                value={aboutPageData.subHeading}
                                onChange={handleAboutPageDataChange}
                                required
                            />
                        </div>

                        <div className='w-full md:w-[48%] m-auto'>
                            <label htmlFor="heading" className={imageType === "aboutPageData" && getFileStatusClass(status)}>
                                {
                                    imageType === "aboutPageData" &&
                                    message || "Cover Photo"
                                }
                            </label>
                            <input
                                type="file"
                                id="aboutPhoto"
                                name="aboutPhoto"
                                className="input"
                                onChange={handleAboutPageDataChange}
                                required
                            />
                        </div>
                    </div>

                    {/* About Mission and Vision Part */}
                    <h4 className='aboutFormCardTitle'>Mission and Vision</h4>
                    <div className='aboutFormCard'>
                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="missionTitle">Mission Title</label>
                            <input
                                type="text"
                                id="missionTitle"
                                name="missionTitle"
                                className="input"
                                placeholder="Write a Mission Title"
                                value={aboutPageData.missionTitle}
                                onChange={handleAboutPageDataChange}
                                required
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="missionDesc">Mission Description</label>
                            <input
                                type="text"
                                id="missionDesc"
                                name="missionDesc"
                                className="input"
                                placeholder="Write a Mission Description"
                                value={aboutPageData.missionDesc}
                                onChange={handleAboutPageDataChange}
                                required
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="vissionTitle">Vision Title</label>
                            <input
                                type="text"
                                id="vissionTitle"
                                name="vissionTitle"
                                className="input"
                                placeholder="Write a Vision Title"
                                value={aboutPageData.vissionTitle}
                                onChange={handleAboutPageDataChange}
                                required
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="vissionDesc">Vision Description</label>
                            <input
                                type="text"
                                id="vissionDesc"
                                name="vissionDesc"
                                className="input"
                                placeholder="Write a Vision Description"
                                value={aboutPageData.vissionDesc}
                                onChange={handleAboutPageDataChange}
                                required
                            />
                        </div>
                    </div>

                    {/* About Why Choose Part */}
                    <h4 className='aboutFormCardTitle'>Why Choose Us - ({aboutPageData.aboutWhy?.length}) </h4>
                    <div className='aboutFormCard'>
                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="whyHeading">Why Heading</label>
                            <input
                                type="text"
                                id="whyHeading"
                                name="whyHeading"
                                className="input"
                                placeholder="Write a Why Heading"
                                value={aboutPageData.whyHeading}
                                onChange={handleAboutPageDataChange}
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="whyTitle">Why Title</label>
                            <input
                                type="text"
                                id="whyTitle"
                                name="whyTitle"
                                className="input"
                                placeholder="Write a Why Title"
                                value={aboutWhyInput.whyTitle}
                                onChange={handleAboutWhyChange}
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="whyDesc">Why Description</label>
                            <textarea
                                rows={5}
                                id="whyDesc"
                                name="whyDesc"
                                className="input"
                                placeholder="Write a Why Description"
                                value={aboutWhyInput.whyDesc}
                                onChange={handleAboutWhyChange}
                            />
                        </div>
                        <div className=' w-full md:w-[48%] m-auto'>
                            <button onClick={handleMultipleWhyAdd} type='button' className=' w-full p-3 bg-slate-200 rounded-md font-bold'>
                                Add
                            </button>

                        </div>
                    </div>

                    {/* Add Members Part */}
                    <h4 className='aboutFormCardTitle'>Add Members - ({aboutPageData.teamMembers?.length})</h4>
                    <div className='aboutFormCard'>
                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="input"
                                placeholder="Write a Member Name"
                                value={teamMembersInput.name}
                                onChange={handleTeamMembersChange}
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="position">Position</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                className="input"
                                placeholder="Write a Position"
                                value={teamMembersInput.position}
                                onChange={handleTeamMembersChange}
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="link">Link</label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                className="input"
                                value={teamMembersInput.link}
                                placeholder="Enter a Link"
                                onChange={handleTeamMembersChange}
                            />
                        </div>

                        <div className='w-full md:w-[48%]'>
                            <label htmlFor="memberPhoto" className={imageType === "members" && getFileStatusClass(status)}>
                                {
                                    imageType === "members" &&
                                    message || " Photo"
                                }
                            </label>
                            <input
                                type="file"
                                id="memberPhoto"
                                name="memberPhoto"
                                className="input"
                                onChange={handleTeamMembersChange}
                            />
                        </div>
                        <div className=' w-full md:w-[48%] m-auto'>
                            <button onClick={handleMultipleMembersAdd} type='button' className=' w-full p-3 bg-slate-200  rounded-md font-bold'>
                                Add
                            </button>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                    >
                        {posting ? <Spinner /> : "Add About Page"}
                    </button>
                </form>
            </div>
        </div>
    );
}
