'use client';

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const filterPost = (searchText) => {
    const regex = new RegExp(searchText, 'i') //'i' flag for case-insensitive search
    const newPost = allPosts.filter((item) => 
      regex.test(item.creator.username) ||
      regex.test(item.prompt) ||
      regex.test(item.tag)
    )
    return newPost;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPosts(data);
      setPosts(data)
    }

    fetchPosts();
  },[])

  useEffect(() => {
    if(searchText) {
      const searchResult = filterPost(searchText);
      setPosts(searchResult);
    }
  },[searchText])

  const handleTagClick = (e) => {
    setSearchText(e);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />

    </section>
  )
}

export default Feed