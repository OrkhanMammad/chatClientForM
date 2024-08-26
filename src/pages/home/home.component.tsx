import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';
import './home.style.css';

interface UserModel {
  id: string;
  name: string;
  status: string;
  avatar: string;
}

interface ChatModel {
  userId: string;
  toUserId: string;
  date: string;
  message: string;
}

const HomeComponent: React.FC = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserModel[]>([]);
  const [chats, setChats] = useState<ChatModel[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [message, setMessage] = useState<string>('');
  const [hub, setHub] = useState<signalR.HubConnection | null>(null);
  const [User, setUser] = useState<UserModel | null>(JSON.parse(localStorage.getItem("user") || '{}'));
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // No operation here - user should be fetched from localStorage
      } catch (error) {
        console.error('Error fetching user data from localStorage:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (User) {
      const fetchUsers = async () => {
        try {
          const response = await axios.get<UserModel[]>('https://localhost:44373/api/Chats/GetUsers');
          const usersList = response.data.filter(p => p.id !== User.id);
          setUsers(usersList);
          setFilteredUsers(usersList);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();

      const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:44373/chat-hub")
        .withAutomaticReconnect()        
        .build();

      setHub(hubConnection);

      hubConnection.start().then(() => {
        console.log("Connection is started...");
        hubConnection.invoke("Connect", User.id); 

        hubConnection.on("Users", (res: UserModel) => {
          setUsers(users => users.map(p => p.id === res.id ? { ...p, status: res.status } : p));
          setFilteredUsers(users => users.map(p => p.id === res.id ? { ...p, status: res.status } : p));
        });

        hubConnection.on("Messages", (res: ChatModel) => {
          if (selectedUserId === res.userId || selectedUserId === res.toUserId) {
            setChats(chats => [...chats, res]);
          }
        });
      }).catch(error => console.error('Error starting SignalR connection:', error));

      return () => {
        hubConnection.stop();
      };
    }
  }, [User, selectedUserId]);

  const changeUser = async (user: UserModel) => {
    setSelectedUserId(user.id);
    setSelectedUser(user);

    try {
      const response = await axios.get<ChatModel[]>(`https://localhost:44373/api/Chats/GetChats?userId=${User?.id}&toUserId=${user.id}`);
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const sendMessage = async () => {
    if (selectedUser) {
      const data = {
        userId: User?.id,
        toUserId: selectedUser.id,
        message
      };

      try {
        const response = await axios.post<ChatModel>('https://localhost:44373/api/Chats/SendMessage', data);
        setChats(chats => [...chats, response.data]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(term)));
  };

  return (
    <div className='homeMain'>
      <div className="homeChild">
        <h1 className="titleHome">TS ChatAPP</h1>
        <button onClick={logout} className="btn btn-danger" style={{ float: 'right' }}>
          Çıkış Yap
        </button>
        <div className="card chat-app">
          <div id="plist" className="people-list">
            <div className="input-group" style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                style={{ paddingLeft: '35px' }}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <i className="fa fa-search" style={{ position: 'absolute', top: '10px', left: '15px' }}></i>
            </div>
            <ul className="list-unstyled chat-list mt-2 mb-0">
              {filteredUsers.map(user => (
                <li
                  key={user.id}
                  className={`clearfix ${selectedUserId === user.id ? 'active' : ''}`}
                  onClick={() => changeUser(user)}
                >
                  <img src={`https://localhost:44373/avatar/${user.avatar}`} alt="avatar" />
                  <div className="about">
                    <div className="name">{user.name}</div>
                    <div className="status">
                      <i className={`fa fa-circle ${user.status === 'online' ? 'online' : 'offline'}`}></i> {user.status}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {selectedUser && (
            <div className="chat">
              <div className="chat-header clearfix">
                <div className="row">
                  <div className="col-lg-6">
                    <a href="javascript:void(0);">
                      <img src={`https://localhost:44373/avatar/${selectedUser.avatar}`} alt="avatar" />
                    </a>
                    <div className="chat-about">
                      <h6 className="m-b-0">{selectedUser.name}</h6>
                      <small>{selectedUser.status}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-history" style={{ height: '600px' }}>
                <ul className="m-b-0">
                  {chats.map(chat => (
                    <li
                      key={chat.date} // Assuming date is unique
                      className={`clearfix ${selectedUser.id === chat.userId ? 'd-flex' : ''}`}
                      style={{ flexDirection: 'column', width: '100%', alignItems: selectedUser.id === chat.userId ? 'flex-end' : 'flex-start' }}
                    >
                      <div className="message-data">
                        <span className="message-data-time">{chat.date}</span>
                      </div>
                      <div className={`message ${selectedUser.id === chat.userId ? 'my-message' : 'other-message'}`}>
                        {chat.message}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter text here..."
                    style={{ height: '30px' }}
                  />
                  <button className="btn btn-primary" onClick={sendMessage} style={{ height: '30px' }}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
