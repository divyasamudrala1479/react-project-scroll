import React, { useState, useEffect } from "react";
import "./App.css"

const PAGE_SIZE = 10;

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadContacts();
  }, []);
    
 async function loadContacts() {
    setLoading(true);
    await sleep(1000);
    fetch(`https://randomuser.me/api/?results=${PAGE_SIZE}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setContacts((prevContacts) => [...prevContacts, ...data.results]);
          setPage((prevPage) => prevPage + 1);
          setLoading(false);
      });
    }
    
    function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      loadContacts();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="contact-container">
      {contacts.slice(0, PAGE_SIZE * page).map((contact) => (
        <div className="contact-card" key={contact.id}>
          <p className="contact-name"> {contact.name.first} {contact.name.last}</p>
          <img src={contact.picture.thumbnail} alt="thumbnail" />
        </div>
      ))}
      {loading && <p className="loading-status">Loading more contacts...</p>}
    </div>
  );
}

export default ContactList;
