const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

//Get Directory for all posts
const docsDir = path.join(__dirname, "../public/docs");

//Get the markdown files
const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.txt'));

// Set the Manifest Path (same folder as the docs.)
const manifestPath = path.join(path.join(__dirname, "../public/docs/"), 'manifest.json');

const manifest = files.map(filename => {
    //parse raw file piecing the filename and path
    const rawFile = fs.readFileSync(path.join(docsDir, filename), 'utf-8');
    const { data } = matter(rawFile);
    console.log(data);
    return { filename, ...data }; 
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log("Manifest created at: ", manifestPath);
