import { useParams } from "react-router";
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw"; 

export function MonDocsMarkdownPage(){
    const {slug} = useParams();
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    useEffect( () => {
        
        let correctSlug = slug;

        if(correctSlug === null || correctSlug === "" || correctSlug === undefined){
            correctSlug = "home";
        }

        function stripFrontmatter(text){
            const match = /^---(?:\r\n|\n)([\s\S]+?)(?:\r\n|\n)---(?:\r\n|\n)*/.exec(text);
            return match ? text.slice(match[0].length) : text;
        }

        fetch(`/docs/${correctSlug}.md`)
        .then((res) => res.text())
        .then((text) => {  
            // console.log(matter(text));
            // Get only the contents, not the front-matter + contents
            // console.log(text);
            const strippedContent = stripFrontmatter(text);
            // console.log(strippedContent);
            setContent(strippedContent);
        })
        .catch((e) => {
            console.error(`Could not load the markdown file: ${slug}.md `, e);
        });
    }, [slug, ]);


    return (
        <div className="docs-markdown-container">
            {error ? <h1>Couldn't find that page!</h1> : <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>}
        </div>
    );
}
