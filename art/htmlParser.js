function detectNameOfTagAndAttributes(template, startIndex) {
    let tagName = '';
    for (let i = startIndex; i < template.length; i++) {
        if (template[i] !== '>' && template[i] !== '') 
            tagName += template[i]
        else 
            return tagName;
    }
}

function getTag(tagNameAndAttributes) {
    return tagNameAndAttributes.match(/^\S*/)[0];
}

function getAttributes(tagNameAndAttributes) {
    let attrubuteStrings = tagNameAndAttributes.match(/\S+=['"][^'"]*['"]/g);
    let attributes = {};
    if (attrubuteStrings) {
        attrubuteStrings.forEach((attr) => {
            let name = attr.match(/^[\w-]*/)[0];
            let value = attr.slice(name.length + 2).match(/[^"']*/)[0];
            attributes[name] = value;
        })
    }
    return attributes;
}

export function parseTemplate(template) {
    let listOfTags = {};
    let listOfProps = {};
    for (let i = 0; i < template.length; i++) {
        var newTag;
        if (template[i] === '<' && template[i + 1] !== '/') {
            newTag = separateByTag(template, i);
            listOfTags[newTag.name + i] = newTag;
        }
        
        if (template[i] + template[i + 1] === '{{') {
            let newProp = createProp(template, i + 2);
            listOfProps[newProp] = {
                value: newProp,
                currentTag: newTag ? newTag : null
            }
        }
    }
    return {listOfTags, listOfProps}
}

function separateByTag(template, i) {
    
        let tagNameAndAttributes = detectNameOfTagAndAttributes(template, i + 1);
        let tagName = getTag(tagNameAndAttributes);
        let attributes = getAttributes(tagNameAndAttributes.slice(tagName.length));
        let tagValue = createTag(template, tagName, i);
        return {
            name,
            value: tagValue,
            attributes: attributes,
            toString() {
                return this.value;
            }
        }
}

function createProp(template, indexProp) {
    let newProp = '';
    for (let i = indexProp; i < template.length; i++) {
        if (template[i] + template[i + 1] === '}}') {
            return newProp;
        }
        newProp += template[i];
    }
    throw "Curly brackets have not end"
}

function createTag(template, tagName, startIndex) {
    let tag = '';
    let countOfInnerTags = 0;
    for (let i = startIndex; i < template.length; i++) {
 //       console.log('template[i]', template[i], 'tagName[0]', tagName[0], template[i] == tagName[0]);

        if (template[i] === tagName[0] && checkForTag(template, i, tagName)) {
            countOfInnerTags = getCountOfInnerTags(template, i, countOfInnerTags);
            if (countOfInnerTags === 0) {
                tag += tagName + '>';
                break;
            }
        }
        tag += template[i];
    }
    return tag;
}

function getCountOfInnerTags(template, i, countOfInnerTags) {
    return template[i - 1] === '/' ? --countOfInnerTags : ++countOfInnerTags;
}

function checkForTag(template, indexForStr, tagName) {
    for (let i = 0; i < tagName.length; i++) {
        if (tagName[i] !== template[indexForStr + i]) {
            return false
        }
    }
    return true
}