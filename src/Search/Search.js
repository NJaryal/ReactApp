import React from 'react';
import PropTypes from 'prop-types';
import Button from 'Components/common/Button';
import cx from 'classnames';
import globalStyles from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Search.css';

const Search = ({ handleSearchText }) => (
  <form className={cx(globalStyles['navbar-form'], globalStyles['navbar-left'])} role="search">
    <div className={cx(globalStyles['input-group'], globalStyles['mb-3'])}>
      <input type="text" className={globalStyles['form-control']} placeholder="Enter movie's name" onChange={handleSearchText} />
      <div className="input-group-append">
        <Button className={styles.searchBtn} children="Search" />
      </div>
    </div>
  </form>
);
Search.propTypes = {
  handleSearchText: PropTypes.func.isRequired,
};

export default Search;
