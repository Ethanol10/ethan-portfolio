import { useParams } from "react-router";
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export function MonDocsMarkdownPage(){
    const {slug} = useParams();
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    useEffect( () => {
        
        let correctSlug = slug;

        if(correctSlug === null || correctSlug === "" || correctSlug === undefined){
            correctSlug = "home";
        }

        import(`./docs/${correctSlug}.md`)
        .then((res) => fetch(res.default).then((r) => r.text()))
        .then(setContent)
        .catch(() => {
            setError(`Could not load the markdown file: ${slug}.md`);
        });

        console.log(correctSlug);
    }, [slug, ]);


    return (
        <div className="docs-markdown-container">
            {error ? <h1>Couldn't find that page!</h1> : <ReactMarkdown>{content}</ReactMarkdown>}
        </div>
    );
}
