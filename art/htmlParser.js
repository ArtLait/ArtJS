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
    let [tagValue, nodes] = this.handleTag(template, tagName, i);
    return {
        artId,
        name: tagName,
        nodes,
        value: tagValue,
        attributes: attributes,
        toString() {
            return this.value;
        }
    }
}

HtmlParser.prototype.generateProp = function(template, indexProp) {
    let newPropName = ''; let newPropNameNotSetted = true;
    let strAfterProp = '';
    for (let i = indexProp; i < template.length; i++) {
        if (template[i] + template[i + 1] === '}}' && newPropNameNotSetted) {
            newPropNameNotSetted = false; i += 2;
        }
        if (newPropNameNotSetted) {
            newPropName += template[i];
        }
        else {
            if (template[i] === '<' || template[i] + template[i + 1] === '{{') 
                return { newPropName, strAfterProp }; 
            strAfterProp += template[i];
        }
    }
    throw "Curly brackets have not end"
}

HtmlParser.prototype.setProps = function(template, i, indexOfArrayTag, countOfInnerTags, firstIndexOfTag) {
    if (countOfInnerTags !== 1) {
        return
    }
    if (!this.indexStrBefore) this.indexStrBefore = firstIndexOfTag
    if (template[i] + template[i + 1] === '{{') {
        let {newPropName, strAfterProp} = this.generateProp(template, i + 2);
        let endIndex = i + 2 + newPropName.length - 1;
        
        let newProp = {
            value: newPropName,
            artId: this.currentArtId ? this.currentArtId : null,
            indexOfArrayTag: indexOfArrayTag,
            startIndex: i + 2,
            endIndex,
            strBefore: template.slice(this.indexStrBefore, i),
            strAfter: strAfterProp
        };
        this.indexStrBefore = newProp.endIndex + 3;
        if (!this.listOfProps[newPropName])
            this.listOfProps[newPropName] = newProp
        else {
            this.listOfProps[newPropName] = [this.listOfProps[newPropName]];
            this.listOfProps[newPropName].push(newProp);
        }
    }
}

HtmlParser.prototype.handleTag = function(template, tagName, startIndex) {
    let tag = ''; let arrayTag = [];this.currentTagName = tagName;
    let countOfInnerTags = 0; let indexOfArrayTag = -1; let firstIndexOfTag; let startOfNode;
    for (let i = startIndex; i < template.length; i++) {
        
        if ( (template[i - 1] == '<' && template[i] != '/') || (template[i - 2] + template[i - 1] == '</')) {
            this.currentTagName = this.getCurrentTag(template, i);
            countOfInnerTags = this.getCountOfInnerTags(template, i, countOfInnerTags);
            if (countOfInnerTags === 0) {
                tag += tagName + '>';
                break;
            }
            arrayTag[++indexOfArrayTag] = {value: '', props: []}; firstIndexOfTag = i;
        }
        if (template[i - 1] === '>') startOfNode = i; 
        tag += template[i];
        var indexStartInnerOfTag = firstIndexOfTag + this.currentTagName.length + 1;
        if (i >= indexStartInnerOfTag && template[i] != '<' && template[i] != '/') {
            
            if (template[i] + template[i + 1] === '{{') {
                this.setProps(template, i, indexOfArrayTag, countOfInnerTags, startOfNode);
                arrayTag[indexOfArrayTag].props.push(this.getPropsOfNode(template, i + 2));
            }
            arrayTag[indexOfArrayTag].value += template[i];
        }
    }
    this.indexStrBefore = null;
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

HtmlParser.prototype.getCurrentTag = function(template, indexForStr) {
    return template.slice(indexForStr).match(/^\w*/)[0];
}