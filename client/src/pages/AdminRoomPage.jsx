import { useState, useEffect } from "react";
import { url } from "../configs/config";
import axios from "axios";

const AdminRoomPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/room/all`);
      setRooms(data.rooms);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <div>AdminRoomPage</div>
      {/* <div>{JSON.stringify(rooms)}</div> */}
      <div>
        {rooms.length > 0 ? (
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Number</th>
                <th>Floor</th>
                <th>AC</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.number}</td>
                  <td>{room.floor}</td>
                  <td>{room.ac ? "Yes" : "No"}</td>
                  <td>{room.price}</td>
                  <td>{room.occupied ? "Occupied" : "Vacant"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </>
  );
};

export default AdminRoomPage;
