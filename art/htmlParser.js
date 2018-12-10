HtmlParser.prototype.detectNameOfTagAndAttributes = function(template, startIndex) {
    let tagName = '';
    for (let i = startIndex; i < template.length; i++) {
        if (template[i] !== '>' && template[i] !== '') 
            tagName += template[i]
        else 
            return tagName;
    }
}

HtmlParser.prototype.getTagName = function(tagNameAndAttributes) {
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
    this.listOfTags = {};
    this.listOfProps = {};
    for (this.i = 0; this.i < this.template.length; this.i++) {
        var newTag; let i = this.i; let template = this.template; 
        if (template[i] === '<' && template[i + 1] !== '/') {
            newTag = this.createTag(template, i);
            this.listOfTags[newTag.artId] = newTag;
        }
    }
    console.log(this.template);
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

HtmlParser.prototype.createTag = function(template, i) {
    
    let tagNameAndAttributes = this.detectNameOfTagAndAttributes(template, i + 1);
    let tagName = this.getTagName(tagNameAndAttributes);
    
    let artId = this.addArtIdsForNewTemplate(tagName);
    let attributes = this.getAttributes(tagNameAndAttributes.slice(tagName.length));
    attributes.artId = artId;
    this.currentArtId = artId;
    let [tagValue, arrayValue] = this.handleTag(template, tagName, i);
    return {
        artId,
        name: tagName,
        arrayValue,
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

HtmlParser.prototype.setProps = function(template, i, indexOfArrayTag) {
    if (template[i] + template[i + 1] === '{{') {
        let newProp = this.createProp(template, i + 2);
        if (!this.listOfProps[newProp]) 
            this.listOfProps[newProp] = {
                value: newProp,
                artId: this.currentArtId ? this.currentArtId : null,
                indexOfArrayTag: indexOfArrayTag
            }
        else {
            this.listOfProps[newProp] = [this.listOfProps[newProp]];
            this.listOfProps[newProp].push({
                value: newProp,
                artId: this.currentArtId ? this.currentArtId : null,
                indexOfArrayTag: indexOfArrayTag
            });
        }
    }
}

HtmlParser.prototype.handleTag = function(template, tagName, startIndex) {
    let tag = ''; let arrayTag = [];
    let countOfInnerTags = 0; let indexOfArrayTag = -1; var j;
    for (let i = startIndex; i < template.length; i++) {

        if (template[i] === tagName[0] && this.checkForTag(template, i, tagName)) {
            countOfInnerTags = this.getCountOfInnerTags(template, i, countOfInnerTags);
            if (countOfInnerTags === 0) {
                tag += tagName + '>';
                break;
            }
            arrayTag[++indexOfArrayTag] = {value: '', props: []}; j = i;
            this.indexOfArrayTag = indexOfArrayTag;
        }
        this.setProps(template, i, indexOfArrayTag);
        tag += template[i];
        if (i > j + tagName.length && template[i] != '<' && template[i] != '/') {
            if (template[i] + template[i + 1] === '{{') {

                arrayTag[indexOfArrayTag].props.push(this.getPropsOfNode(template, i + 2));
            }
            arrayTag[indexOfArrayTag].value += template[i];
        }
    }
    return [tag, arrayTag];
}

HtmlParser.prototype.getPropsOfNode = function(template, i) {
        let newProps = '';
        for (; i < template.length; i++) {
            if (template[i] === '}') {
                return newProps;
            }
            newProps += template[i];
        }
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