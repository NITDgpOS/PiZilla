import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default class Search extends Component {

    static propTypes = {
        files: PropTypes.arrayOf(PropTypes.object)
    }

    constructor() {
        super();

        this.state = {
            value: '',
            suggestions: []
        };
    }

    renderSuggestion = (suggestion) => {
        return (
            <span className="suggestion">{suggestion.name}</span>
        );
    }

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return this.props.files.filter(file => regex.test(file.name));
    }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestionValue }) => {
        const url = `${window.location.href}view/${encodeURIComponent(suggestionValue)}`;
        window.open(url, '_blank');
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Ctrl+Space to search ...",
            value,
            onChange: this.onChange,
            className: "search",
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            spellcheck: "false"
        };

        return (
            <Autosuggest
                highlightFirstSuggestion
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={(file) => file.name}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                inputProps={inputProps}
            />
        );
    }
}