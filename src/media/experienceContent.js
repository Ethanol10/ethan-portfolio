import utsImg from './uts.jpeg'
import thinkunImg from './thinkun.jpeg'
import gradconnectionImg from './gradconnection_logo.jpeg'
import { MONTHS_COMPACT } from '../consts'

const currentDate = new Date();

export const professionalExperienceContent = [
    {
        "id": "gc",
        "title": "SEEK: GradConnection - Associate Software Engineer",
        "date_range": `Feb 2022 - ${MONTHS_COMPACT[currentDate.getMonth()]} ${currentDate.getUTCFullYear()} (Present)`,
        "short_description": "Worked on the development and maintenance of GradConnection's website, tackling issues on both the Frontend and Backend in React and Django respectively.",
        "can_expand": true,
        "img": gradconnectionImg,
        "description": `Worked on the development and maintenance of GradConnection's website, tackling issues on both the Frontend and Backend in React and Django respectively.\n\n
        Frontend:\n
        - Developed multiple components, connecting to a backend through middleware to retrieve data from the database.\n
        - Reformatted the routing of routes in the website to simplify the maintenance of the websites when adding more pages\n\n

        Backend:\n
        - Created endpoints for the internal API for the frontend to query the database on securely\n
        - Worked with the GradConnection's homegrown stat aggregating software to simplify and speedup queries regarding stats on advertising performance\n
        - Created scripts to port data over between old and new database models.\n
        - Added Full Text Searching to enrich job discovery while maintaining performance\n
        - Implemented interface between AI models to perform some AI tasks for the website\n`,
    },
    {
        "id": "utscas",
        "title": "University of Technology, Sydney: Center for Autonomous Systems - Software Engineer Internship",
        "date_range": "Aug 2020 - Jan 2021",
        "short_description": "Worked on the conversion between Point clouds to detailed 3D models, utilising Python and MeshLab's XML interface.",
        "can_expand": true,
        "img": utsImg,
        "description": `Worked on the conversion between Point clouds to detailed 3D models, utilising Python and MeshLab's XML interface. This was used to generate a model for the inner side of a pipe scanned by a robot built by UTS: Centre for Autonomous Systems.\n\n
        - Developed using Python to convert point clouds to 3D models\n
        - Worked extensively using MeshLab's XML scripts to seamlessly generate models\n
        - Generated a UI built from scratch using Tkinter\n`
    },
    {
        "id": "thinkun",
        "title": "Thinkun - Software Engineer Internship",
        "date_range": "Aug 2018 - Feb 2019",
        "short_description": "Worked on developing and maintaining solutions within the company, specifically working on their inhouse Mobile Application, Blrt.",
        "can_expand": true,
        "img": thinkunImg,
        "description": `Worked on developing and maintaining solutions within the company, specifically working on the Mobile application, Blrt.\n\n
        - Devised a method of anti-aliasing drawing tools with C++\n
        - Worked with and learnt to use WebAssembly\n
        - Assisted the development of a new method of testing the proprietary mobile app within the company\n`
    }
]

export const educationContent = [
    {
        "id": "bach",
        "title": "Bachelor of Engineering (Honours), Diploma in Professional Engineering Practice (Software Major)",
        "date_range": "2017 - 2021",
        "short_description": "University of Technology, Sydney, 5.9 GPA / 79.43 WAM (Distinction Average)",
        "can_expand": false,
        "img": utsImg,
        "description": ""
    },
    {
        "id": "japanese",
        "title": "Diploma in Languages (Japanese)",
        "date_range": "2019 - 2021",
        "short_description": "University of Technology, Sydney, 6.5 GPA / 83.6 WAM (Distinction Average)",
        "can_expand": false,
        "img": utsImg,
        "description": ""
    }
]