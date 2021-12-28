import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({ setLibraryStatus, libraryStatus }) {
  return (
    <nav>
      <h1></h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}

export default Nav;
