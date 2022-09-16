import React, { useState } from "react";
import "./FollowersCard.css";
import { FollowersData } from "../../../data/FollowersData";
import User from "../../../User/User";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../api/UserApi";
const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.AuthReducer.authData);
  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUser();
      setPersons(data);
      console.log(data);
    };
    fetchPerson();
  }, []);
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
