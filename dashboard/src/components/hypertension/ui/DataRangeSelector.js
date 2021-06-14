import { Dropdown, DropdownButton } from 'react-bootstrap';

const DataRangeSelector = () => {
    return (
        <DropdownButton
            menuAlign="right"
            title="Last 2 weeks"
            id="dropdown-menu-align-right"
            variant="outline-secondary"
            style={{ textAlign: 'right' }}
        >
            <Dropdown.Item eventKey="1">Last 2 weeks</Dropdown.Item>
            <Dropdown.Item eventKey="2">Last month</Dropdown.Item>
            <Dropdown.Item eventKey="3">Last 6 months</Dropdown.Item>
        </DropdownButton>
    )
}

export default DataRangeSelector;