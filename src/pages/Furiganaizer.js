import React, {useEffect, useRef, useState} from "react";
import furiganaize2 from "../media/furiganaize2.png";
import home from "../media/Icons/home.png";
import darkmode from "../media/Icons/darkmode.svg";
import { useNavigate } from "react-router";
import DomToImage from "dom-to-image";
import classNames from "classnames";

export default function Furiganaizer(){
    
    const textbox = useRef(null);
    const [outputField, setOutputField] = useState("<p>Type to start generating</p>");
    const navigate = useNavigate();
    const furiganaizeOutput = useRef(null);
    const [img, setImg] = useState(null);
    const [darkMode, setDarkMode] = useState(null);

    useEffect(() => {
        
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }
        else{
            setDarkMode(false);
        }
    }, []);

    function handleFuriganaize(){
        const text = textbox.current.value;

        if(text === ""){
            setOutputField("<p>No input provided!</p>");
            return;
        }
        // Process the text to add furigana    
        let textObjects = [];
        let object = {
            rb: "",
            rt: ""
        };

        var rbWriting = true;
        var parenthesisFlag = false;
        var equalFlag = false;
        
        for(let i = 0; i < text.length; i++){
            //Check for Start parenthesis
            if(text.charAt(i) === "(" || text.charAt(i) === "（"){
                if(object.rb !== ""){
                    textObjects.push({...object});
                    object.rb = "";
                    object.rt = "";
                }
                parenthesisFlag = true;
                rbWriting = true;
            }
            //Checking for equivalence to convert over to writing furigana
            if(text.charAt(i) === "=" || text.charAt(i) === "＝"){
                equalFlag = true;
                rbWriting = false;
            }
            //Check for end parenthesis to end the furigana group
            if(text.charAt(i) === ")" || text.charAt(i) === "）" ){
                rbWriting = true;
                parenthesisFlag = true;
                //Reset object
                textObjects.push({...object});
                object.rb = "";
                object.rt = "";
            }
            // check to exit current parenthesis if we're line-ending, or continue adding to rb/rt
            if(!parenthesisFlag && !equalFlag){
                if(rbWriting){
                    if(text.charAt(i) === "\n"){
                        object.rb += "<br/>";
                        textObjects.push({...object});
                        object.rb = "";
                        object.rt = "";
                    }
                    else{
                        object.rb += text.charAt(i);
                    }
                }
                else if(!rbWriting){
                    object.rt += text.charAt(i)
                }
            }
            parenthesisFlag = false;
            equalFlag = false;
        }

        if(object.rb !== ""){
            textObjects.push({...object});
        }

        var ruby = "<ruby>\n";
        
        //Following this format.
        /*
        <ruby>`+ 
            ruby +`<rp>(</rp><rt>` + rubyrt + `</rt><rp>)</rp>
        </ruby></br>
        <ruby>`+ 
            ruby +`<rp>(</rp><rt>` + rubyrt + `</rt><rp>)</rp>
        </ruby>
        */
        for(var i = 0; i < textObjects.length; i++){
            ruby += textObjects[i].rb + "<rp>(</rp><rt><b>" + textObjects[i].rt + "</b></rt><rp>)</rp>\n"
            if(textObjects[i].rb.includes("<br/>")){
                ruby+= "</ruby><br/>\n<ruby>";
            }
        }
        //end ruby text
        ruby += "</ruby>"

        setOutputField(ruby);
    }

    function handleImageGen(){
        let element = furiganaizeOutput.current;
        let options = {
            bgcolor: "rgba(0, 0, 0, 0)"
        }

        DomToImage.toPng(element, options).then(function (dataUrl) {
            let img = new Image();
            img.src = dataUrl;
            setImg(img);
        })
        .catch(function (error) {
            console.error('Failed to render img:', error);
        });
    }

    function invertMode(){
        setDarkMode(!darkMode);
    }

    return(
        <div className={classNames("furiganaizer_formatting", {"dark": darkMode})}>
            <div className="furiganaizer-back-button" >
                <img loading="lazy" alt="Return home" src={home} onClick={() => navigate("/")}/>
                <img loading="lazy" alt="Dark Mode" src={darkmode} onClick={invertMode}></img>
            </div>
            <h1 className="furiganaizer_title">Furiganaizer</h1>

            <div>
                <h4>
                    How to use:
                </h4>

                <p>
                    Group text together using ().
                    In the parentheses, use the following format to add furigana:
                    <br />
                    (lower text=upper text)
                    <br />
                    Example: (漢字=かんじ) produces:
                </p>
                <img className={classNames("furiganaizer_example", {"dark": darkMode})} src={furiganaize2} alt="Furiganaizer Example"></img>
            </div>
            <textarea onChange={handleFuriganaize} ref={textbox} className="furiganaizer_input" id="story" name="story" rows="5" cols="33"></textarea>
            <button onClick={handleImageGen} className="furiganaizer_button">Generate Image</button>
            <div ref={furiganaizeOutput} className="furiganaizer_output" dangerouslySetInnerHTML={{ __html: outputField }}></div>

            { img !== null ? (
                <div className="furiganaize_output_img">
                    <h4>Output Image:</h4>
                    <img alt="Furiganaizer Output" src={img.src}/>
                </div>
            ) : <></>}
        </div>
    );
}