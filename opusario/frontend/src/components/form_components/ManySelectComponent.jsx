import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import FormFieldLabel from '../form_snippets/FormFieldLabel';
import FormErrorMessages from '../form_snippets/FormErrorMessages';


export default class ManySelectComponent extends Component {
    constructor(props) {
        super(props);
        this.handleAlphabeticFilterOnClick = this.handleAlphabeticFilterOnClick.bind(this);
        this.renderAlphabeticFilter = this.renderAlphabeticFilter.bind(this);
        this.renderAddAndRemoveButtons = this.renderAddAndRemoveButtons.bind(this);
        this.makeItemButton = this.makeItemButton.bind(this);
        this.handleItemButtonOnClick = this.handleItemButtonOnClick.bind(this)
    }
    componentDidMount() {
        let apiRoute = this.props.apiRoute;
        if (this.props.filter) {
            apiRoute = `${apiRoute}?filter=${this.props.filter}`;
        }
        this.props.actions.fetchItems(this.props.namespace, apiRoute, true);
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.m2mInstanceId !== this.props.m2mInstanceId) {
            this.props.actions.fetchItems(this.props.namespace, this.props.apiRoute, true);
        }
        if (nextProps.filter !== this.props.filter) {
            this.props.actions.fetchItems(
                this.props.namespace,
                `${this.props.apiRoute}?filter=${nextProps.filter}`);
        }
    }
    handleAlphabeticFilterOnClick(e) {
        e.preventDefault();
        let newValue = (e.target.value === 'all') ? '' : e.target.value;
        this.props.actions.setFilter(this.props.namespace, newValue);
    }
    renderAlphabeticFilter() {
        const alphabet = ['all', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
            'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        return (
            <Fragment>
                {alphabet.map(letter => (
                    <button className={"button button-many-select-alphabet"}
                            key={`button-${letter}`} value={letter}
                            onClick={this.handleAlphabeticFilterOnClick}>
                        {letter}
                    </button>
                ))}
            </Fragment>
        )
    }
    renderAddAndRemoveButtons() {
        let addButtonGroup = [];
        let removeButtonGroup = [];
        for (let i = 0; i < this.props.items.length; i++) {
            const item = this.props.items[i];
            let isSelected = this.props.selectItems.indexOf(item.id);
            if (isSelected !== -1) {
                removeButtonGroup.push(this.makeItemButton(item.id, item.name, 'minus'))
            } else {
                addButtonGroup.push(this.makeItemButton(item.id, item.name, 'plus'))
            }
        }
        return {"add": addButtonGroup, "remove": removeButtonGroup}
    }
    makeItemButton(id, name, icon) {
        const classNameString = `fa fa-${icon}-circle icon-${icon}`;
        const customAttributes = { "data-type": icon };
        return (
            <button className={"button button-many-select"}
                    key={`button-${id}`}
                    value={id}
                    onClick={this.handleItemButtonOnClick}
                    {...customAttributes}>
                {name}<i className={classNameString}></i>
            </button>
        )
    }
    handleItemButtonOnClick(e){
        e.preventDefault();
        if (e.target.dataset.type === 'plus') {
            this.props.actions.addSelectItem(this.props.namespace, e.target.value);
        } else {
            this.props.actions.removeSelectItem(this.props.namespace, e.target.value);
        }
    }
    render() {
        let buttonGroups = this.renderAddAndRemoveButtons();
        return (
            <div className={"row gtr-0 gtr-uniform"}>
                <FormFieldLabel componentId={this.props.componentId}/>
                <div className={"col-9"}>
                    {this.renderAlphabeticFilter()}<br /><br />
                    {buttonGroups.add}<br />
                    {buttonGroups.remove}
                </div>
                <FormErrorMessages trueFalse={this.props.isError} messages={this.props.errorMessages}/>
            </div>
        );
    }
}

ManySelectComponent.propTypes = {
    namespace: PropTypes.string.isRequired,
    componentId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    selectItems: PropTypes.array.isRequired,
    m2mModelField: PropTypes.string.isRequired,
    m2mInstanceId: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    errorMessages: PropTypes.array.isRequired,
    isError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    apiRoute: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
};
