import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoSearchSharp } from "react-icons/io5";

const SearchHeader = ({ search, setSearch }) => {
  return (
    <>
      <InputGroup className="mb-3">
        <Button variant="outline-secondary" id="button-addon1">
          <IoSearchSharp />
        </Button>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </>
  );
};

SearchHeader.prototype = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};

export default SearchHeader;
