HtmlParser.prototype.detectNameOfTagAndAttributes = function(template, startIndex) {
    let tagName = '';
    for (let i = startIndex; i < template.length; i++) {
        if (template[i] !== '>' && template[i] !== '') 
            tagName += template[i]
        else 
            return tagName;
    }
}

HtmlParser.prototype.getTag = function(tagNameAndAttributes) {
    return tagNameAndAttributes.match(/^\S*/)[0];
}

HtmlParser.prototype.getAttributes = function(attributesStr) {
    let attrubuteStrings = attributesStr.match(/\S+=['"][^'"]*['"]/g);
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

export function HtmlParser(option) {
    for (let key in option) {
        this[key] = option[key];
    }
}

HtmlParser.prototype.parse = function(templateBase) {
    this.template = templateBase;
    let listOfTags = {};
    let listOfProps = {};
    for (this.i = 0; this.i < this.template.length; this.i++) {
        let newTag; let i = this.i; let template = this.template; 
        if (template[i] === '<' && template[i + 1] !== '/') {
            newTag = this.separateByTag(template, i);
            listOfTags[newTag.name + i] = newTag;
        }
        
        if (template[i] + template[i + 1] === '{{') {
            let newProp = this.createProp(template, i + 2);
            listOfProps[newProp] = {
                value: newProp,
                currentTag: newTag ? newTag : null
            }
        }
    }
    console.log(this.template);
    return {listOfTags, listOfProps}
}

HtmlParser.prototype.addArtIdsForNewTemplate = function(tag) {
    if (this.addToTagsElementArtId) {
        let i = this.i + 1; 
        let randomId = Math.round(Math.random() * 1000000).toString();
        this.template = this.template.slice(0, i + tag.length)
                 + ` art-id="${randomId}"`
                 + this.template.slice(i + tag.length, this.template.length);
        this.i = --i + randomId.length;
        return randomId;     
    }
}

HtmlParser.prototype.separateByTag = function(template, i) {
    
    let tagNameAndAttributes = this.detectNameOfTagAndAttributes(template, i + 1);
    let tagName = this.getTag(tagNameAndAttributes);
    let artId = this.addArtIdsForNewTemplate(tagName);
    let attributes = this.getAttributes(tagNameAndAttributes.slice(tagName.length));
    attributes.artId = artId;
    let tagValue = this.createTag(template, tagName, i);
    return {
        name: tagName,
        value: tagValue,
        attributes: attributes,
        toString() {
            return this.value;
        }
    }
}

HtmlParser.prototype.createProp = function(template, indexProp) {
    let newProp = '';
    for (let i = indexProp; i < template.length; i++) {
        if (template[i] + template[i + 1] === '}}') {
            return newProp;
        }
        newProp += template[i];
    }
    throw "Curly brackets have not end"
}

HtmlParser.prototype.createTag = function(template, tagName, startIndex) {
    let tag = '';
    let countOfInnerTags = 0;
    for (let i = startIndex; i < template.length; i++) {
 //       console.log('template[i]', template[i], 'tagName[0]', tagName[0], template[i] == tagName[0]);

        if (template[i] === tagName[0] && this.checkForTag(template, i, tagName)) {
            countOfInnerTags = this.getCountOfInnerTags(template, i, countOfInnerTags);
            if (countOfInnerTags === 0) {
                tag += tagName + '>';
                break;
            }
        }
        tag += template[i];
    }
    return tag;
}

HtmlParser.prototype.getCountOfInnerTags = function(template, i, countOfInnerTags) {
    return template[i - 1] === '/' ? --countOfInnerTags : ++countOfInnerTags;
}

HtmlParser.prototype.checkForTag = function(template, indexForStr, tagName) {
    for (let i = 0; i < tagName.length; i++) {
        if (tagName[i] !== template[indexForStr + i]) {
            return false
        }
    }
    return true
}