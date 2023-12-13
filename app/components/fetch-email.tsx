"use client";

import React, { useState } from 'react';
import useStores from '@/zustand-store'; // Adjust the import path as necessary

const FetchEmailsButton = () => {
  const [buttonText, setButtonText] = useState('Fetch Emails');
  const [isFetched, setIsFetched] = useState(false); // State to track if emails have been fetched
  const addTask = useStores((state) => state.addTask);

  const handleFetchEmails = async () => {
    setIsFetched(true); // Disable the button permanently
    setButtonText('Extracting from email subjects');

    // Mock email subjects extraction and adding to the store
    const emailTasks = [
      { id: '1', text: 'Truly Humble Under God', isDone: false },
      { id: '2', text: 'Pushing positivity', isDone: false },
    ];

    // Simulate an asynchronous operation, e.g., fetching emails
    setTimeout(() => {
      // Add tasks to the store
      emailTasks.forEach(task => {
        addTask(task);
      });

      // Keep the button disabled and update the text
      setButtonText('Emails Fetched');
    }, 2000); // Adjust the timeout duration as needed
  };

  return (
    <button 
      onClick={handleFetchEmails} 
      className="btn btn-primary" 
      disabled={isFetched} // Button is permanently disabled after fetching
    >
      {buttonText}
    </button>
  );
};

export default FetchEmailsButton;
