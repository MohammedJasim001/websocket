import { useContext, useEffect, useState } from 'react';
import { allUser, userIncludedGroups } from '../service/api';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../App';

const AllUsers = () => {
  const [users, setUsers] = useState([]); // Initialize state as an array
  const { userId} = useContext(UserData)
  const [groups, setGroups] = useState([])
  // const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user?.data?._id; 

  console.log(userId, 'userId');

  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const group = await userIncludedGroups(userId)
      console.log(group)
      setGroups(group)
      const data = await allUser(userId);
      setUsers(data.user); // Assuming the API returns { users: [...] }
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((ele) => <li onClick={()=>navigate(`/chat/${ele._id}`)} key={ele._id}>{ele.name}</li>)
        ) : (
          <p>No users found</p>
        )}
      </ul>

      <h2>Groups</h2>
      <ul>
        {groups.length>0 ?(
          groups.map((group,ind)=>(
            <li key={ind} onClick={()=>navigate(`/groupchat/${group._id}`)}>{group.groupName}</li>
          ))
        ):(
          <p>No Groups</p>
        )}
      </ul>
    </div>
  );
};

export default AllUsers;
