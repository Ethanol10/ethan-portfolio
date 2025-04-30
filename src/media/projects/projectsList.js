import arsonist1 from "./arsonist1.png";
import arsonist2 from "./arsonist2.png";
import arsonist3 from "./arsonist3.png";
import arsonistancientscepterposter from "./arsonistancientsceptreposter.png";
import githubImg from "../github-logo.png";
import thunderstore from "../thunderstore.png";
import lee1 from "./lee1.png";
import lee2 from "./lee2.png";
import lee3 from "./lee3.png";
import lee4 from "./lee4.png";
import lee5 from "./lee5.png";
import lee6 from "./lee6.png";
import lee7 from "./lee7.png";
import v2lee1 from "./v2lee1.png";
import v2lee2 from "./v2lee2.png";
import v2lee3 from "./v2lee3.png";
import v2lee4 from "./v2lee4.png";
import v2lee5 from "./v2lee5.png";
import v2lee6 from "./v2lee6.png";
import duo1 from "./duo1.jpg";
import duo2 from "./duo2.jpg";


export const projectsList = 
[
    {
        "id": "arsonist-ror2",
        "title": "Arsonist - Risk of Rain 2 Mod",
        "related_urls": [
            {
                "title": "Thundestore (Download link)",
                "url": "https://thunderstore.io/package/PopcornFactory/Arsonist_Mod/",
                "img": thunderstore,
            }, 
            {
                "title": "Github (Source code)",
                "url": "https://github.com/Popcorn-Factory/Arsonist-RoR2",
                "img": githubImg,
            }],
        "description": "This is a Modification to the game Risk of Rain 2 (RoR2) that adds a playable character survivor.\n You play as a pyromaniac who has a variety of fire-oriented abilities. This character requires resource management and careful planning in order to make the most of his abilities. I have worked on the programming for all this character's abilities, creating various custom components that work together and implement new functionality not seen in the base game of RoR2.\n I have also pushed to create VFX in the style of the original game, to make it seamlessly fit into the game as if it were a character apart of the base game. So far this mod has received 3 major updates, and has a total of 1,279,409 downloads total since Apr 2025.",
        "imgs": [
            {
                "img": arsonist1,
                "caption": "Arsonist fighting an Elder Lemurian using the Ancient Scepter mod, firing the Flamethrower ability."
            }, 
            {
                "img": arsonist2,
                "caption": "Arsonist firing a powered up fireball ability using the Ancient Scepter mod."
            }, 
            {
                "img": arsonist3,
                "caption": "Arsonist setting off one of the new abilities that was introduced in v3.0."
            },
        ],
        "videos": [
            {
                "title": "Arsonist v1.0 Release Trailer",
                "location": "youtube",
                "url": "https://www.youtube.com/embed/Aez62FNzMTg"
            },
            {
                "title": "Arsonist v2.0 Update Trailer",
                "location": "youtube",
                "url": "https://www.youtube.com/embed/y8EZUXso7Lc"
            }
        ],
        "body_images": [
            {   
                "title": "Arsonist v3.0 Update Poster",
                "attribution": "Poster Art by DragonRollZ",
                "img": arsonistancientscepterposter,
            }

        ]
    },
    {
        "id": "lee-hyperreal-ror2",
        "title": "Lee: Hyperreal - Risk of Rain 2 Mod",
        "description": "This is a Risk of Rain 2 Mod that ports the character \"Lee: Hyperreal\" from the game \"Punishing: Grey Raven\". For this mod, I had worked with multiple other modders to a create a character that is as faithful to the original character from the aforementioned game.\n This character pulls abilities and concepts from the original game, for example, the character's ability to parry attacks, and the combination of the unique abilities that require matching 3 to power up the ability further. All these abilties utilise custom components that had to be created from scratch, which was a challenge to implement.\n I made sure to encapsulate these components similarly to the MVC concept, with data classes separated from the controllers that control the UI, helping to keep the code clean and easy to read. This mod has received 75,988 downloads since its release in May 2025. \nIn a second major update, I utilised a dictionary to quickly retrieve pre-cached colour variants of existing effects, modified on startup to help keep the performance of the mod whiel granting a whole slew of new colours for player to enjoy.",
        "related_urls": [
            {
                "title": "Thundestore (Download link)",
                "url": "https://thunderstore.io/package/PopcornFactory/Lee_Hyperreal/",
                "img": thunderstore,
            }, 
            {
                "title": "Github (Source code)",
                "url": "https://github.com/Popcorn-Factory/lee-hyperreal-ror2",
                "img": githubImg,
            }],
        "imgs": [
            {
                "img": v2lee1,
                "caption": "Lee: Hyperreal with new recoloured VFX and RoR-themed skin"
            },
            {
                "img": v2lee2,
                "caption": "Lee: Hyperreal with new recoloured VFX and RoR-themed skin"
            },
            {
                "img": v2lee3,
                "caption": "Lee: Hyperreal with new recoloured VFX and RoR-themed skin"
            },
            {
                "img": v2lee4,
                "caption": "Lee: Hyperreal with new recoloured VFX"
            },
            {
                "img": v2lee5,
                "caption": "Lee: Hyperreal with new recoloured VFX and RoR-themed skin"
            },
            {
                "img": v2lee6,
                "caption": "Lee: Hyperreal with new recoloured VFX"
            },
            {
                "img": lee1,
                "caption": "Lee: Hyperreal in the Character Select screen."
            }, 
            {
                "img": lee2,
                "caption": "Lee: Hyperreal using his Ultimate ability, firing a giant explosive ball of energy."
            }, 
            {
                "img": lee3,
                "caption": "Aftermath of firing his Ultimate."
            },
            {
                "img": lee4,
                "caption": "Lee: Hyperreal firing his Rifle."
            },
            {
                "img": lee5,
                "caption": "Lee: Hyperreal in his Hypermatrix, granting him two new moves, which leaves clones behind in his wake."
            },
            {
                "img": lee6,
                "caption": "Lee: Hyperreal parrying a critical attack."
            },
            {
                "img": lee7,
                "caption": "Lee: Hyperreal using his blue orb which blasts him away his original position. "
            },
        ],
        "videos": [
            {
                "title": "Lee: Hyperreal Mod Showcase",
                "location": "youtube",
                "url": "https://www.youtube.com/embed/DP7mswsHHZ0"
            },
        ],
    },
    {
        "id": "duo-de-glance-bar",
        "title": "Surface Duo/Duo 2 Custom ROM features",
        "description": "In my free time, I was rather interested in adding some features to an existing Android ROM for the Surface Duo and Duo 2. After much deliberation, I was able to implement a few features that helped uplift the usability of the device.\n In one such example, I was able to add a new \"Glance Bar and Peek mode\" feature, which is a feature that was originally present in the Surface Duo 2. By peeking the device, the screen will power on and show some useful data with a clean animation of the background filling up to the percentage of the current battery. On Duo 2, this can be seen on the hinge side, which makes it easy to quickly glance on information on the device without having to open the phone.\n Furthermore, I was also interested into getting the pen charging capability to work, which was also present in the original firmware. Through some digging I did manage to find the specific file that controls the state of the pen charger, and was able to implement it into the custom ROM through some SE Linux permission changes.\n Through my time on this, I learned more about how Android works, the build process and more about Kotlin and Java.",
        "imgs": [
            {
                "img": duo1,
                "caption": "Glance bar on the Surface Duo 2, showing the time and date, as well as the green background that dynamically scales to simulate a battery filling up."
            }, 
            {
                "img": duo2,
                "caption": "Peek mode implementation. "
            },
        ],
        "related_urls": [
            {
                "title": "Github (Source code)",
                "url": "https://github.com/Archfx/duo-de",
                "img": githubImg,
            }],
    },
]