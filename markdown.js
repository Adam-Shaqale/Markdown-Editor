// Selecting elements
const input = document.getElementById("input");
const output = document.getElementById("output");

const sample = `
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

---
## Unordered List
- Item 2
    - Subitem 2.1
    - Subitem 2.2
- Item 3
- Item 1
     
---
## Horizontal Rule
---

`;
input.innerHTML = sample;
console.log(sample);


function toHtml() {
    const lines = input.innerText.split('\n');
    output.innerHTML = '';
    function headerStyles(element, fontSize) {
        element.style.cssText = `
            font-size: ${fontSize};
            font-weight: bold;
            line-height: 1.2;
        `;
    };
    for(const line of lines) {
        if(line.startsWith("# ")) {
            const h1 = document.createElement("h1");
            h1.textContent = line.slice(1);
            headerStyles(h1, "2rem")
            output.append(h1);
        }
        else if(line.startsWith("## ")) {
            const h2 = document.createElement("h2");
            h2.textContent = line.slice(2);
            headerStyles(h2, "1.5rem")
            output.append(h2);
        }
        else if(line.startsWith("### ")) {
            const h3 = document.createElement("h3");
            h3.textContent = line.slice(3);
            headerStyles(h3, "1.17em")
            output.append(h3);
        }
        else if(line.startsWith("#### ")) {
            const h4 = document.createElement("h4");
            h4.textContent = line.slice(4);
            headerStyles(h4, "1em")
            output.append(h4);
        }
        else if(line.startsWith("##### ")) {
            const h5 = document.createElement("h5");
            h5.textContent = line.slice(5);
            headerStyles(h5, "0.83em")
            output.append(h5);
        }
        else if(line.startsWith("###### ")) {
            const h6 = document.createElement("h6");
            h6.textContent = line.slice(6);
            headerStyles(h6, "0.67em")
            output.append(h6);
        }
        else if(line.startsWith("- ")) {
            const ul = document.createElement("ul");
            const li = document.createElement("li");
            li.style.cssText = `
                list-style-type: disc;
                margin-left: 1.5em;
            `;
            li.textContent = line.slice(1);
            ul.append(li);
            output.append(ul);
        }
        else if(line.trim().startsWith("- ")) {
            const ul = document.createElement("ul");
            const li = document.createElement("li");
            li.style.cssText = `
                list-style-type: circle;
                margin-left: 3em;
            `;
            li.textContent = line.slice(5);
            ul.append(li);
            output.append(ul);            
        }
        else if(line.startsWith("---") || line.startsWith("___")) {
            const hr = document.createElement("hr");
            hr.style.cssText = `
                width: 100%;
                border: 1.2px solid #ddd;
                margin: 3px;
            `;
            output.append(hr);
        }
        else {
            const p = document.createElement("p");
            p.textContent = line;
            output.append(p);
        }
    }
};

input.addEventListener("blur", toHtml);

function wordCounter() {
    const words = input.innerText.split(" ").filter(word => word.replace(/[#\-\*_\s]/, ""));
    document.getElementById("counter").textContent = words.length + " " + "words";
};

input.addEventListener("keyup", wordCounter);

document.addEventListener("DOMContentLoaded", () => {
    toHtml();
    wordCounter();
});