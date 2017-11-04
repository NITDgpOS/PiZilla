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
            suggestions: [],
            value: ''
        };
    }

    renderSuggestion = (suggestion) => {
        return (
            <span className="suggestion">{suggestion.name}</span>
        );
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.name;
    }

    getSuggestions = (value) => {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp(`^${ escapedValue}`, 'i');

        return this.props.files.filter((file) => regex.test(file.name));
    }

    onChange = (event, { newValue }) => {
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
            autocapitalize: 'off',
            autocomplete: 'off',
            autocorrect: 'off',
            className: 'search',
            onChange: this.onChange,
            placeholder: 'Ctrl+Space to search ...',
            spellcheck: 'false',
            value
        };

        return (
            <Autosuggest
                highlightFirstSuggestion
                suggestions={ suggestions }
                onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
                onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
                getSuggestionValue={ this.getSuggestionValue }
                renderSuggestion={ this.renderSuggestion }
                onSuggestionSelected={ this.onSuggestionSelected }
                inputProps={ inputProps }
            />
        );
    }
}
