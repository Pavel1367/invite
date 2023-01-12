import React from "react";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

export const UserList = ({
  searchValue,
  setValue,
  items,
  isLoading,
  onClickInvite,
  invites,
  onClickSendInvites,
}) => {
  return (
    <div className="users">
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          onChange={(e) => setValue(e.target.value.toLowerCase())}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((user) => {
              const fullname = user.first_name + user.last_name;
              return (
                fullname.includes(searchValue) ||
                user.email.includes(searchValue)
              );
            })
            .map((user) => (
              <User
                makeInvite={onClickInvite}
                isInvited={invites.includes(user.id)}
                {...user}
                key={user.id}
              />
            ))}
        </ul>
      )}
     
         <button disabled={invites.length === 0}  onClick={onClickSendInvites} className="send-invite-btn">
          {invites.length > 0 ? 'Send invites' : 'Add at least a user'}
        </button> 
        
    
    </div>
  );
};
