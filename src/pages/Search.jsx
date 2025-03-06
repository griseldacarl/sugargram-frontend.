import Footer from "../components/Footer";
import SearchHeader from "../components/SearchHeader";
import UserList from "../components/UserList";
import React, { useState } from "react";
import { useFetchUsersQuery } from "../features/api/databaseApi";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: users,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useFetchUsersQuery();

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
    console.log(value);
  };

  let filteredUserList = [];
  if (isSuccess) {
    filteredUserList = users.filter((user) => user?.email.includes(searchTerm));
  }

  return (
    <>
      <SearchHeader search={searchTerm} setSearch={handleSearchTerm} />
      {isSuccess && <UserList users={filteredUserList} />}
      <Footer />
    </>
  );
};
export default Search;
