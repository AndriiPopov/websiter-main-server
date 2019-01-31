import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../../store/actions/index';

const initialValue = {
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
};

function MarkHotkey(options) {
    const { type, key } = options
    return {
      onKeyDown(event, editor, next) {
        if (!event.ctrlKey || event.key !== key) return next()
        event.preventDefault()
        editor.toggleMark(type)
      },
    }
  }

const plugins = [
    MarkHotkey({ key: 'b', type: 'bold' }),
    MarkHotkey({ key: '`', type: 'code' }),
    MarkHotkey({ key: 'i', type: 'italic' }),
    MarkHotkey({ key: '~', type: 'strikethrough' }),
    MarkHotkey({ key: 'u', type: 'underline' })
];

class Text extends Component {

    state = {
        value: Value.fromJSON(JSON.parse(this.props.value) || initialValue)
    }

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type);
    };

    getMark = type => {
        const { value } = this.state;
        return value.marks.filter( mark => mark.type === type ).first();
    };

    removeAllMarks = type => {
        const { value } = this.state;
        const marks = value.marks.filter(mark => mark.type === type);
        marks.forEach( mark => this.editor.removeMark(mark));
    }

    nodeCreateStyle = data => {
        return {
            marginTop: data.has('topSpacing') ? data.get('topSpacing') : null,
            marginBottom: data.has('bottomSpacing') ? data.get('bottomSpacing') : null,
            textIndent: data.has('textIndent') ? data.get('textIndent') : null,
            textAlign: data.has('textAlign') ? data.get('textAlign') : null
        }
    }

    doChange = property => {
        this.editor.focus().toggleMark(property)
    }

    doChangeInlineStyle = async (property, propertyValue, callback) => {
        this.removeAllMarks(property);
        await this.editor.focus()
        .addMark({
            type: property,
            data: { [property]: propertyValue }
        });
        callback();
    }

    doChangeBlockStyle = async (property, propertyValue, callback) => {
        await this.editor.focus().setBlocks

        const { blocks } = this.state.value;
        await blocks.forEach( block => {
            const newBlock = block.set('data', block.data.set(property, propertyValue));
            this.editor.setBlocks(newBlock);
        });
        callback();
    }

    onChange = async ({ value }) => {
        if (value.document !== this.state.value.document) {
            this.props.valueChange(JSON.stringify(value.toJSON()));
        }
        this.setState({ value });
        
        const values = {};

        await ['italic',
        'strikethrough',
        'underline',
        'sup',
        'sub'].forEach(async property => {
            values[property] = await this.hasMark(property);
        });

        await ['fontSize', 
        'color', 
        'backgroundColor', 
        'fontWeight', 
        'fontFamily',
        'wordSpacing',
        'letterSpacing',
        'lineHeight',
        'textTransform'].forEach(async property => {
            const mark = await this.getMark(property);
            values[property] = mark ? await mark.data.get(property) : '';
        });

        await Promise.all(['topSpacing',
        'bottomSpacing',
        'textIndent',
        'textAlign'].map(async property => {
            const sourceBlock = await this.state.value.blocks
                .filter(async block => await block.data.has(property))
                .first();
            if (sourceBlock) {
                values[property] = await sourceBlock.data.get(property);
            }
        }));
        this.props.saveChosenTextValues(values);
    }
    
    handleClick = () => {
        this.props.handleChooseTextEditor(this);
    }

    ref = editor => {
        this.editor = editor;
        this.props.handleChooseTextEditor(this);
    };
    

    render() {
        return (
            <Editor 
                value={this.state.value} 
                onChange={this.onChange}
                plugins={plugins}
                renderMark={this.renderMark}
                renderNode={this.renderNode}
                onClick={this.handleClick}
                ref={this.ref}
                decorateNode={this.decorateNode} />
        );
    };

    decorateNode = (node, editor, next) => {
        console.log(node.type);
        return [{
            anchor: 1,
            focus: 2,
            mark: {
                type: 'fontSize',
                data: { fontSize: 100 }
            }
        }]
    }
    renderMark = (props, editor, next) => {
        const { children, mark } = props
        switch (mark.type) {
            case 'code':
                return <code>{children}</code>
            case 'italic':
                return <em>{children}</em>
            case 'strikethrough':
                return <del>{children}</del>
            case 'underline':
                return <u>{children}</u>
            case 'sup':
                return <sup>{children}</sup>
            case 'sub':
                return <sub>{children}</sub>
            case 'fontSize':
                return <span style={{fontSize: mark.data.get('fontSize') + 'px'}}>{children}</span>;
            case 'color':
                return <span style={{color: mark.data.get('color')}}>{children}</span>;
            case 'backgroundColor':
                return <span style={{backgroundColor: mark.data.get('backgroundColor')}}>{children}</span>;
            case 'fontWeight':
                return <span style={{fontWeight: mark.data.get('fontWeight')}}>{children}</span>;
            case 'fontFamily':
                return <span style={{fontFamily: mark.data.get('fontFamily')}}>{children}</span>;
            case 'wordSpacing':
                return <span style={{wordSpacing: mark.data.get('wordSpacing') + 'px'}}>{children}</span>;
            case 'letterSpacing':
                return <span style={{letterSpacing: mark.data.get('letterSpacing') + 'px'}}>{children}</span>;
            case 'lineHeight':
                return <span style={{lineHeight: mark.data.get('lineHeight') + 'px'}}>{children}</span>;
            case 'textTransform':
                return <span style={{textTransform: mark.data.get('textTransform')}}>{children}</span>;
            default:
                return next()
        }
    }

    renderNode = (props, editor, next) => {
        const { attributes, children, node } = props
        switch (node.type) {
            case 'paragraph':
                return <p style={this.nodeCreateStyle(node.data)} {...attributes}>{children}</p>
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
            default:
                return next()
        }
    }
};

Text.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    valueChange: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        value: state.builder.present[props.id].textContent
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        valueChange: value => dispatch(actions.changeElementPropertyValue(value, 'textContent', false, true, [props.id])),
        saveChosenTextValues: values => dispatch(actions.updateTextValues(values))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Text);